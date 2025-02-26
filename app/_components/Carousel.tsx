'use client'
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SliderData = [

  {
    title:'Відпочинок серед природи',
    desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    src:'/assets/banners/banner-1.jpg',
    slug:'/carousels/rent',
    gradient:'dark'
},
{
    title:'Сад українства',
    desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    src:'/assets/banners/banner-2.jpg',
    slug:'/carousels/sad-ukrainstva',
    gradient:'light'
},
{
    title:'Також ви можете провести',
    desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    src:'/assets/banners/banner-3.jpg',
    slug:'/carousels/make-event',
    gradient:'light'
},
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = SliderData.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % length);
  }, [length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  }, [length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="container">
        {/* Images */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
            // className={styles.imageWrapper}
          >
            <div 
              className={`carousel carousel--${SliderData[currentIndex].gradient}`} 
              style={{ backgroundImage: `url(${SliderData[currentIndex].src})` }}
            >
              <div className="carousel__overlay"></div>
              <div className="carousel__content">
                <h1>{SliderData[currentIndex].title}</h1>
                <p className="carousel__description">{SliderData[currentIndex].desc}</p>
                {SliderData[currentIndex].src && (
                  <Link href={SliderData[currentIndex].slug || '#'}>
                    <button className="btn btn--medium btn--green">Дізнатися більше</button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button onClick={prevSlide} 
        // className={styles.navButtonLeft}
        >
          <ChevronLeft />
        </button>
        <button onClick={nextSlide} 
        // className={styles.navButtonRight}
        >
          <ChevronRight />
        </button>

        {/* Pagination Dots */}
        <div 
        // className={styles.pagination}
        >
          {SliderData.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              // className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ""}`}
            ></div>
          ))}
        </div>

    </div>
  );
}
