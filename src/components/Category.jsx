import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import Spinner from './common/Spinner';
import { toast } from 'react-toastify';
import ListingItem from './ListingItem';

const Category = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <Spinner />;

  return listings.length > 0 ? (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <header className="mb-8 font-bold">
        <p className="text-4xl">Places for {type}</p>
      </header>
      <div>
        {listings.map((item) => (
          <ListingItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  ) : (
    'no listings'
  );
};

export default Category;
