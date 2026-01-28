"use client";
import Link from "next/link";

interface AttractionProps {
  title: string;
  src: string;
  desc: string;
  slug?: string;
  button?:string;
  gradient?: string; 
}

export default function Attraction({ title, src, desc, slug, button, gradient }: AttractionProps) {
  return (
    <div 
      className={`attraction attraction--${gradient}`} 
      style={{ backgroundImage: `url(${src})` }}
    >
      {/* <div className="attraction__overlay"></div> */}
      <div className={`attraction__content attraction__content--${gradient}`}>
        <h2 className="attraction__headline">{title}</h2>
        <p className="attraction__description">{desc}</p>
        <div>
          {src && slug ?(
            <Link href={slug || '#'}>
              <button className="btn btn--medium btn--green">{ button || `Більше`}</button>
            </Link>
          ) : ''}
        </div>
      </div>
    </div>
  );
}
