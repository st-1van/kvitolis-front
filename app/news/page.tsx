import React from "react";
import { Metadata } from 'next';
import { fetchAPI } from "../../lib/strapi";
import NewsClient from "./NewsClient";
import { notFound } from "next/navigation";

export const revalidate = 60;

export function generateMetadata(): Metadata {

    const metadata: Metadata = {
      title: "Новини Квітолісу",
      description:'Дізнайтеся останні новини, події та оновлення зі світу Квітолісу. Будьте в курсі всіх захоплюючих подій.',
      keywords:['новини', 'оновлення', 'події', 'Квітоліс', 'садівництво'],
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/news`,
      },
    };
    return metadata;

}

export default async function Page() {

  try {

    const path = "/news-col";
    const urlParamsObject = {
      populate:'*',
      pagination: {
        pageSize: 20,
      },
      sort: ["date:desc"],
    };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const responseData: any = await fetchAPI(
      path,
      urlParamsObject,
      { timeout: 15000, retries: 1 }
    );

    if (!responseData.data) return notFound();

    
    return <NewsClient
      title="Новини Квітолісу"
      desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items={responseData.data as any[]}
    />;

    } catch (err) {
      console.error(`Failed to fetch news:`, err);
      return notFound();
    }
}