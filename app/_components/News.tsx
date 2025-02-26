"use client";
import Image from "next/image";
import Link from "next/link";

type NewsProps = {
  title: string;
  desc: string;
};

type NewsItemProps = {
  title: string;
  src?: string;
  desc: string;
  date: string;
  slug: string;
};


const news: NewsItemProps[] = [
  {
    title: "Перша новина",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.и",
    date: "14.02.2025",
    src: "/assets/news/news-1.jpg",
    slug: "/news/1",
  },
  {
    title: "Друга новина",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "15.02.2025",
    src: "/assets/news/news-2.jpg",
    slug: "/news/2",
  },
  {
    title: "Друга новина",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "15.02.2025",
    src: "/assets/news/news-3.jpg",
    slug: "/news/3",
  },
];

export default function News({ title, desc }: NewsProps) {
  return (
    <section className="news">
      <div className="container">
        <div className="content">
          <div className="news__title">
            <h2>{title}</h2>
            <p>{desc}</p>
          </div>
          <div className="news__list row">
            {news.map((item, index) => (
              <NewsItem key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsItem({ item }: { item: NewsItemProps }) {
  const { title, src, desc, date, slug } = item;

  return (
    <div className="news__item">

      <div className="news__date">{date}</div>

      {src && <Image src={src} alt={title || "News Image"}
              width={371}
              height={324}
              // fill={true}
              className="news__img"
      />}

      <div className="news__headline">
        <h5>{title}</h5>
        <p className="news__description">{desc}</p>
        {slug && <Link href={slug}>Більше</Link>}
      </div>
    </div>
  );
}
