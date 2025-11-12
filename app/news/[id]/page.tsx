import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import SingleNewsClient from "./SingleNewsClient";
import { fetchAPI } from "../../../lib/strapi";

export const revalidate = 60;

type Params = { id: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StrapiRes = any;

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await props.params;

  try {
    // Робимо той самий фільтр по documentId, як і у Page
    const res: StrapiRes = await fetchAPI("/news-col", {
      filters: { documentId: id },
      populate: {
        seo: { populate: "*" },
        img: { populate: "*" },
      },
      pagination: { pageSize: 1 },
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
      // структура: { url: "..." }
      metaImage?.url ??
      // структура: { data: { attributes: { url: "..." } } }
      metaImage?.data?.attributes?.url ??
      // fallback на загальне поле img
      item?.img?.url ??
      item?.img?.data?.attributes?.url ??
      undefined;

    const canonical = seo?.canonicalUrl ?? `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/news/${id}`;

    const metadata: Metadata = {
      title,
      description,
      keywords,
      openGraph: {
        type: "article",
        title,
        description,
        images: imageUrl ? [{ url: imageUrl }] : [],
        locale: "uk_UA",
        url: canonical,
        publishedTime: item.publishedAt,
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
    const res: StrapiRes = await fetchAPI("/news-col", {
      fields: ["documentId"],
      pagination: { pageSize: 1000 },
      sort: ["publishedAt:desc"],
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items: any[] = Array.isArray(res?.data) ? res.data : [];

    const ids: string[] = items
      .map((it) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const value = (it as any)?.documentId;
        if (value === null || typeof value === "undefined") return null;
        return String(value);
      })
      .filter((v): v is string => v !== null);

    return ids.map((id) => ({ id }));
  } catch (err) {
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
    const path = "/news-col";
    const urlParamsObject = {
      filters: { documentId: id },
      populate: {
        img: { populate: "*" },
        gallery: { populate: "*" },
        banner: { populate: "*" },
        seo: { populate: "*" },
      },
      pagination: { pageSize: 1 },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const responseData: StrapiRes = await fetchAPI(path, urlParamsObject, { timeout: 15000, retries: 1 } as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const item: any = Array.isArray(responseData?.data) ? responseData.data[0] : responseData?.data ?? null;

    if (!item) return notFound();

    return <SingleNewsClient data={item} />;
  } catch (err) {
    console.error(`Failed to fetch news by documentId="${id}":`, err);
    return notFound();
  }
}