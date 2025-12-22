"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useMemo } from "react";
import Link from "next/link";

type MasonryBlockProps<T> = {
  data: T[];
  Card: React.ComponentType<T & { index: number }>;
  slug?:string;
};

export function MasonryBlock<T extends { id: string; priority?: string; publishedAt?: string }>({
  data,
  Card,
  slug,
}: MasonryBlockProps<T>) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollbarThumbRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const [scrollThumbLeft, setScrollThumbLeft] = useState(0);
  const [isShowed, setShow] = useState(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  // For touch events
  const touchStartX = useRef(0);
  const touchStartScroll = useRef(0);

  useEffect(() => {
    updateScrollbar();
    window.addEventListener("resize", updateScrollbar);
    return () => window.removeEventListener("resize", updateScrollbar);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    // console.log('clicked', direction);
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
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const thumbWidth = (container.clientWidth / container.scrollWidth) * 100;

      setScrollbarWidth(thumbWidth);
      setScrollThumbLeft(
        (container.scrollLeft / scrollWidth) * (100 - thumbWidth)
      );
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

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !scrollContainerRef.current) return;
      const container = scrollContainerRef.current;
      const deltaX = e.clientX - startX.current;
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const moveAmount = (deltaX / container.clientWidth) * scrollWidth;
      container.scrollLeft = startScrollLeft.current + moveAmount;
    },
    [isDragging]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove]);

  // TOUCH HANDLERS (SWIPE)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartScroll.current = scrollContainerRef.current?.scrollLeft || 0;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    const deltaX = e.touches[0].clientX - touchStartX.current;
    scrollContainerRef.current.scrollLeft =
      touchStartScroll.current - deltaX;
  };

  const handleShow = () => {
    setShow((prev) => !prev);
  };


  const sorted = useMemo(() => {
    if (!Array.isArray(data)) return [];

    const parsePriority = (v?: string) => {
      const n = parseFloat(v ?? "0");
      return Number.isNaN(n) ? 0 : n;
    };

    return [...data].sort((a, b) => {
      // Парсимо priority як число (fallback 0)
      const priorityA = parsePriority(a.priority ?? a.publishedAt);
      const priorityB = parsePriority(b.priority ?? b.publishedAt);

      return priorityA - priorityB;
    });
  }, [data]);


  return (
    <div className="masonary">
      <div className="masonary__wrapper">
        <div
          className={`masonary__items row ${isShowed ? "--showed" : ""} `}
          ref={scrollContainerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
            {sorted.map((card, index) => (
              <Card key={card.id} {...card} index={index} />
            ))}
        </div>
      </div>

      <div className={`masonary__navigation row`}>
        {!slug ?(
         <button
          className="btn btn--minimal btn--small more-btn"
          onClick={handleShow}
        >
            {isShowed ? "Сховати" : "Переглянути всі"}
        </button>
        ):(
         <button
          className="btn btn--minimal btn--small more-btn"
        >
          <Link href={slug||'#'}>
            Переглянути всі
          </Link>
        </button>
        )}

        <div className={`masonary__scrollbar ${isShowed ? "--hide" : ""}`}>
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

        <div className={`masonary__arrows ${isShowed ? "--hide" : ""}`}>
          <button
            className="masonary__arrow left"
            onClick={() => handleScroll("left")}
          >
            <Image
              src="/assets/LeftArrow.svg"
              alt="arrowLeft"
              width={35}
              height={35}
            />
          </button>
          <button
            className="masonary__arrow right"
            onClick={() => handleScroll("right")}
          >
            <Image
              src="/assets/RightArrow.svg"
              alt="arrowRight"
              width={35}
              height={35}
            />
          </button>
        </div>
      </div>
    </div>
  );
}