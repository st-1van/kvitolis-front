"use client";
import React from "react";
import BannerSlider from '@/app/_components/garden/alley/BannerSlider';
import CallToAction from "../../_components/garden/CallToAction";
import FAQ from "../../_components/garden/FAQ";
import TreeDescription from '@/app/_components/garden/alley/TreeDescription';
import Persons, { PersonsDataProps } from '@/app/_components/garden/alley/Persons';
import { callToActionData, faqData } from '../../_components/data/Garden';
// import { CircularProgress } from "@mui/material";
import { getImageUrl } from "@/utils/api-helpers";

export type AlleyItemProps = {
  id: string;
  alleyName: string;
  desc: string | null;
  slug: string;
  priority: string;
  alleyImg: string | null;
  tree: {
    name: string;
    desc: string;
    img: {
      url: string ;
    };
    price: string;
    latin: string;
  };
  famousPeople?: PersonsDataProps[];
};

export default function SingleAlleyClient({ data, slug }: { data: AlleyItemProps[]; slug: string }) {
  if (!data || !data.length) {
    return <main><div>Not found</div></main>;
  }

  const d = data[0];

  const bannerData = {
    id: d.id,
    title: d.alleyName,
    desc: d.desc ?? '',
    gradient: 'light',
    src: d.alleyImg ?? "/assets/banners/visual/Клумба-Люпин-01.jpg",
    slug: `/garden/${slug}#about-alley`,
    button1: "Детальніше",
  };

  const treeData = {
    name: d.tree.name,
    desc: d.tree.desc,
    src: getImageUrl(d.tree.img.url) ?? "/assets/banners/visual/default-tree.jpg",
    price: d.tree.price,
    latin: d.tree.latin,
  };


  const personsData: PersonsDataProps[] =
    d.famousPeople?.map(person => {
      const rawPhoto = person.photo as unknown;
      let photo: string | null = null;
      if (rawPhoto === null) {
        photo = null;
      } else if (typeof rawPhoto === 'string') {
        photo = rawPhoto;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } else if (typeof rawPhoto === 'object' && rawPhoto !== null && 'url' in rawPhoto && typeof (rawPhoto as any).url === 'string') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
        photo = getImageUrl((rawPhoto as any).url);
      } else {
        photo = null;
      }
      return {
        ...person,
        desc: person.desc === null ? null : person.desc,
        photo,
      };
    }) ?? [];

  // Немає завантаження — дані вже готові, тому можна миттєво рендерити
  return (
    <main>
      <BannerSlider {...bannerData} />
      <CallToAction {...callToActionData} slug={`/garden/plant-tree?alleyName=${encodeURIComponent(bannerData.title)}`} />
      {treeData && <TreeDescription {...treeData} />}
      <Persons personsData={personsData} alleyName={bannerData.title} />
      <FAQ {...faqData} />
    </main>
  );
}