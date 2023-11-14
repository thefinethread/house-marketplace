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
      } catch (error) {}
    };

    getDataFromDb();
  }, [type]);

  if (loading) return <Spinner />;

  return listings.length > 0 ? <div>{listings[0].name}</div> : 'no listings';
};

export default Category;
