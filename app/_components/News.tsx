"use client";
import Image from "next/image";
import Link from "next/link";
import AnimatedOnScroll from "./ui/AnimatedScroll";
import { ImageItemProps } from "./StandartGallery";
import { MasonryBlock } from "./garden/MasonaryBlock";

export type NewsProps = {
  title: string;
  desc: string;
  items: NewsItemProps[];
};

export type NewsItemProps = {
  id: string;
  documentId: string;
  title: string;
  text: string;
  desc: string;
  date: string;
  img?: {
    url: string;
  };
  gallery?: ImageItemProps[];
  banner?: {
    url: string;
  };
};

export default function News({ title, desc, items }: NewsProps) {

  return (
    <section className="news">
      <div className="container">
        <div className="content">
          <div className="news__title">
            <h2>{title}</h2>
            <p>{desc}</p>
          </div>
          <div className="news__list row">
            {items.map((item) => (
              <NewsItem key={item.documentId} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsItem({ title, img, desc, date, documentId} :NewsItemProps ) {

  return (
    <AnimatedOnScroll animationClass="fade-in-up">
      <div className="news__item">

        <div className="news__date">{date}</div>

        {img && <Image src={img.url || ''} alt={title || "News Image"}
                width={371}
                height={324}
                className="news__img"
        />}

        <div className="news__headline">
          <Link href={`/news/${documentId}`}>
            <h5>{title}</h5>
          </Link>
          <div className="news__description">
            <p>{desc}</p>
            {/* {documentId && <Link href={`/news/${documentId}`}>більше</Link>} */}
          </div>
        </div>
      </div>
    </AnimatedOnScroll>
  );
}

export function NewsOnMainPage({ title, desc, items }: NewsProps) {
  return (
    <section className="news">
      <div className="container">
        <div className="content">
          <div className="news__title">
            <h2>{title}</h2>
            <p>{desc}</p>
          </div>
          <MasonryBlock data={items} Card={NewsItem} slug={'/news'} />
        </div>
      </div>
    </section>
  )}
