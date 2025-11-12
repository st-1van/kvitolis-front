import HomeClient from "./HomeClient";
import { fetchAPI } from "../lib/strapi";
import { notFound } from "next/navigation";


export default async function Home() {
  try {
    
    const path = `/golovna`;
    const urlParamsObject = {
      populate: {
        carousel: {
          populate: ['photo', 'btn']
        },
      }
    };

    const newsPath = "/news-col";
    const newsUrlParamsObject = {
      populate:'*',
      pagination: {
        pageSize: 9,
      },
      sort: ["publishedAt:desc"],
    };

    const festivalPath = "/festivalis";
    const festivalUrlParamsObject = {
      populate: { mainBanner: { populate: '*'}},
      pagination: {
        pageSize: 4,
      },
      sort: ["publishedAt:desc"],
    };


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const carouselData: any = await fetchAPI( path, urlParamsObject, { timeout: 15000, retries: 1 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newsData: any = await fetchAPI( newsPath, newsUrlParamsObject, { timeout: 15000, retries: 1 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const festivalData: any = await fetchAPI( festivalPath, festivalUrlParamsObject, { timeout: 15000, retries: 1 });

    if (!carouselData && !newsData && !festivalData) {
      return notFound();
    }
    
    const carousel = carouselData.data.carousel || [];
    const newsItems = newsData.data || [];
    const festivalItems = festivalData.data || [];

    return <HomeClient 
              carouselData={carousel} 
              newsData={newsItems}
              festivalData={festivalItems}
            />;

  } catch (err) {
    console.error(`Failed to fetch data:`, err);
    return notFound();
  }
}

