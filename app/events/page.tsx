import React from "react";
import { fetchAPI } from "../../lib/strapi";
import { notFound } from "next/navigation";
import EventsClient, { EventsProps } from "./EventsClient";

export const revalidate = 60;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StrapiSingle<T> = { data: T | null; meta?: any };

export default async function Page() {
  try {
    const path = `/organizuvati-podiyu`;
    const urlParamsObject = {
      populate: {
        mainBanner: { populate: "*" },
        benefits: { populate: ["photo"] },
        gallery: { populate: "*" },
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