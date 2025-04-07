'use client'
import BannerSlider from '@/app/_components/garden/alley/BannerSlider';
import {  callToActionData, faqData } from '../../_components/data/Garden'
import { AlleyData } from '../../_components/data/AlleyData'
import CallToAction from "../../_components/garden/CallToAction";
import FAQ from "../../_components/garden/FAQ";
import { useParams } from "next/navigation";
import FamousPeople from '@/app/_components/garden/alley/FamousPeople';
import TreeDescription from '@/app/_components/garden/alley/TreeDescription';



export default function SingleAlley() {

  const { alley } = useParams();
  const alleyData = AlleyData.find((item) => item.slug === alley);


  if (!alleyData) {

    return  <main><p>Сторінка не знайдена</p>;</main>
  }

  const transformedData = {
    id: alleyData.id,
    title: alleyData.title,
    desc: alleyData.desc,
    gradient: 'light',
    tree: alleyData.tree.name,
    src: alleyData.tree.srcBanner,
    slug: '/garden/plant-tree',
    button1: "Посадити дерево",
  };

  const transformedData2 = {
    name:alleyData.tree.name,
    desc:alleyData.tree.desc,
    src: alleyData.tree.treeImg,
    button1: "Посадити дерево",
    slug: '/garden/plant-tree',
  }


  return (
  <main>
              <BannerSlider  {...transformedData} />
              <TreeDescription {...transformedData2} />
              <FamousPeople famousPeople={alleyData.famousPeople} />
              <CallToAction {...callToActionData} />
              <FAQ {...faqData} />

  </main>
  );
}

