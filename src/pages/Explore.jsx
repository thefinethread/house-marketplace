import { Link } from 'react-router-dom';
import sellCategoryImg from '../assets/sellCategoryImage.jpg';
import rentCategoryImg from '../assets/rentCategoryImage.jpg';

const Explore = () => {
  return (
    <div className="py-10 px-4 max-w-7xl mx-auto font-bold">
      <header className="mb-6">
        <p className="text-4xl">Explore</p>
      </header>
      {/* @TODO image slider */}
      <main>
        <h3 className="mb-4">Categories</h3>
        <div className="flex justify-between gap-4">
          <Link to="/category/rent" className="flex-1">
            <img
              src={rentCategoryImg}
              alt="rent category"
              className="w-full h-auto max-h-[15vw] min-h-[115px] object-cover rounded-xl"
            />
            <p className="mt-3 font-normal">Places for rent</p>
          </Link>
          <Link to="/category/sale" className="flex-1">
            <img
              src={sellCategoryImg}
              alt="sale category"
              className="w-full h-auto max-h-[15vw] min-h-[115px] object-cover rounded-xl"
            />
            <p className="mt-3 font-normal">Places for sale</p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Explore;
