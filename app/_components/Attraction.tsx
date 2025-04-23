"use client";

import Link from "next/link";

interface AttractionProps {
  title: string;
  src: string;
  desc: string;
  slug?: string;
  button1?:string;
  slug2?: string;
  button2?:string;
  gradient?: string; 
}

export default function Attraction({ title, src, desc, slug, slug2, button1, button2, gradient }: AttractionProps) {
  return (
    <div 
      className={`attraction attraction--${gradient}`} 
      style={{ backgroundImage: `url(${src})` }}
    >
      <div className="attraction__overlay"></div>
      <div className="attraction__content">
        <h2 className="attraction__headline">{title}</h2>
        <p className="attraction__description">{desc}</p>
        <div>
          {src && slug ?(
            <Link href={slug || '#'}>
              <button className="btn btn--medium btn--green">{ button1 || `Більше`}</button>
            </Link>
          ):''}
          {(src && slug2) && (
            <Link href={slug2 || '#'}>
              <button className="btn btn--medium btn--outlined">{ button2 || `Більше`}</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
