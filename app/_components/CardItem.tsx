import { getImageUrl } from "@/utils/api-helpers";
import Image from "next/image";

export type CardProps = {
  title?: string;
  photo?:{
    url:string;
  };
  desc?: string;
  src?:string;
};

type CardItemProps = {
  card: CardProps;
  index: number;
  style?: string;
};

export default function CardItem({ card, style }: CardItemProps) {
  const { title, desc, photo, src } = card;
  const imgUrl = src ?? getImageUrl(photo?.url ?? '') ?? '';
  console.log('CardItem imgUrl:', imgUrl);

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
    </div>
  );
}
