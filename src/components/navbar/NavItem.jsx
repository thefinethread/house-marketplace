import { NavLink } from 'react-router-dom';

const NavItem = ({ to, icon: Icon, text }) => {
  return (
    <NavLink to={to}>
      <li className="flex flex-col items-center justify-center gap-[2px] hover:cursor-pointer">
        <Icon size="1.9rem" />
        <p className="text-sm">{text}</p>
      </li>
    </NavLink>
  );
};

export default NavItem;
