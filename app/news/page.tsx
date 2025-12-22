import React from "react";
import { Metadata } from 'next';
import { fetchAPI } from "../../lib/strapi";
import NewsClient from "./NewsClient";
import { notFound } from "next/navigation";

export const revalidate = 60;
const path = "/news-col";
const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
const options = {
  headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  timeout: 15000, 
  retries: 1 
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StrapiRes = any;

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
    const urlParamsObject = {
      populate:'*',
      pagination: {
        pageSize: 20,
      },
      sort: ["date:desc"],
    };


    const responseData: StrapiRes = await fetchAPI( path, urlParamsObject, options);

    if (!responseData.data) return notFound();

    
    return <NewsClient
      title="Новини Квітолісу"
      desc="Дізнайтеся останні новини, події та оновлення зі світу Квітолісу. Будьте в курсі всіх захоплюючих подій."
      items={responseData.data}
    />;

    } catch (err) {
      console.error(`Failed to fetch news:`, err);
      return notFound();
    }
}