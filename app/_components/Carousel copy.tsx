'use client'
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SliderData = [

  {
    title:'Відпочинок серед природи',
    desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    src:'/assets/banners/banner-1.jpg',
    slug:'/attractions/rent',
    gradient:'dark'
},
{
    title:'Сад українства',
    desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    src:'/assets/banners/banner-2.jpg',
    slug:'/attractions/sad-ukrainstva',
    gradient:'light'
},
{
    title:'Також ви можете провести',
    desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    src:'/assets/banners/banner-3.jpg',
    slug:'/attractions/make-event',
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
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="container">
      <div 
        className='carousel'
      >
        {/* Images */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            // className={styles.imageWrapper}
          >
            <Image
              src={SliderData[currentIndex].src}
              alt={SliderData[currentIndex].title}
              layout="fill"
              objectFit="cover"
              // className={styles.image}
            />
          </motion.div>
        </AnimatePresence>

        {/* Text Block */}
        <div 
        // className={styles.textBlock}
        >
          <h2>{SliderData[currentIndex].title}</h2>
          <p>{SliderData[currentIndex].desc}</p>
          <button
          // className={styles.button} 
          >
            <a href={SliderData[currentIndex].slug}>Read More</a>
          </button>
        </div>

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
    </div>
  );
}
