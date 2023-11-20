import { Link } from 'react-router-dom';

const Modal = ({ removeListing }) => {
  return (
    <ul className="bg-white font-bold text-sm min-w-max w-48 py-2 absolute right-0 top-full rounded-lg overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.2)]">
      <Link to="/create-listing">
        <li className="p-3 px-4 rounded-lg hover:bg-accent hover:text-white transition-colors">
          Edit Listing
        </li>
      </Link>
      <li
        className="cursor-pointer p-3 px-4 rounded-lg hover:bg-accent hover:text-white  transition-colors"
        onClick={removeListing}
      >
        Remove Listing
      </li>
    </ul>
  );
};

export default Modal;
