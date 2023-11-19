import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { RiShareForwardFill } from 'react-icons/ri';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase.config';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper/modules';
import { numberWithCommas } from '../utils/helperFunctions';
import Spinner from '../components/common/Spinner';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copyToClipBoard, setCopyToClipBoard] = useState(false);

  const { listingId } = useParams();

  useEffect(() => {
    const getListing = async () => {
      const listingSnap = await getDoc(doc(db, 'listings', listingId));

      if (listingSnap.exists()) {
        setListing(listingSnap.data());
        setLoading(false);
      } else {
        return <div>No listing available for the id.</div>;
      }
    };
    getListing();
  }, [listingId]);

  const copyLinkToClipBoard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyToClipBoard(true);

    setTimeout(() => {
      setCopyToClipBoard(false);
    }, 2000);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div>
        <Swiper
          className="h-[70vw] max-h-64"
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          loop={true}
          autoplay={{ delay: 2000, pauseOnMouseEnter: true }}
        >
          {listing.imageUrls.map((url, index) => {
            return (
              <SwiperSlide key={index}>
                <img
                  src={url}
                  alt="house"
                  className={'w-full object-cover h-full'}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div
        onClick={copyLinkToClipBoard}
        className="fixed cursor-pointer border top-2 right-6 flex justify-center items-center bg-white rounded-full h-14 w-14 z-10"
      >
        <RiShareForwardFill color="rgba(0,0,0,0.7)" size="1.8rem" />
      </div>
      {copyToClipBoard && (
        <div className="fixed py-1 right-6 top-20 px-4 font-bold rounded-full bg-white">
          Link Copied!
        </div>
      )}

      <div className="mt-10 px-4 max-w-6xl m-auto">
        <h2 className="font-bold text-2xl">{listing.name}</h2>
        <div className="text-xl my-1 font-bold text-accent">
          ${numberWithCommas(listing.regularPrice)}{' '}
          {listing.offer && (
            <span className="line-through font-normal opacity-80">
              ${numberWithCommas(listing.discountedPrice)}
            </span>
          )}{' '}
          {listing.type === 'rent' && '/ Month'}
        </div>
        <p className="my-1 font-bold text-sm">{listing.location}</p>
        <div className="my-2">
          <span className="px-4 py-1 font-bold text-sm text-white bg-accent rounded-full">
            For {listing.type === 'rent' ? 'Rent' : 'Sale'}
          </span>
          {listing.offer && (
            <span className="px-4 py-1 ml-2 font-bold text-sm text-white bg-orange-500 rounded-full">
              $
              {numberWithCommas(listing.regularPrice - listing.discountedPrice)}{' '}
              discount
            </span>
          )}
        </div>
        <ul className="font-semibold text-gray-600">
          <li>
            {listing.bedrooms} {listing.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
          </li>
          <li>
            {listing.bathrooms}{' '}
            {listing.bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}
          </li>
          {listing.parking && <li>Parking Spot</li>}
          {listing.furnished && <li>{listing.furnished} Furnished</li>}
        </ul>

        <h3 className="font-bold text-xl mt-5 mb-2">Location</h3>
        {/* Map */}
        <MapContainer
          center={[listing.geolocation.lat, listing.geolocation.long]}
          zoom={13}
          scrollWheelZoom={false}
          className="h-[50vw] max-h-96 w-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[listing.geolocation.lat, listing.geolocation.long]}
          >
            <Popup>{listing.location}</Popup>
          </Marker>
        </MapContainer>

        {auth.currentUser?.uid !== listing.userRef && (
          <Link
            to={`/contact/${listing.userRef}?listingName=${listing.name}}`}
            className="mx-auto mt-10 block max-w-lg text-center py-3 px-10 font-bold text-xl bg-accent text-white rounded-2xl hover:bg-hover transition-colors"
          >
            Contact Landlord
          </Link>
        )}
      </div>
    </div>
  );
};

export default Listing;
