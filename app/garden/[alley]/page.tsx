import React from "react";
import SingleAlleyClient from "./SingleAlleyClient";
import fetchAPI from "../../../lib/strapi";
import { notFound } from "next/navigation";

export const revalidate = 60;

type Params = { alley: string };

export async function generateStaticParams(): Promise<Params[]> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await fetchAPI('/alleys-col', { fields: ['slug'], pagination: { pageSize: 12 } }, { timeout: 15000, retries: 1 } as any);
    const items = res?.data ?? [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return items.map((it: any) => ({ alley: it.slug }));
  } catch (err) {
    console.error('generateStaticParams: failed to fetch slugs from Strapi:', err);
    // Не падаємо build — повертаємо пустий масив. Можна підключити on-demand revalidation пізніше.
    return [];
  }
}

export default async function Page(props: {
  params: Promise<Params>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {

  const { alley } = await props.params;

  try {
    const query = `filters[slug][$eq]=${encodeURIComponent(alley)}&populate[tree][populate]=img&populate[famousPeople][populate]=photo`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await fetchAPI(`/alleys-col?${query}`, undefined, { timeout: 15000, retries: 1 } as any);
    const items = res?.data ?? [];
    if (!items.length) return notFound();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataForClient = items.map((it: any) => {
      return {
        id: it.id,
        alleyName: it.alleyName ?? '',
        desc: it.desc ?? null,
        slug: it.slug,
        priority: it.priority ?? '',
        alleyImg: it.alleyImg?.url ?? it.alleyImg ?? null,
        tree:{
          name: it.tree.name,
          desc: it.tree.desc,
          img: it.tree.img,
          price: it.tree.price,
          latin: it.tree.latin
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        famousPeople: (it.famousPeople ?? []).map((p: any) => ({
          // id: p.id,
          // photo: p.photo.url,
          ...p,
        }))
      };
    });

    return <SingleAlleyClient data={dataForClient} slug={alley} />;
  } catch (err) {
    console.error(`Page: failed to fetch alley data for slug="${alley}":`, err);
    // Якщо запит впав — повернемо 404, або можна рендерити fallback UI
    return notFound();
  }
}