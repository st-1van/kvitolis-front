'use client'
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CarouselData } from './data/Carousel';
import Image from "next/image";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = CarouselData.length;

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
    <section className="container">
        {/* Images */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
          >
            <div 
              className={`carousel carousel--${CarouselData[currentIndex].gradient}`} 
              style={{ backgroundImage: `url(${CarouselData[currentIndex].src})` }}
            >
              <div className="carousel__overlay"></div>
              <div className="carousel__content">
                <h1>{CarouselData[currentIndex].title}</h1>
                <p className="carousel__description">{CarouselData[currentIndex].desc}</p>
                {CarouselData[currentIndex].src && (
                  <Link href={CarouselData[currentIndex].slug || '#'}>
                    <button className="btn btn--medium btn--green">Дізнатися більше</button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="carousel__arrows">
          <button onClick={prevSlide}
            className="carousel__arrow left"
          >
            <Image src="/assets/LeftArrow.svg" alt="arrowLeft" width={35} height={35} />
          </button>
          <button onClick={nextSlide}
            className="carousel__arrow right"
          >
            <Image src="/assets/RightArrow.svg" alt="arrowRight" width={35} height={35} />
          </button>
        </div>

        {/* Pagination Dots */}
        <div 
        // className={styles.pagination}
        >
          {CarouselData.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              // className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ""}`}
            ></div>
          ))}
        </div>

    </section>
  );
}
