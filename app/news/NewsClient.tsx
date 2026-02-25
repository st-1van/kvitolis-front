'use client';

import React, { useMemo } from "react";
import News, { NewsItemProps } from "../_components/News";
import { getImageUrl } from "@/utils/api-helpers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapNews(raw: any) {
  // Підтримка формату Strapi: або top-level поля, або attributes.*
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const a: any = raw?.attributes ?? raw;
  const id = raw?.id ? String(raw.id) : '';

  const title = a.title;
  const desc = a.desc;
  const text = a.text;
  const date = a.date;
  //перетворюємо id в рядок
  const documentId = String(a?.documentId) ?? "";

  // Зображення
  const imgUrl = getImageUrl(a?.img?.url ?? "");

  return {
    id,
    title,
    desc,
    text,
    date,
    documentId,
    img: imgUrl ? { url: imgUrl } : undefined,
  };
}

export default function NewsClient(props: {
  title: string;
  desc: string;
  items: NewsItemProps[];
}) {
  const { title, desc, items } = props;

  const mapped = useMemo(
    () => (Array.isArray(items) ? items.map(mapNews) : []),
    [items]
  );

  return (
    <main>
      <News
        title={title}
        desc={desc}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        items={mapped as any}
      />
    </main>
  );
}