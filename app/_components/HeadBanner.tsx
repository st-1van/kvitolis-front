"use client";

import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { SlideProps } from "./Carousel";
import { getImageUrl } from "@/utils/api-helpers";



export default function HeadBanner({ 
  title,
  photo,
  desc = '',
  btn = [],  
  gradient = 'light',
  color = 'green',
  src,
}: SlideProps) {
  
  const bgUrl = src ?? getImageUrl(photo?.url) ?? '/assets/default-slide.png';

  return (
    <div 
      className={`headBanner headBanner--${gradient}`} 
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <div className={`headBanner__content headBanner__content--${gradient} color--${color}`}>
        <h1 className="headBanner__headline">{title}</h1>
        <p className="headBanner__description">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSanitize]}
        >
          {desc||''}
        </ReactMarkdown>
        </p>
        <div>
          {(btn[0] && btn[0].slug) && (
            <Link href={btn[0].slug || '#'}>
              <button className="btn btn--medium btn--green">{ btn[0].text || `Більше`}</button>
            </Link>
          )}
          {(btn[1] && btn[1].slug) && (
            <Link href={btn[1].slug || '#'}>
              <button className="btn btn--medium btn--outlined">{ btn[1].text || `Більше`}</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
