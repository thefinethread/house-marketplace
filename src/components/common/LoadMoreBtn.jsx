import { RiArrowDownSLine } from 'react-icons/ri';

const LoadMoreBtn = ({ handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="outline-none text-sm text-gray-500 px-8 border-2 border-orange-300/80 flex justify-center items-center font-medium cursor-pointer rounded-full hover:bg-white"
    >
      <p>Load More</p>
      <RiArrowDownSLine size="2rem" />
    </button>
  );
};

export default LoadMoreBtn;
