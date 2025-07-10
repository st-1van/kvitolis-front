"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface HeadBannerProps {
  title: string;
  src?: string;
  desc?: ReactNode;
  slug?: string;
  button1?:string;
  slug2?: string;
  button2?:string;
  gradient?: string;
  color: 'green' | 'fiolet';
}

export default function HeadBanner({ title, src, desc, slug, slug2, button1, button2, gradient, color }: HeadBannerProps) {
  return (
    <div 
      className={`headBanner headBanner--${gradient}`} 
      style={{ backgroundImage: `url(${src||'/assets/default-slide.png'})` }}
    >
      <div className={`headBanner__content headBanner__content--${gradient} color--${color}`}>
        <h1 className="headBanner__headline">{title}</h1>
        <p className="headBanner__description">{desc||''}</p>
        <div>
          {(button1 && slug) && (
            <Link href={slug || '#'}>
              <button className="btn btn--medium btn--green">{ button1 || `Більше`}</button>
            </Link>
          )}
          {(button2 && slug2) && (
            <Link href={slug2 || '#'}>
              <button className="btn btn--medium btn--outlined">{ button2 || `Більше`}</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
