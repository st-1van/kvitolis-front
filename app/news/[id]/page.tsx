import React from "react";
import { notFound } from "next/navigation";
import SingleNewsClient from "./SingleNewsClient";
// Використай той самий helper, що і в інших сторінках
import { fetchAPI } from "../../../lib/strapi";

export const revalidate = 60;

type Params = { id: string };


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateStaticParams(): Promise<Params[]> {
  try {
    // Отримуємо до 12 slug для попередньої генерації
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await fetchAPI("/news-col", {
      fields: ["id"],
      pagination: { pageSize: 12},
    });
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items: any[] = Array.isArray(res?.data) ? res.data : [];


    const ids: (string | number)[] = items.map((it) => {
      if (typeof it.id === "number" || typeof it.id === "string") {
        return it.id;
      } else {
        return null;
      }
    }).filter((id): id is string | number => id !== null);

    return ids.map((id) => ({ id: String(id) }));

  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("generateStaticParams (news):", err);
    return [];
  }
}

export default async function Page(props: {
  params: Promise<Params>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await props.params;

  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/news-col`;

    const urlParamsObject = {
      filters: { id },
      populate: {
        img: { populate: "*" },
        gallery: { populate: "*" },
      },
    };

    const options: RequestInit = {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    };

    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const responseData: any = await fetchAPI(path, urlParamsObject, options);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const item: any = Array.isArray(responseData?.data) ? responseData.data[0] : null;

    if (!item) return notFound();

    return <SingleNewsClient data={item} />;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`Failed to fetch news by id="${id}":`, err);
    return notFound();
  }
}