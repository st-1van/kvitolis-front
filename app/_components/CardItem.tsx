import Image from "next/image";

type CardProps = {
  title?: string;
  src?: string;
  desc?: string;
};

type CardItemProps = {
  card: CardProps;
  index: number;
};

export default function CardItem({ card, index }: CardItemProps) {
  const { title, desc, src } = card;

  return (
    <div className="card col">
      <p className="card__number">{`0${index+1}`}</p>
      {src && (
        <Image
          className="card__img"
          src={src}
          alt={title || "Image"}
          // fill={true}
          width={394}
          height={400}
        />
      )}
      <h3 className="card__title">{title}</h3>
      <p>{desc}</p>
    </div>
  );
}
