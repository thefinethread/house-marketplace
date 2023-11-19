import { useState, useEffect } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import { RiMailFill } from 'react-icons/ri';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import Spinner from '../components/common/Spinner';

const Contact = () => {
  const [landlord, setLandlord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const { landlordId } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const getLandlord = async () => {
      const docSnap = await getDoc(doc(db, 'users', landlordId));
      if (docSnap.exists) {
        setLandlord(docSnap.data());
        setLoading(false);
      } else {
        setLoading(false);
        return (
          <div>Sorry, We couldn't find landlord info in our database!</div>
        );
      }
    };
    getLandlord();
  }, [landlordId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="py-8 px-4 max-w-6xl mx-auto">
      <header className="mb-8 font-bold">
        <h1 className="text-4xl mb-8">Contact Landlord</h1>
      </header>

      <main>
        <p className="font-bold">Contact {landlord.name}</p>
        <div className="mt-8">
          <label className="block mb-2 font-semibold" htmlFor="message">
            Message
          </label>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            id="message"
            className="w-full p-4 h-80 outline-none rounded-2xl"
          ></textarea>
        </div>
        <Link
          to={`mailto:${landlord.email}?Subject=${searchParams.get(
            'listingName'
          )}&body=${message}`}
          className="flex justify-center items-center gap-4 mx-auto mt-10 max-w-lg text-center py-3 px-10 font-bold text-xl bg-accent text-white rounded-2xl hover:bg-hover transition-colors"
        >
          <RiMailFill />
          Send Message
        </Link>
      </main>
    </div>
  );
};

export default Contact;
