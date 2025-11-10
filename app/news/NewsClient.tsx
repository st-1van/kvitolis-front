'use client';

import React, { useMemo } from "react";
import News, { NewsItemProps } from "../_components/News";
import { getImageUrl } from "@/utils/api-helpers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatDate(isoString: any) {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Місяці з 0
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapItem(raw: any) {
  // Підтримка формату Strapi: або top-level поля, або attributes.*
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const a: any = raw?.attributes ?? raw;

  const title = a.title;
  const desc = a.desc;
  const text = a.text;
  const publishedAt = formatDate(a.publishedAt);
  //перетворюємо id в рядок
  const documentId = String(a?.documentId) ?? "";

  // Зображення
  const imgUrl = getImageUrl(a?.img?.url ?? "");

  return {
    title,
    desc,
    text,
    publishedAt,
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
    () => (Array.isArray(items) ? items.map(mapItem) : []),
    [items]
  );

  return (
    <main>
      <News
        title={title}
        desc={desc}
        // Передаємо список новин (припускаємо що компонент News може прийняти проп типу items / data; якщо ні — адаптуй під його API)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        items={mapped as any}
      />
    </main>
  );
}