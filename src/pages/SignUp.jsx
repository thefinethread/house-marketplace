import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  RiUserFill,
  RiLockPasswordFill,
  RiArrowRightSLine,
  RiFileUserFill,
} from 'react-icons/ri';

import { ReactComponent as GoogleIcon } from '../assets/googleicon.svg';

import InputField from '../components/inputField/InputField';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});

  const { name, email, password } = formData;

  const changeFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <header className="font-bold text-3xl">Welcome Back!</header>
      <form onSubmit={handleSubmit} className="my-8">
        <InputField
          onChange={changeFormData}
          input="Name"
          value={name}
          icon={RiFileUserFill}
        />
        <InputField
          onChange={changeFormData}
          input="Email"
          value={email}
          icon={RiUserFill}
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
