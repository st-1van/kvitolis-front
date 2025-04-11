"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"

type AlleyItemProps = {
  title: string;
  tree: string;
  treeImg: string;
  slug: string;
};

type TreesDataProps = {
  treesData: AlleyItemProps[];
};

export default function Trees({ treesData }: TreesDataProps) {
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
    <section className="trees">
      <div className="container">
        <div className="trees__headline">
            <h2>Наші дерева</h2>
            <p className="desc">
              Ми беремо дорослі саджанці, що мають 99% шанс приживання і що за 3 роки дають достатньо тіні. Ми професійно доглядаємо за деревами, щоб наші діти могли творити під ним.
            </p>
        </div>

        <div className="trees__wrapper">
          <div className="trees__items row" ref={scrollContainerRef}>
            {treesData.map((card, index) => (
              <AlleyCard key={card.slug + index} {...card} />
            ))}
          </div>
        </div>

        <div className="trees__navigation">
          <button className="btn btn--minimal">Переглянути всі</button>

          <div className="trees__scrollbar">
            <div
              ref={scrollbarThumbRef}
              className={`trees__scrollbar-thumb ${isDragging ? "active" : ""}`}
              onMouseDown={handleMouseDown}
              style={{
                width: `${scrollbarWidth}%`,
                left: `${scrollThumbLeft}%`,
              }}
            ></div>
          </div>

          <div className="trees__arrows">
            <button className="trees__arrow left" onClick={() => handleScroll("left")}>
              <Image src="/assets/LeftArrow.svg" alt="arrowLeft" width={35} height={35} />
            </button>
            <button className="trees__arrow right" onClick={() => handleScroll("right")}>
              <Image src="/assets/RightArrow.svg" alt="arrowRight" width={35} height={35} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function AlleyCard({ title, tree, treeImg, slug }: AlleyItemProps) {
  return (
    <div>
      <div className="tree col">
        {treeImg && <Image className="tree__img" src={treeImg} alt={title} width={394} height={400} />}
      </div>
        <div className="tree__text">
          <p className="tree__name">{title}</p>
          <p>{tree}</p>
        </div>
        <Link href={`/garden/${slug}`} >
            <button className="btn btn--medium btn--green">
              Посадити дерево
            </button>
          </Link>
    </div>
  );
}
