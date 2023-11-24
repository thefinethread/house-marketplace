import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase.config';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper/modules';
import Spinner from '../components/common/Spinner';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import sellCategoryImg from '../assets/sellCategoryImage.jpg';
import rentCategoryImg from '../assets/rentCategoryImage.jpg';

const Explore = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getRecommendedListings = async () => {
      let listingsArr = [];

      const q = query(
        collection(db, 'listings'),
        orderBy('timestamp', 'desc'),
        limit(5)
      );

      const listingsSnap = await getDocs(q);
      if (!listingsSnap.empty) {
        listingsSnap.forEach((doc) => {
          listingsArr.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      }
      setListings(listingsArr);
      setLoading(false);
    };

    getRecommendedListings();
  }, []);

  return (
    <div className="py-10 px-4 h-full max-w-6xl mx-auto font-bold">
      {!loading ? (
        <>
          <header className="mb-6">
            <p className="text-4xl">Explore</p>
          </header>
          <section className="my-8">
            <h2 className="mb-2">Recommended</h2>
            <Swiper
              className="h-[70vw] max-h-64"
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              loop={true}
              autoplay={{ delay: 2000, pauseOnMouseEnter: true }}
            >
              {listings.map((listing, index) => {
                return (
                  <SwiperSlide
                    key={index}
                    onClick={() =>
                      navigate(`/category/${listing.type}/${listing.id}`)
                    }
                  >
                    <div className="relative h-full w-full">
                      <img
                        src={listing.imageUrls[0]}
                        alt="house"
                        className="w-full object-cover h-full cursor-pointer"
                      />
                      <div className="absolute bottom-6 left-0 ">
                        <div className="text-white mb-3 bg-black/70 px-4 py-1">
                          {listing.name}
                        </div>
                        <div className="bg-white/90  rounded-full w-fit px-4 py-1">
                          ${listing.discountedPrice || listing.regularPrice}{' '}
                          {listing.type === 'rent' && '/ Month'}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </section>
          <main>
            <h3 className="mb-4">Categories</h3>
            <div className="flex justify-between gap-4">
              <Link to="/category/rent" className="flex-1">
                <img
                  src={rentCategoryImg}
                  alt="rent category"
                  className="w-full h-auto max-h-[15vw] min-h-[115px] object-cover rounded-xl"
                />
                <p className="mt-2 font-medium">Places for rent</p>
              </Link>
              <Link to="/category/sale" className="flex-1">
                <img
                  src={sellCategoryImg}
                  alt="sale category"
                  className="w-full h-auto max-h-[15vw] min-h-[115px] object-cover rounded-xl"
                />
                <p className="mt-2 font-medium">Places for sale</p>
              </Link>
            </div>
          </main>
        </>
      ) : (
        <div className="h-full w-full">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Explore;
