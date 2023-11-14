import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiUserFill, RiMailFill } from 'react-icons/ri';
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
      <div className="flex justify-between">
        <header className="font-bold text-3xl">Hi {name.split(' ')[0]}!</header>
        <button
          onClick={onLogout}
          className="font-bold text-white px-4 cursor-pointer rounded-full bg-accent hover:bg-hover"
        >
          Logout
        </button>
      </div>
      <div
        onClick={() => {
          setEditMode((prev) => !prev);
          editMode && handleSubmit();
        }}
        className="mt-10 mb-2 cursor-pointer text-accent font-bold text-right"
      >
        {editMode ? 'Save Changes' : 'Edit'}
      </div>
      <form>
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
      </form>
    </div>
  );
};

export default Profile;
