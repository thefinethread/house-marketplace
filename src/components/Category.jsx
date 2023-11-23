import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import Spinner from './common/Spinner';
import { toast } from 'react-toastify';
import ListingItem from './ListingItem';
import LoadMoreBtn from './common/LoadMoreBtn';

const Category = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

  const { type } = useParams();

  useEffect(() => {
    const getDataFromDb = async () => {
      const q = query(
        collection(db, 'listings'),
        where('type', '==', type),
        orderBy('timestamp', 'desc'),
        limit(10)
      );
      try {
        let listingsArr = [];

        const querySnap = await getDocs(q);

        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisible);

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
  }, [type]);

  const onLoadMore = async () => {
    const q = query(
      collection(db, 'listings'),
      where('type', '==', type),
      orderBy('timestamp', 'desc'),
      startAfter(lastFetchedListing),
      limit(10)
    );

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

  if (loading) return <Spinner />;

  return listings.length > 0 ? (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <header className="mb-8 font-bold">
        <p className="text-4xl">Places for {type}</p>
      </header>
      <div className="grid gap-6 min-[920px]:grid-cols-2">
        {listings.map((item) => (
          <ListingItem key={item.id} item={item} />
        ))}
      </div>

      {lastFetchedListing && (
        <div className="mt-8 flex justify-center items-center">
          <LoadMoreBtn handleClick={onLoadMore} />
        </div>
      )}
    </div>
  ) : (
    <div className="flex items-center justify-center mt-20">
      No listings available at the moment.
    </div>
  );
};

export default Category;
