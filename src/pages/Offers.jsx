import { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import Spinner from '../components/common/Spinner';
import { toast } from 'react-toastify';
import ListingItem from '../components/ListingItem';
import LoadMoreBtn from '../components/common/LoadMoreBtn';

const Offers = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('All');
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

  const tabs = ['All', 'Rent', 'Sale'];

  useEffect(() => {
    setLoading(true);

    const getDataFromDb = async () => {
      let q;

      if (tab === 'All') {
        q = query(
          collection(db, 'listings'),
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(10)
        );
      } else {
        q = query(
          collection(db, 'listings'),
          where('type', '==', tab.toLowerCase()),
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(10)
        );
      }

      try {
        const querySnap = await getDocs(q);

        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisible);

        const listingsArr = [];

        querySnap.forEach((doc) =>
          listingsArr.push({
            id: doc.id,
            ...doc.data(),
          })
        );

        setListings(listingsArr);
        setLoading(false);
      } catch (error) {
        toast.error('Error fetching listings');
      }
    };
    getDataFromDb();
  }, [tab]);

  const onLoadMore = async () => {
    let q;
    if (tab === 'All') {
      q = query(
        collection(db, 'listings'),
        where('offer', '==', true),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(10)
      );
    } else {
      q = query(
        collection(db, 'listings'),
        where('type', '==', tab.toLowerCase()),
        where('offer', '==', true),
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
    }
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <header className="mb-8 font-bold">
        <h1 className="text-4xl mb-8">Offers</h1>
      </header>

      <div className="font-bold text-accent mb-8">
        {tabs.map((tabValue) => (
          <button
            key={tabValue}
            onClick={() => setTab(tabValue)}
            className={`px-4 font-semibold text-sm cursor-pointer rounded-full mr-2 ${
              tab === tabValue ? 'bg-hover text-white' : 'text-black bg-white '
            }`}
          >
            {tabValue}
          </button>
        ))}
      </div>

      {loading ? (
        <Spinner />
      ) : listings.length > 0 ? (
        <div className="grid gap-6 min-[920px]:grid-cols-2">
          {listings.map((item) => (
            <ListingItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center mt-20">There are no current offers.</div>
      )}

      {lastFetchedListing && (
        <div className="mt-8 flex justify-center items-center">
          <LoadMoreBtn handleClick={onLoadMore} />
        </div>
      )}
    </div>
  );
};

export default Offers;
