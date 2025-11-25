import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import FestivalClient from "./FestivalClient";
import { fetchAPI } from "../../../utils/fetch-api";

export const revalidate = 60;

type Params = { festival: string };

type ListItem =
  | { id: number | string; slug?: string | null; [k: string]: unknown }
  | { id: number | string; attributes?: { slug?: string | null } };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StrapiRes = any;

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const { festival } = await props.params;

  try {
    // Робимо той самий фільтр по documentId, як і у Page
    const res: StrapiRes = await fetchAPI("/festivalis", {
      filters: { slug: festival },
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

    const canonical = seo?.canonicalUrl ?? `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/festivals/${festival}`;

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

// Спроба дістати slug з різних можливих форматів Strapi
function extractSlug(item: ListItem): string | null {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const top = (item as any)?.slug;
  if (typeof top === "string" && top.length > 0) return top;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const attrs = (item as any)?.attributes;
  const nested = attrs?.slug;
  if (typeof nested === "string" && nested.length > 0) return nested;
  return null;
}

export async function generateStaticParams(): Promise<Params[]> {
  try {
    // Підтягнути до 12 slug для попередньої генерації
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await fetchAPI("/festivalis", {
      fields: ["slug"],
      pagination: { pageSize: 12 },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items: any[] = Array.isArray(res?.data) ? res.data : [];
    const slugs: string[] = [];
    const skipped: Array<{ id: string | number | null; reason: string }> = [];

    for (const it of items) {
      if (!it) {
        skipped.push({ id: null, reason: "falsy item" });
        continue;
      }
      const slug = extractSlug(it);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const id = (it as any)?.id ?? null;
      if (!slug) {
        skipped.push({ id, reason: "missing slug" });
        continue;
      }
      slugs.push(slug);
    }

    if (skipped.length > 0) {
      console.warn("generateStaticParams: skipped items (no slug):", skipped);
    }

    return slugs.map((s) => ({ festival: s }));
  } catch (err) {
    console.error("generateStaticParams (festival):", err);
    return [];
  }
}

export default async function Page(props: {
  params: Promise<Params>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { festival } = await props.params;

  try {
    // const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/festivalis`;

    const urlParamsObject = {
      filters: { slug: festival },
      populate: {
        mainBanner: { populate: "*" },
        benefits: { populate: ["photo"] },
        gallery: { populate: "*" },
        time: { populate: "*" },
        price: { populate: "*" },
        seo: { populate: "*" },
      },
    };

    // const options: RequestInit = {
    //   headers: token ? { Authorization: `Bearer ${token}` } : {},
    // };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const responseData: any = await fetchAPI(path, urlParamsObject, { timeout: 15000, retries: 1 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const item: any = Array.isArray(responseData?.data) ? responseData.data[0] : null;

    if (!item) {
      return notFound();
    }

    return <FestivalClient data={item} />;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(`Failed to fetch festival by slug="${festival}":`, err);
    return notFound();
  }
}