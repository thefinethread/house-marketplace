import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  RiUserFill,
  RiLockPasswordFill,
  RiArrowRightSLine,
  RiMailFill,
} from 'react-icons/ri';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase.config';
import { toast } from 'react-toastify';
import InputField from '../components/inputField/InputField';
import OAuth from '../components/oAuth/OAuth';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      // copying formdata object to new one
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      // insert record in firestore db
      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      toast.success('Signed up successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <header className="font-bold text-3xl">Create Your Account</header>
      <form onSubmit={onSubmit} className="my-8">
        <InputField
          onChange={onChange}
          input="Name"
          value={name}
          icon={RiUserFill}
        />
        <InputField
          onChange={onChange}
          input="Email"
          value={email}
          icon={RiMailFill}
        />
        <InputField
          onChange={onChange}
          input="Password"
          value={password}
          icon={RiLockPasswordFill}
          showPassword={showPassword}
          toggleVisibility={() => setShowPassword((prev) => !prev)}
        />

        <div className="text-end text-accent font-bold my-8">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <div className="text-2xl font-bold flex items-center justify-between">
          <span>Sign Up</span>
          <button className="bg-accent h-12 w-12 flex justify-center items-center text-white font-extrabold rounded-full">
            <RiArrowRightSLine size="1.8rem" />
          </button>
        </div>
      </form>

      <OAuth />
      <div className="text-accent text-lg text-center  font-bold">
        <Link to="/sign-in">Sign In Instead</Link>
      </div>
    </div>
  );
};

export default SignUp;
