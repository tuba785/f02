import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Navigation,
  Autoplay,
  FreeMode,
  Thumbs,
} from "swiper/modules";

import { useState } from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import "./SlidersDemo.css";

const slides = ["One", "Two", "Three", "Four", "Five"];

/* 1. Обычный слайдер (hero / баннеры) */
export function BasicSlider() {
  return (
    <section>
      <h2>Basic slider</h2>

      <Swiper modules={[Pagination]} spaceBetween={20} slidesPerView={1} loop>
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="slide">{s}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

/* 2. Слайдер с пагинацией (точки) */
export function PaginationSlider() {
  return (
    <section>
      <h2>Pagination slider</h2>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={20}
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="slide slide-green">{s}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

/* 3. Слайдер со стрелками (каталоги, карточки) */
export function NavigationSlider() {
  return (
    <section>
      <h2>Navigation slider</h2>
      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerView={3}
        spaceBetween={20}
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="slide slide-orange">{s}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

/* 4. Автослайдер (промо, реклама) */
export function AutoplaySlider() {
  return (
    <section>
      <h2>Autoplay slider</h2>
      <Swiper modules={[Autoplay]} autoplay={{ delay: 2000 }} loop>
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="slide slide-red">{s}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

/* 5. Несколько слайдов на экране (карточки товаров) */
export function MultiSlider() {
  return (
    <section>
      <h2>Multiple slides</h2>
      <Swiper slidesPerView={4} spaceBetween={20}>
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="slide slide-purple">{s}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

/* 6. Free mode (скролл как лента) */
export function FreeModeSlider() {
  return (
    <section>
      <h2>Free mode slider</h2>
      <Swiper
        modules={[FreeMode]}
        freeMode
        slidesPerView="auto"
        spaceBetween={20}
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i} className="auto-slide">
            <div className="slide slide-dark">{s}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

/* 7. Галерея с миниатюрами (фото, товары) */
export function ThumbsSlider() {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <section>
      <h2>Gallery with thumbs</h2>

      <Swiper
        modules={[Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        spaceBetween={10}
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="slide slide-blue">{s}</div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        slidesPerView={5}
        spaceBetween={10}
        className="thumbs"
        watchSlidesProgress
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="thumb">{s}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

/* 8. Общий экспорт (удобно для демо) */
export default function SlidersDemo() {
  return (
    <>
      <BasicSlider />
      <PaginationSlider />
      <NavigationSlider />
      <AutoplaySlider />
      <MultiSlider />
      <FreeModeSlider />
      <ThumbsSlider />
    </>
  );
}
