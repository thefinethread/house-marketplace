import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  RiUserFill,
  RiLockPasswordFill,
  RiArrowRightSLine,
  RiFileUserFill,
} from 'react-icons/ri';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase.config';
import { toast } from 'react-toastify';

import { ReactComponent as GoogleIcon } from '../assets/googleicon.svg';
import InputField from '../components/inputField/InputField';

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
      delete formData.password;
      formData.timeStamp = serverTimestamp();
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
          icon={RiFileUserFill}
        />
        <InputField
          onChange={onChange}
          input="Email"
          value={email}
          icon={RiUserFill}
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
      <div className="text-center flex flex-col text-lg font-semibold ">
        <button className="flex items-center my-6 py-2 bg-white justify-center gap-3 border-accent border-2 border-solid rounded-full">
          <span>Continue with</span>
          <GoogleIcon height="1.3rem" width="1.3rem" />
        </button>
        <Link to="/sign-in" className="text-accent font-bold">
          Sign In Instead
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
