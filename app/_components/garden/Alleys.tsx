"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type AlleyItemProps = {
  title: string;
  alleyName: string;
  src: string;
  slug: string;
};

type AlleysDataProps = {
  alleysData: AlleyItemProps[];
};

export default function Alleys({ alleysData }: AlleysDataProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollbarThumbRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const [scrollThumbLeft, setScrollThumbLeft] = useState(0);
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

  return (
    <section className="alleys">
      <div className="container">
        <div className="alleys__headline row">
          <div className="col">
            <p>12 алей</p>
            <h2>Алеї українства</h2>
          </div>
          <div className="col col-sm">
            <p>
              Кожна алея парку висаджена одним типом дерев і присвячена певній тематиці і на своєму
              шляху розповідає про видатних українських постатей цього напрямку.
            </p>
          </div>
        </div>

        <div className="alleys__wrapper">
          <div className="alleys__items row" ref={scrollContainerRef}>
            {alleysData.map((card, index) => (
              <AlleyCard key={card.slug + index} {...card} />
            ))}
          </div>
        </div>

        <div className="alleys__navigation">
          <button className="btn btn--minimal">Переглянути всі</button>

          <div className="alleys__scrollbar">
            <div
              ref={scrollbarThumbRef}
              className={`alleys__scrollbar-thumb ${isDragging ? "active" : ""}`}
              onMouseDown={handleMouseDown}
              style={{
                width: `${scrollbarWidth}%`,
                left: `${scrollThumbLeft}%`,
              }}
            ></div>
          </div>

          <div className="alleys__arrows">
            <button className="alleys__arrow left" onClick={() => handleScroll("left")}>
              <Image src="/assets/LeftArrow.svg" alt="arrowLeft" width={35} height={35} />
            </button>
            <button className="alleys__arrow right" onClick={() => handleScroll("right")}>
              <Image src="/assets/RightArrow.svg" alt="arrowRight" width={35} height={35} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function AlleyCard({ title, alleyName, src, slug}: AlleyItemProps) {
  return (
    <div className="alley col">
      <Link href={slug}>
        {src && <Image className="alley__img" src={src} alt={title} width={394} height={400} />}
        <p className="alley__name">{title}</p>
        <p>{alleyName}</p>
      </Link>
    </div>
  );
}
