import React from "react";
import { fetchAPI } from "../../lib/strapi";
import { notFound } from "next/navigation";
import EventsClient, { EventsProps } from "./EventsClient";
import { Metadata } from "next";

export const revalidate = 60;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StrapiSingle<T> = { data: T | null; meta?: any };

export async function generateMetadata({}): Promise<Metadata> {

  try {
    const path = `/organizuvati-podiyu`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await fetchAPI(path, {
      populate: {
        seo: { populate: "*" },
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
      metaImage?.url ??
      metaImage?.data?.attributes?.url ??
      item?.img?.url ??
      item?.img?.data?.attributes?.url ??
      undefined;

    const canonical = seo?.canonicalUrl ?? `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/events`;

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

export default async function Page() {
  try {
    const path = `/organizuvati-podiyu`;
    const urlParamsObject = {
      populate: {
        mainBanner: { populate: "*" },
        benefits: { populate: ["photo"] },
        gallery: { populate: "*" },
        seo: { populate: "*" },
      },
    };

    const response = await fetchAPI<StrapiSingle<EventsProps>>(
      path,
      urlParamsObject,
      { timeout: 15000, retries: 1 }
    );

    if (!response?.data) {
      return notFound();
    }

    return <EventsClient {...response.data} />;
  } catch (err) {
    console.error(`Failed to fetch event page data:`, err);
    return notFound();
  }
}