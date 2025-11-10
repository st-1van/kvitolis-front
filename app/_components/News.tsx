"use client";
import Image from "next/image";
import Link from "next/link";
import AnimatedOnScroll from "./ui/AnimatedScroll";
import { ImageItemProps } from "./StandartGallery";

type NewsProps = {
  title: string;
  desc: string;
  items: NewsItemProps[];
};

export type NewsItemProps = {
  id: string;
  title: string;
  text: string;
  desc: string;
  publishedAt: string;
  img?: {
    url: string;
  };
  gallery?: ImageItemProps[];
  banner?:{
    url: string;
  }
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
              <NewsItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsItem({ item }: { item: NewsItemProps }) {
  const { title, img, desc, publishedAt, id } = item;

  return (
    <AnimatedOnScroll animationClass="fade-in-up">
      <div className="news__item">

        <div className="news__date">{publishedAt}</div>

        {img && <Image src={img.url || ''} alt={title || "News Image"}
                width={371}
                height={324}
                className="news__img"
        />}

        <div className="news__headline">
          <h5>{title}</h5>
          <div>
            <p className="news__description">{desc}</p>
            {id && <Link href={`/news/${id}`}>Більше</Link>}
          </div>
        </div>
      </div>
    </AnimatedOnScroll>
  );
}
