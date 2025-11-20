'use client';

import React from "react";
import StandartGallery from "@/app/_components/StandartGallery";
import type { NewsItemProps } from "@/app/_components/News";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import Visualisation from "@/app/_components/garden/alley/Visualisation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapToNewsItem(item: any): NewsItemProps {
  const id = item.id ? String(item.id) : '';
  const documentId = String(item.documentId);
  const title = item?.title ?? "";
  const desc = item?.desc ?? "";
  const text = item?.text ?? "";
  const date = item?.date ?? "";
  const banner = item?.banner && typeof item.banner?.url === "string" ? { url: item.banner.url } : undefined;
  const videoId = item?.videoId ?? '';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const galleryRaw: any[] =
    Array.isArray(item?.gallery) ? item.gallery :
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Array.isArray(item?.gallery?.data) ? item.gallery.data.map((g: any) => g?.url ?? {}) :
    [];

  const gallery = galleryRaw
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((g: any) => ({ url: g?.url, id: g?.id }))
    .filter((g) => typeof g.url === "string" && g.url.length > 0);

  return {
    id,
    documentId,
    title,
    desc,
    text,
    date,
    gallery,
    banner,
    videoId,
  };
}

export default function SingleNewsClient(props: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const news: NewsItemProps = mapToNewsItem(props.data as any);
  const { title, desc, text, date, banner, videoId } = news;

  if (!news || !news.title) {
    return (
      <main>
        <p>Сторінка не знайдена</p>
      </main>
    );
  }

  return (
    <main>
      <div className="first-screen container animate fade-in-up"
        style={{
          backgroundImage: `url('${banner?.url || '/assets/default-slide.png'}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '350px',}}
        >
      
      </div>

      <section className="article">
        <div className="container col col-lg">
          <div className="news__date">{date}</div>
          <h1>{title}</h1>
          <p className="subp">{desc}</p>
          <div>
            <ReactMarkdown
              rehypePlugins={[rehypeSanitize]}
              remarkPlugins={[remarkGfm]}
            >
              {text}
            </ReactMarkdown>
          </div>
          {videoId && (
            <Visualisation
              videoId={videoId}
            />
          )}
        </div>
      </section>
      {Array.isArray(news.gallery) && news.gallery.length > 0 && (
        <StandartGallery images={news.gallery} />
      )}
    </main>
  );
}