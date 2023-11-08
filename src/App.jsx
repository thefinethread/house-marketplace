import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Explore from './pages/Explore';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import NavBar from './components/navbar/NavBar';

const App = () => {
  return (
    <Router>
      <div className="font-primary w-ful h-screen bg-gray-400 overflow-x-hidden">
        <div className="md:ml-20">
          <Routes>
            <Route path="/" element={<Explore />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/profile" element={<SignIn />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </div>
        <NavBar />
      </div>
    </Router>
  );
};

export default App;