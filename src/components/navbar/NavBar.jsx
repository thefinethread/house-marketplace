import { RiCompass3Line, RiPriceTag3Line, RiUserLine } from 'react-icons/ri';
import NavItem from './NavItem';

const NavBar = () => {
  return (
    <nav className="shadow-[0_0_8px_0_rgba(0,0,0,0.15)] fixed w-full bg-white bottom-0 text-gray-400 md:h-screen md:left-0 md:w-auto">
      <ul className="flex max-w-4xl mx-auto px-8 py-2 items-center justify-between h-full md:flex-col md:px-4 md:justify-start md:gap-10">
        <NavItem to="/" icon={RiCompass3Line} text="Explore" />
        <NavItem to="/offers" icon={RiPriceTag3Line} text="Offers" />
        <div className="hidden md:block md:flex-grow"></div>
        <NavItem to="/profile" icon={RiUserLine} text="Profile" />
      </ul>
    </nav>
  );
};

export default NavBar;
