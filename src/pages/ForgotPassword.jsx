import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase.config';
import { RiMailFill, RiArrowRightSLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import InputField from '../components/InputField';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const onClick = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset link sent');
    } catch (error) {
      toast.error('Invalid email');
    }
  };

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <h1 className="font-bold text-3xl mb-10">Forgot Password</h1>
      <main>
        <InputField
          input="Email"
          icon={RiMailFill}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="text-end text-accent font-bold my-8">
          <Link to="/sign-in">Sign In instead</Link>
        </div>
        <div className="text-2xl font-bold flex items-center justify-between">
          <span>Send Reset Link</span>
          <button
            onClick={onClick}
            className="bg-accent h-12 w-12 flex justify-center items-center text-white font-extrabold rounded-full"
          >
            <RiArrowRightSLine size="1.8rem" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
