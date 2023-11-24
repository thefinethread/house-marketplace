import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  RiUserFill,
  RiMailFill,
  RiHome4Fill,
  RiArrowRightSLine,
} from 'react-icons/ri';
import { signOut, updateProfile } from 'firebase/auth';
import {
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import { auth, db } from '../firebase.config';
import { toast } from 'react-toastify';

import InputField from '../components/InputField';
import Spinner from '../components/common/Spinner';
import ListingItem from '../components/ListingItem';
import LoadMoreBtn from '../components/common/LoadMoreBtn';

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [tab, setTab] = useState('all');
  const [lastFetchedListing, setLastFetchedListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [listings, setListings] = useState(null);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const tabValues = ['all', 'rent', 'sale'];

  const navigate = useNavigate();

  // fetch current user's listings
  useEffect(() => {
    setLoading(true);

    const getCurrentUserListings = async () => {
      let q;
      if (tab === 'all') {
        q = query(
          collection(db, 'listings'),
          where('userRef', '==', auth.currentUser.uid),
          orderBy('timestamp', 'desc'),
          limit(10)
        );
      } else {
        q = query(
          collection(db, 'listings'),
          where('type', '==', tab),
          where('userRef', '==', auth.currentUser.uid),
          orderBy('timestamp', 'desc'),
          limit(10)
        );
      }
      const querySnap = await getDocs(q);

      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisible);

      if (!querySnap.empty) {
        let docsArr = [];

        querySnap.forEach((doc) =>
          docsArr.push({
            id: doc.id,
            ...doc.data(),
          })
        );
        setListings(docsArr);
        setLoading(false);
      }
    };
    getCurrentUserListings();
  }, [tab]);

  const onLogout = async () => {
    try {
      await signOut(auth);
      toast.info('You are logged out.');
      navigate('/');
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (auth.currentUser.displayName !== name) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        toast.info('Profile updated');
      } catch (error) {
        toast.error(`Couldn't update your profile`);
      }
    }
  };

  const onLoadMore = async () => {
    setLoadMoreLoading(true);

    let q;
    if (tab === 'all') {
      q = query(
        collection(db, 'listings'),
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(10)
      );
    } else {
      q = query(
        collection(db, 'listings'),
        where('type', '==', tab),
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(10)
      );
    }

    try {
      const querySnap = await getDocs(q);

      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisible);

      if (!querySnap.empty) {
        const listingArr = [];

        querySnap.forEach((doc) =>
          listingArr.push({ id: doc.id, ...doc.data() })
        );

        setListings((prev) => [...prev, ...listingArr]);
      } else {
        toast.info('No more listings available');
      }
    } catch (error) {
      toast.error(`Couldn't load more listings`);
    } finally {
      setLoadMoreLoading(false);
    }
  };

  return (
    <div className="py-10 px-4 max-w-7xl h-full flex flex-col mx-auto">
      <header className="flex justify-between">
        <h1 className="font-bold text-3xl">Hi {name.split(' ')[0]}!</h1>
        <button
          onClick={onLogout}
          className="font-bold text-white px-4 cursor-pointer rounded-full bg-accent hover:bg-hover"
        >
          Logout
        </button>
      </header>

      <main className="mt-20 flex-1 flex flex-col">
        <section className="md:flex md:justify-between md:gap-10">
          <form className="relative w-full">
            <InputField
              input="Name"
              value={name}
              icon={RiUserFill}
              disabled={!editMode}
              onChange={onChange}
            />
            <InputField
              input="Email"
              value={email}
              icon={RiMailFill}
              disabled={true}
            />
            <div
              onClick={() => {
                setEditMode((prev) => !prev);
                editMode && handleSubmit();
              }}
              className="absolute -top-8 right-0 cursor-pointer text-accent font-bold text-right"
            >
              {editMode ? 'Save Changes' : 'Edit'}
            </div>
          </form>
          <div className="w-full">
            <Link to="/create-listing">
              <div className="flex w-full justify-between items-center bg-white px-5 py-5 rounded-2xl font-bold">
                <RiHome4Fill size="1.4rem" />
                <p>Sell or rent your home</p>
                <RiArrowRightSLine size="1.6rem" />
              </div>
            </Link>
          </div>
        </section>

        {listings && (
          <section className="flex-1 flex flex-col">
            <div className="mt-8 mb-4 flex justify-between items-center">
              <h3 className="text-xl font-bold">Your Listings</h3>
              <div className="font-bold text-accent">
                {tabValues.map((tabValue) => (
                  <button
                    key={tabValue}
                    onClick={() => setTab(tabValue)}
                    className={`px-4 font-semibold text-sm cursor-pointer rounded-full mr-2 ${
                      tab === tabValue
                        ? 'bg-hover text-white'
                        : 'text-black bg-white '
                    }`}
                  >
                    {tabValue}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="flex-1">
                <Spinner />
              </div>
            ) : (
              <>
                <div className="grid gap-6 min-[920px]:grid-cols-2">
                  {listings.map((item) => (
                    <ListingItem key={item.id} item={item} />
                  ))}
                </div>
                {lastFetchedListing && (
                  <div className="mt-8 flex justify-center items-center">
                    {loadMoreLoading ? (
                      <Spinner height="36px" width="36px" loadingText={false} />
                    ) : (
                      <LoadMoreBtn handleClick={onLoadMore} />
                    )}
                  </div>
                )}
              </>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default Profile;
