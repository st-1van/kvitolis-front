'use client'
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { getImageUrl } from "@/utils/api-helpers";

  type Button = {
    id: string;
    text?: string;
    slug: string;
  };

  export type SlideProps = {
    id: string;
    title: string;
    desc?: string;
    gradient?: string;
    color?: string;
    photo: {
      url: string;
    };
    src?: string;
    btn?: Button[];
  };

  interface CarouselDataProps {
    CarouselData:SlideProps[];
  }



export default function Carousel({ CarouselData }: CarouselDataProps) {
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

  const slide = CarouselData[currentIndex];
  const btns = slide.btn ?? [];
  const primary = btns[0]; 

  const bgUrl = getImageUrl(slide.photo?.url) ?? '/assets/default-slide.png';

  return (
    <section className="carousel">
      <div className="container">
        <div className="relative-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }}
            >
              <div
                className={`headBanner carousel-body headBanner--${slide.gradient}`}
                style={{ backgroundImage: `url(${bgUrl})` }}
              >
                <div className={`headBanner__content headBanner__content--${slide.gradient} color--${slide.color}`}>
                  <h1>{slide.title}</h1>
                  <p className="headBanner__description">{slide.desc}</p>

                  <div className="headBanner__buttons">
                            {primary?.slug && (
                              <Link href={primary.slug}>
                                <button className={`btn btn--medium btn--${slide.color}`}>
                                  {primary.text ?? 'дізнатися більше'}
                                </button>
                              </Link>
                            )}
                          <Arrows prevSlide={prevSlide} nextSlide={nextSlide} />
                        </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="headBanner__navigation">
              <Arrows prevSlide={prevSlide} nextSlide={nextSlide} />
              <div className='headBanner__pagination'>
                {CarouselData.map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`dot ${idx === currentIndex ? '--active' : ""}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}

type ArrowsProps = {
  prevSlide: () => void;
  nextSlide: () => void;
};

function Arrows({ prevSlide, nextSlide }: ArrowsProps){
  return(
        <div className="arrows">
        <div className="fade">
          <button onClick={prevSlide}
            className="arrow left"
          >
            <Image src="/assets/LeftArrow.svg" alt="arrowLeft" width={35} height={35} />
          </button>
        </div>
        <div className="fade">
          <button onClick={nextSlide}
            className="arrow right"
          >
            <Image src="/assets/RightArrow.svg" alt="arrowRight" width={35} height={35} />
          </button>
        </div>
      </div>
  )
}
