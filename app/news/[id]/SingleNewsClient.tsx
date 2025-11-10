'use client';

import React from "react";
import StandartGallery from "@/app/_components/StandartGallery";
import type { NewsItemProps } from "@/app/_components/News";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapToNewsItem(item: any): NewsItemProps {
  const id = String(item.id);
  const title = item?.title ?? "";
  const desc = item?.desc ?? "";
  const text = item?.text ?? "";
  const publishedAt = item?.publishedAt ?? "";

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
    title,
    desc,
    text,
    publishedAt,
    gallery
  };
}

export default function SingleNewsClient(props: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const news: NewsItemProps = mapToNewsItem(props.data as any);

  if (!news || !news.title) {
    return (
      <main>
        <p>Сторінка не знайдена</p>
      </main>
    );
  }

  return (
    <main>
      <h1>{news.title}</h1>
      <p>{news.desc}</p>
      
      <div>
        <ReactMarkdown
          rehypePlugins={[rehypeSanitize]}
          remarkPlugins={[remarkGfm]}
        >
          {news.text}
        </ReactMarkdown>
        </div>
      {Array.isArray(news.gallery) && news.gallery.length > 0 && (
        <StandartGallery images={news.gallery} />
      )}
    </main>
  );
}