import { FaBath, FaBed } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const ListingItem = ({ item }) => {
  return (
    <Link to={`/category/${item.type}/${item.id}`}>
      <div className="flex gap-5 justify-start items-stretch h-28">
        <img
          src={item.imageUrls[0]}
          alt="house"
          className="h-full w-1/3  object-cover rounded-3xl"
        />
        <div className="text-xs h-full flex flex-col justify-between">
          <p className="text-gray-500 font-semibold">{item.location}</p>
          <h3 className="text-base font-bold">{item.name}</h3>
          <div className="text-base font-bold text-accent">
            ${item.regularPrice} {item.type === 'rent' && '/ Month'}
          </div>
          <div className="flex justify-between text-gray-500 font-semibold">
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
