import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiUserFill, RiMailFill } from 'react-icons/ri';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';

import InputField from '../components/inputField/InputField';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await signOut(auth);
      toast.info('You are logged out.');
      navigate('/');
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between">
        <header className="font-bold text-3xl">Hi {name.split(' ')[0]}!</header>
        <button
          onClick={onLogout}
          className="font-bold text-white px-4 cursor-pointer rounded-full bg-accent hover:bg-hover"
        >
          Logout
        </button>
      </div>

      <form className="my-8">
        <InputField
          input="Name"
          value={name}
          icon={RiUserFill}
          disabled={true}
        />
        <InputField
          input="Email"
          value={email}
          icon={RiMailFill}
          disabled={true}
        />
      </form>
    </div>
  );
};

export default Profile;
