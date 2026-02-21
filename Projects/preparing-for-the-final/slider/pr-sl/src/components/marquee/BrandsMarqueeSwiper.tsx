import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';

import './BrandsMarqueeSwiper.css';

const brands = [
  'Google',
  'Apple',
  'Microsoft',
  'Amazon',
  'Netflix',
  'Meta',
];

export default function BrandsMarqueeSwiper() {
  return (
    <div className="brands-swiper-wrapper">
      <Swiper
        modules={[Autoplay, FreeMode]}
        slidesPerView="auto"
        spaceBetween={40}
        freeMode
        loop
        speed={6000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        allowTouchMove={false}
      >
        {brands.map((brand, index) => (
          <SwiperSlide key={index} className="brand-slide">
            <div className="brand">
              {brand}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
