'use client';
import { getImageUrl } from "@/utils/api-helpers";
import Image from "next/image";
import Link from "next/link";

export type CardProps = {
  title?: string;
  photo?:{
    url:string;
  };
  desc?: string;
  src?:string;
  btn?:{
    text:string;
    slug:string;
  };
};

export type CardItemProps = {
  card: CardProps;
  index: number;
  style?: string;
};

export default function CardItem({ card, style }: CardItemProps) {
  const { title, desc, photo, src } = card;
  const imgUrl = src ?? getImageUrl(photo?.url ?? '') ?? '';

  const url = card.btn?.slug.startsWith('http') ? card.btn?.slug : `${process.env.NEXT_PUBLIC_BASE_URL}/${card.btn?.slug}`;
  return (
    <div className="card col">
        <Image
          className={`card__img ${style}`}
          src={imgUrl}
          alt={title || "Image"}
          width={394}
          height={400}
        />
      <h3 className="card__title">{title}</h3>
      <p>{desc}</p>
      {card.btn && (
        <Link href={url} className="sub">
            {card.btn.text}
        </Link>
      )}
    </div>
  );
}
