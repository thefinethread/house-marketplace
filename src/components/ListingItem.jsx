import { FaBath, FaBed } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { numberWithCommas } from '../utils/helperFunctions';

const ListingItem = ({ item }) => {
  return (
    <Link to={`/category/${item.type}/${item.id}`} className="max-w-lg block">
      <div className="flex p-2 gap-6 justify-start items-stretch h-30 rounded-2xl transition-colors hover:bg-white">
        <img
          src={item.imageUrls[0]}
          alt="house"
          className="h-full w-1/3  object-cover rounded-3xl"
        />
        <div className="text-xs h-full flex flex-col justify-between w-full">
          <p className="text-gray-500 font-semibold">{item.location}</p>
          <h3 className="text-base font-bold">{item.name}</h3>
          <div className="text-base font-bold text-accent">
            ${numberWithCommas(item.regularPrice)}{' '}
            {item.offer && (
              <span className="line-through font-normal opacity-80">
                ${numberWithCommas(item.discountedPrice)}
              </span>
            )}{' '}
            {item.type === 'rent' && '/ Month'}
          </div>
          <div className="flex justify-start gap-8 text-gray-500 font-semibold">
            <div className="flex items-center gap-2">
              <FaBed size="1.4rem" />
              <p>
                {item.bedrooms} {item.bedrooms > 0 ? 'Bedrooms' : 'Bedroom'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaBath size="1.2rem" />
              <p>
                {item.bathrooms} {item.bathrooms > 0 ? 'Bathrooms' : 'Bathroom'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingItem;
