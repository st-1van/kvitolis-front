import { fetchAPI } from '@/utils/fetch-api'
import type { MetadataRoute } from 'next'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StrapiRes = any;


const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
const options = {
  headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  timeout: 15000, 
  retries: 1 
};

async function genereteDynamicPages(){

  try {
    const festivals:StrapiRes = await fetchAPI('/festivalis', {
      pagination: { pageSize: 15 },
      options
    })
   

    const alleys:StrapiRes = await fetchAPI('/alleys-col', {
      pagination: { pageSize: 12 },
    })

    const news:StrapiRes = await fetchAPI('/news-col', {
      pagination: { pageSize: 20 },
      options
    })

    const dynamicPages = [
      ...(Array.isArray(festivals?.data) ? festivals.data : []).map((item: { slug: string }) => ({
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/festivals/${item.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })),
      ...(Array.isArray(alleys?.data) ? alleys.data : []).map((item: { slug: string }) => ({
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/garden/alleys/${item.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })),
      ...(Array.isArray(news?.data) ? news.data : []).map((item: { documentId: string }) => ({
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/news/${item.documentId}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })),
    ];

    return dynamicPages;
    
  } catch (error) {
    console.log('Error fetching dynamic pages for sitemap:', error);
    return [];
  }
}

const staticPages = [
  {
      url: 'https://kvitolis.com.ua',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://kvitolis.com.ua/events',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://kvitolis.com.ua/garden',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://kvitolis.com.ua/garden/plant-tree',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://kvitolis.com.ua/contacts',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
]

 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return [
      ...staticPages,
      ...await genereteDynamicPages(),
    ]
  }

console.log('sitemap.tsx loaded');