import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Modal = ({ removeListing, onClose, isOpen, listing, listingId }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });

  return isOpen ? (
    <ul
      ref={modalRef}
      className="bg-white font-bold text-sm min-w-max w-48 py-2 absolute right-0 top-0 rounded-lg overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.2)]"
    >
      <Link to={`/update-listing/${listingId}`} state={listing}>
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
  ) : null;
};

export default Modal;
