import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  RiMailFill,
  RiLockPasswordFill,
  RiArrowRightSLine,
} from 'react-icons/ri';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../firebase.config';

import { toast } from 'react-toastify';
import InputField from '../components/InputField';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const { email, password } = formData;

  const changeFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(getAuth(app), email, password);
      toast.success(`Welcome back! You're signed in.`);
      navigate('/');
    } catch (error) {
      toast.error('Invalid login credentials.');
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <header className="font-bold text-3xl">Welcome Back!</header>
      <form onSubmit={handleSubmit} className="my-8">
        <InputField
          onChange={changeFormData}
          input="Email"
          value={email}
          icon={RiMailFill}
        />
        <InputField
          onChange={changeFormData}
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
          <span>Sign In</span>
          <button className="bg-accent h-12 w-12 flex justify-center items-center text-white font-extrabold rounded-full">
            <RiArrowRightSLine size="1.8rem" />
          </button>
        </div>
      </form>

      <OAuth />
      <div className="text-accent text-lg text-center  font-bold">
        <Link to="/sign-up">Sign Up Instead</Link>{' '}
      </div>
    </div>
  );
};

export default SignIn;
