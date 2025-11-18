import React from "react";
import SingleAlleyClient from "./SingleAlleyClient";
import fetchAPI from "../../../lib/strapi";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const revalidate = 60;

type Params = { alley: string };

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  
  const { alley } = await props.params;

  try {
    const path = `/alleys-col`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await fetchAPI(path, {
      filters: { slug: alley },
      populate: {
        seo: { populate: "*" },
      },
      pagination: { pageSize: 20 },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const item: any = Array.isArray(res?.data) ? res.data[0] : res?.data ?? null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const seo: any = item?.seo ?? {};

    const title = seo?.metaTitle ?? item?.title ?? "";
    const description = seo?.metaDescription ?? item?.description ?? item?.desc ?? "";
    const keywords = seo?.keywords ?? undefined;

    // підтримка різних структур для зображення SEO або поля img
    const metaImage = seo?.metaImage ?? seo?.meta_image ?? null;

    const imageUrl: string | undefined =
      metaImage?.url ??
      metaImage?.data?.attributes?.url ??
      item?.img?.url ??
      item?.img?.data?.attributes?.url ??
      undefined;

    const canonical = seo?.canonicalUrl ?? `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/garden`;

    const metadata: Metadata = {
      title,
      description,
      keywords,
      openGraph: {
        type: "website",
        title,
        description,
        images: imageUrl ? [{ url: imageUrl }] : [],
        locale: "uk_UA",
        url: canonical,
      },
      alternates: {
        canonical,
      },
    };

    return metadata;
  } catch (err) {
    console.error("generateMetadata (news) failed:", err);
    return {};
  }
}

export async function generateStaticParams(): Promise<Params[]> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await fetchAPI('/alleys-col', { fields: ['slug'], pagination: { pageSize: 20 } }, { timeout: 15000, retries: 1 } as any) as StrapiCollection<any>;
    const items = res.data ?? [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return items.map((it: any) => ({ alley: it.slug }));
  } catch (err) {
    console.error('generateStaticParams: failed to fetch slugs from Strapi:', err);
    // Не падаємо build — повертаємо пустий масив. Можна підключити on-demand revalidation пізніше.
    return [];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StrapiCollection<T> = { data: T[]; meta?: any };

export default async function Page(props: {
  params: Promise<Params>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {

  const { alley } = await props.params;

  try {
    // const query = `filters[slug][$eq]=${encodeURIComponent(alley)}&populate[tree][populate]=img&populate[famousPeople][populate]=photo`;
    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const res = await fetchAPI(`/alleys-col?${query}`, undefined, { timeout: 15000, retries: 1 } as any) as StrapiCollection<any>;
    const path = `/alleys-col`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await fetchAPI(path, {
      filters: { slug: alley },
      populate: {
        tree: { populate: 'img' },
        famousPeople: { populate: 'photo' },
        seo: { populate: '*' }
      },
      pagination: { pageSize: 20 },
    });


    const items = res.data ?? [];
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