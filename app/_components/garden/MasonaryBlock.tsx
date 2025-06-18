"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";


type MasonryBlockProps<T> = {
    data: T[];
    Card: React.ComponentType<T & { index: number }>;
  };
  
export function MasonryBlock<T extends { id: string, priority:string }>({ data, Card }: MasonryBlockProps<T>) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollbarThumbRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const [scrollThumbLeft, setScrollThumbLeft] = useState(0);
  const [isShowed, setShow] = useState(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  useEffect(() => {
    updateScrollbar();
    window.addEventListener("resize", updateScrollbar);
    return () => window.removeEventListener("resize", updateScrollbar);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.3;
      scrollContainerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const updateScrollbar = () => {
    if (scrollContainerRef.current && scrollbarThumbRef.current) {
      const container = scrollContainerRef.current;
      // const thumb = scrollbarThumbRef.current;

      const scrollWidth = container.scrollWidth - container.clientWidth;
      const thumbWidth = (container.clientWidth / container.scrollWidth) * 100;

      setScrollbarWidth(thumbWidth);
      setScrollThumbLeft((container.scrollLeft / scrollWidth) * (100 - thumbWidth));
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollbar);
      return () => container.removeEventListener("scroll", updateScrollbar);
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    startX.current = e.clientX;
    startScrollLeft.current = scrollContainerRef.current?.scrollLeft || 0;
  };


  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const deltaX = e.clientX - startX.current;
    const scrollWidth = container.scrollWidth - container.clientWidth;
    const moveAmount = (deltaX / container.clientWidth) * scrollWidth;
    container.scrollLeft = startScrollLeft.current + moveAmount;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleShow = () => {
    setShow(prev => !prev);
  }

  return (

        <div className="masonary">
            <div className="masonary__wrapper">
            <div className={`masonary__items row ${isShowed ? '--showed' : ''} `} ref={scrollContainerRef}>
                  {data
                    .sort((a, b) => Number(a.priority) - Number(b.priority))
                    .map((card, index) => (
                      <Card key={card.id} {...card} index={index} />
                  ))}
            </div>
            </div>

            <div className={`masonary__navigation row`}>
            <button className="btn btn--minimal btn--small" onClick={handleShow}>{isShowed?'Сховати':'Переглянути всі'}</button>

            <div className={`masonary__scrollbar ${isShowed ? '--hide' : ''}`}>
                <div
                  ref={scrollbarThumbRef}
                  className={`masonary__scrollbar-thumb ${isDragging ? "active" : ""}`}
                  onMouseDown={handleMouseDown}
                  style={{
                      width: `${scrollbarWidth}%`,
                      left: `${scrollThumbLeft}%`,
                  }}
                ></div>
            </div>

            <div className={`masonary__arrows ${isShowed ? '--hide' : ''}`}>
                <button className="masonary__arrow left" onClick={() => handleScroll("left")}>
                <Image src="/assets/LeftArrow.svg" alt="arrowLeft" width={35} height={35} />
                </button>
                <button className="masonary__arrow right" onClick={() => handleScroll("right")}>
                <Image src="/assets/RightArrow.svg" alt="arrowRight" width={35} height={35} />
                </button>
            </div>
            </div>
        </div>
  );
}

