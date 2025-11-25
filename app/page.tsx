import HomeClient from "./HomeClient";
import { fetchAPI } from "../lib/strapi";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({}): Promise<Metadata> {

  try {
    const path = `/golovna`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await fetchAPI(path, {
      populate: {
        seo: { populate: "*" }
      },
      pagination: { pageSize: 1 },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const item: any = Array.isArray(res?.data) ? res.data[0] : res?.data ?? null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const seo: any = item?.seo ?? {};

    const title = seo?.metaTitle ?? item?.title ?? "Квітоліс";
    const description = seo?.metaDescription ?? item?.description ?? item?.desc ?? "Простір для сімейного відпочинку, активного дозвілля, фотосесій та гастрономічного релаксу.";
    const keywords = seo?.keywords ?? undefined;

    // підтримка різних структур для зображення SEO або поля img
    const metaImage = seo?.metaImage ?? seo?.meta_image ?? null;

    const imageUrl: string | undefined =
      metaImage?.url ??
      metaImage?.data?.attributes?.url ??
      item?.img?.url ??
      item?.img?.data?.attributes?.url ??
      undefined;

    const canonical = seo?.canonicalUrl ?? `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}`;

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


export default async function Home() {
  try {
    
    const path = `/golovna`;
    const urlParamsObject = {
      populate: {
        carousel: {
          populate: ['photo', 'btn']
        },
        about: {},  
        card:{
          populate: '*'
        },
        seo: { populate: "*" },
      }
    };

    const newsPath = "/news-col";
    const newsUrlParamsObject = {
      populate:'*',
      pagination: {
        pageSize: 9,
      },
      sort: ["date:desc"],
    };

    const festivalPath = "/festivalis";
    const festivalUrlParamsObject = {
      populate: { mainBanner: { populate: '*'}},
      pagination: {
        pageSize: 4,
      },
      sort: ["priority:asc"],
    };


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mainData: any = await fetchAPI( path, urlParamsObject, { timeout: 15000, retries: 1 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newsData: any = await fetchAPI( newsPath, newsUrlParamsObject, { timeout: 15000, retries: 1 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const festivalData: any = await fetchAPI( festivalPath, festivalUrlParamsObject, { timeout: 15000, retries: 1 });

    if (!mainData && !newsData && !festivalData) {
      return notFound();
    }
    
    const carousel = mainData.data.carousel || [];
    const cards = mainData.data.card || [];
    const about = mainData.data.about || '';
    const newsItems = newsData.data || [];
    const festivalItems = festivalData.data || [];

    return <HomeClient 
              carouselData={carousel} 
              cardsData={cards}
              aboutData={about}
              newsData={newsItems}
              festivalData={festivalItems}
            />;

  } catch (err) {
    console.error(`Failed to fetch data:`, err);
    return notFound();
  }
}

