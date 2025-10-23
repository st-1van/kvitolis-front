'use client'
import { useState, useEffect, useCallback } from "react";
import BannerSlider from '@/app/_components/garden/alley/BannerSlider';
import { callToActionData, faqData } from '../../_components/data/Garden'
import CallToAction from "../../_components/garden/CallToAction";
import FAQ from "../../_components/garden/FAQ";
import { useParams } from "next/navigation";
import TreeDescription from '@/app/_components/garden/alley/TreeDescription';
import Persons, { PersonsDataProps } from '@/app/_components/garden/alley/Persons';
import { fetchAPI } from "../../../utils/fetch-api";
import { TreeProps } from "@/app/_components/garden/Tress";
import { CircularProgress } from "@mui/material";
import { getImageUrl} from "@/utils/api-helpers";


export type AlleyItemProps = {
  id: string;
  alleyName: string;
  desc?: string;
  slug?: string;
  priority: string;
  alleyImg?: string;
  tree: TreeProps;
  famousPeople: PersonsDataProps[];
};




export default function SingleAlley() {

  const { alley } = useParams();

  const [data, setData] = useState<AlleyItemProps[]>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/alleys-col`;
      //замінити параметр порядку

      const urlParamsObject = {
        filters: { slug: alley },
        populate: {
          tree: {
            populate: ['img']
          },
          famousPeople: { populate: ['photo'] }
        }
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);

      setData(responseData.data);
      console.log('Succesfully Fetched alley data:');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return <main><CircularProgress className="loader"/></main>
  }

  const bannerData = {
    id: data[0].id,
    title: data[0].alleyName,
    desc: data[0].desc ?? '',
    gradient: 'light',
    src: data[0].alleyImg ??"/assets/banners/visual/Клумба-Люпин-01.jpg",
    slug: `/garden/${alley}#about-alley`,
    button1: "Детальніше",
  };

  const dynamicSlug = `/garden/plant-tree${alley ? `?alleyName=${bannerData.title}` : ''}`;

  const treeData = {
    name:data[0].tree.name,
    desc:data[0].tree.desc,
    src: getImageUrl(data[0].tree.img.url),
    price: data[0].tree.price,
    latin:data[0].tree.latin,
  }

  const personsData: PersonsDataProps[] =
    data[0]?.famousPeople.map(person => ({
      ...person,
      desc: person.desc === null ? null : person.desc,
      photo:
        person.photo === null
          ? null
          : typeof person.photo === 'string'
          ? person.photo
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          : getImageUrl((person.photo as any).url),
    })) ?? [];

  return (
          <main>
                <BannerSlider  {...bannerData} />
                <CallToAction {...callToActionData} slug={dynamicSlug} />
                <TreeDescription {...treeData} />
                <Persons personsData={personsData} alleyName={bannerData.title} />
                <FAQ {...faqData} />
          </main>
  );
}