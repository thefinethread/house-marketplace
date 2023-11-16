import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  RiUserFill,
  RiMailFill,
  RiHome4Fill,
  RiArrowRightSLine,
} from 'react-icons/ri';
import { signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';

import InputField from '../components/InputField';

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
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

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (auth.currentUser.displayName !== name) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        toast.info('Profile updated');
      } catch (error) {
        toast.error(`Couldn't update your profile`);
      }
    }
  };

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <header className="flex justify-between">
        <h1 className="font-bold text-3xl">Hi {name.split(' ')[0]}!</h1>
        <button
          onClick={onLogout}
          className="font-bold text-white px-4 cursor-pointer rounded-full bg-accent hover:bg-hover"
        >
          Logout
        </button>
      </header>

      <main className="mt-20">
        <section className="md:flex md:justify-between md:gap-10">
          <form className="relative w-full">
            <InputField
              input="Name"
              value={name}
              icon={RiUserFill}
              disabled={!editMode}
              onChange={onChange}
            />
            <InputField
              input="Email"
              value={email}
              icon={RiMailFill}
              disabled={true}
            />
            <div
              onClick={() => {
                setEditMode((prev) => !prev);
                editMode && handleSubmit();
              }}
              className="absolute -top-8 right-0 cursor-pointer text-accent font-bold text-right"
            >
              {editMode ? 'Save Changes' : 'Edit'}
            </div>
          </form>
          <div className="w-full">
            <Link to="/create-listing">
              <div className="flex w-full justify-between items-center bg-white px-5 py-5 rounded-2xl font-bold">
                <RiHome4Fill size="1.4rem" />
                <p>Sell or rent your home</p>
                <RiArrowRightSLine size="1.6rem" />
              </div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
