import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from './components/common/PrivateRoute';
import Explore from './pages/Explore';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import NavBar from './components/navbar/NavBar';
import Category from './components/Category';
import ListingForm from './pages/ListingForm';
import Listing from './pages/Listing';
import Contact from './pages/Contact';

const App = () => {
  return (
    <Router>
      <div className="font-primary flex flex-col  w-full h-screen bg-gray-100 overflow-x-hidden">
        <div className="mb-[70px] flex-1 md:ml-20 md:mb-auto">
          <Routes>
            <Route path="/" element={<Explore />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/category/:type" element={<Category />} />
            <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/create-listing" element={<ListingForm />} />
            <Route
              path="/update-listing/:listingId"
              element={<ListingForm />}
            />
            <Route
              path="/category/:categoryType/:listingId"
              element={<Listing />}
            />
            <Route path="/contact/:landlordId" element={<Contact />} />
          </Routes>
        </div>
        <NavBar />
      </div>
      <ToastContainer autoClose={3000} />
    </Router>
  );
};

export default App;
