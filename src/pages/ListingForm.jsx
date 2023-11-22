import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  addDoc,
  updateDoc,
  doc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { auth, storage, db } from '../firebase.config';
import { toast } from 'react-toastify';
import Spinner from '../components/common/Spinner';

import PrimaryBtn from '../components/common/PrimaryBtn';

const ListingForm = () => {
  const { listingId } = useParams();
  const locationHook = useLocation();
  const listing = locationHook.state;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'rent',
    name: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    location: '',
    lat: '',
    long: '',
    geolocation: {},
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: [],
    imageUrls: [],
  });

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    location,
    geolocation,
    lat,
    long,
    offer,
    regularPrice,
    discountedPrice,
    images,
    imageUrls,
  } = formData;

  const navigate = useNavigate();

  useEffect(() => {
    // set existing data in state while updating
    listing && setFormData(listing);

    // get logged in user id
    if (auth.currentUser) {
      setFormData((prev) => ({ ...prev, userRef: auth.currentUser.uid }));
    } else {
      navigate('/sign-in');
    }
  }, [navigate, listing]);

  const onMutate = (e) => {
    e.preventDefault();

    let boolean = null;

    if (e.target.value === 'true') {
      boolean = true;
    }

    if (e.target.value === 'false') {
      boolean = false;
    }
    // files
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        images: Array.from(e.target.files),
      }));
    }

    // text, numbers and booleans
    if (!e.target.files) {
      setFormData((prev) => ({
        ...prev,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (offer && +discountedPrice >= +regularPrice) {
      toast.error('Discounted price must be less than regular price!');
      return;
    }

    if (images && images.length + imageUrls > 6) {
      toast.error('Max 6 images are allowed');
      return;
    }

    setLoading(true);

    // upload images to firebase storage
    let uploadedImageUrls = [];
    if (images) {
      uploadedImageUrls = await uploadImages(images).catch(() => {
        toast.error('Images not uploaded');
        setLoading(false);
        return;
      });
    }

    // set data to be saved/updated in db
    const formDataCopy = {
      ...formData,
      imageUrls: [...imageUrls, ...uploadedImageUrls],
      geolocation: { ...geolocation } || { lat, long },
      timestamp: serverTimestamp(),
    };
    delete formDataCopy.images;
    delete formDataCopy.lat;
    delete formDataCopy.long;
    !offer && delete formDataCopy.discountedPrice;
    console.log(formDataCopy);

    // perform save/update operation in firestore
    try {
      !listing
        ? await addDoc(collection(db, 'listings'), formDataCopy)
        : await updateDoc(doc(db, 'listings', listingId), formDataCopy);

      toast.success(`Listing ${listing ? 'updated' : 'created'} successfully`);
      setLoading(false);
      navigate('/');
    } catch (error) {
      toast.error('Something went wrong');
      setLoading(false);
    }
  };

  // upload images to firebase storage
  const uploadImages = (images) => {
    const uploadPromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const fileName = `${formData.userRef}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, `images/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          'state_changed',
          () => {},
          (error) => reject(error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    });
    return Promise.all(uploadPromises);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <header className="mb-6">
        <p className="text-4xl font-bold">
          {listing ? 'Update Listing' : 'Create a Listing'}
        </p>
      </header>

      <main>
        <form onSubmit={onSubmit} className="font-semibold max-w-sm">
          <div className="mb-4">
            <label htmlFor="type">Sell / Rent</label>
            <div className="mt-1 flex gap-4">
              <PrimaryBtn
                onMutate={onMutate}
                isActive={type === 'sale'}
                id="type"
                value="sale"
              >
                Sell
              </PrimaryBtn>
              <PrimaryBtn
                onMutate={onMutate}
                isActive={type === 'rent'}
                id="type"
                value="rent"
              >
                Rent
              </PrimaryBtn>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block">
              Name
            </label>
            <input
              type="text"
              id="name"
              onChange={onMutate}
              value={name}
              className="py-3 px-5 mt-1 w-full outline-none rounded-2xl"
              required
            />
          </div>
          <div className="flex gap-8 mb-3">
            <div className="flex flex-col items-center">
              <label htmlFor="bedrooms">Bedrooms</label>
              <input
                onChange={onMutate}
                value={bedrooms}
                type="number"
                min={0}
                id="bedrooms"
                className="w-16 h-11 pl-5 pr-1 mt-1 rounded-2xl outline-none"
              />
            </div>
            <div className="flex flex-col items-center">
              <label htmlFor="bathrooms">Bathrooms</label>
              <input
                onChange={onMutate}
                value={bathrooms}
                type="number"
                min={0}
                id="bathrooms"
                className="w-16 h-11 pl-5 pr-1 mt-1 rounded-2xl outline-none"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="parking">Parking spot</label>
            <div className="mt-1  flex gap-4">
              <PrimaryBtn
                onMutate={onMutate}
                id="parking"
                isActive={parking === true}
                value={true}
              >
                Yes
              </PrimaryBtn>
              <PrimaryBtn
                onMutate={onMutate}
                id="parking"
                isActive={parking === false}
                value={false}
              >
                No
              </PrimaryBtn>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="furnished">Furnished</label>
            <div className="mt-1  flex gap-4">
              <PrimaryBtn
                onMutate={onMutate}
                id="furnished"
                isActive={furnished === true}
                value={true}
              >
                Yes
              </PrimaryBtn>
              <PrimaryBtn
                onMutate={onMutate}
                id="furnished"
                isActive={furnished === false}
                value={false}
              >
                No
              </PrimaryBtn>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block">
              Address
            </label>
            <textarea
              onChange={onMutate}
              value={location}
              id="location"
              cols="36"
              rows="3"
              className="rounded-2xl p-2 mt-1 outline-none w-full"
              required
            ></textarea>
          </div>
          <div className="flex gap-8 mb-4">
            <div>
              <label htmlFor="lat">Latitude</label>
              <input
                onChange={onMutate}
                type="text"
                id="lat"
                value={geolocation.lat || lat}
                className="w-36 h-11 px-4 rounded-2xl outline-none"
              />
            </div>
            <div>
              <label htmlFor="long">Longitude</label>
              <input
                onChange={onMutate}
                type="text"
                id="long"
                value={geolocation.long || long}
                className="w-36 h-11 px-4 rounded-2xl outline-none"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="offer">Offer</label>
            <div className="mt-1 flex gap-4">
              <PrimaryBtn
                onMutate={onMutate}
                id="offer"
                isActive={offer === true}
                value={true}
              >
                Yes
              </PrimaryBtn>
              <PrimaryBtn
                onMutate={onMutate}
                id="offer"
                isActive={offer === false}
                value={false}
              >
                No
              </PrimaryBtn>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="regularPrice">Regular Price</label>
            <div className="mt-1 flex items-center gap-4">
              <input
                onChange={onMutate}
                value={regularPrice}
                type="number"
                id="regularPrice"
                min={0}
                className="w-36 h-11 pl-16 pr-1 rounded-2xl outline-none"
                required
              />
              {type === 'rent' && <p> $ / Month</p>}
            </div>
          </div>
          {offer && (
            <div className="mb-4">
              <label htmlFor="discountedPrice">Discounted Price</label>
              <div className="mt-1 flex items-center gap-4">
                <input
                  onChange={onMutate}
                  value={discountedPrice}
                  type="number"
                  id="discountedPrice"
                  min={0}
                  className="w-36 h-11 pl-16 pr-1 rounded-2xl outline-none"
                />
              </div>
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="images">Images</label>
            <p className="my-1 text-xs text-gray-500">
              The first image will be the cover (max 6).
            </p>
            <div className="relative">
              <input
                onChange={onMutate}
                type="file"
                id="images"
                accept=".jpg,.jpeg,.png"
                max="6"
                multiple
                className="bg-white p-4 mt-1 w-full rounded-2xl cursor-pointer file:opacity-0 file:z-10 file:relative"
                required={listing ? false : true}
              />
              <span className="absolute left-2 top-1 translate-y-1/2 bg-accent text-white px-2 py-1  rounded-xl">
                Choose Files
              </span>
            </div>
          </div>
          <button
            className="py-3 px-5 w-full mt-8 outline-none rounded-2xl bg-accent text-white hover:bg-hover"
            type="submit"
          >
            {listing ? 'Update' : 'Create'} Listing
          </button>
        </form>
      </main>
    </div>
  );
};
export default ListingForm;
