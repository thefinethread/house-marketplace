import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth } from '../../firebase.config';
import { db } from '../../firebase.config';
import { ReactComponent as GoogleIcon } from '../../assets/googleicon.svg';
import { toast } from 'react-toastify';

const OAuth = () => {
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();

  const onClick = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // create user in db
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
        toast.success('Signed up successfully!');
      } else {
        toast.success(`Welcome back! You're signed in.`);
      }
      navigate('/');
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="text-center flex flex-col text-lg font-semibold ">
      <button
        onClick={onClick}
        className="flex items-center my-6 py-2 bg-white justify-center gap-3 border-accent border-2 border-solid rounded-full"
      >
        <span>Continue with</span>
        <GoogleIcon height="1.3rem" width="1.3rem" />
      </button>
    </div>
  );
};

export default OAuth;
