'use client'
import BannerSlider from '@/app/_components/garden/alley/BannerSlider';
import {  callToActionData, faqData } from '../../_components/data/Garden'
import { AlleysData } from '../../_components/data/AlleysData'
import CallToAction from "../../_components/garden/CallToAction";
import FAQ from "../../_components/garden/FAQ";
import { useParams } from "next/navigation";
import FamousPeople from '@/app/_components/garden/alley/FamousPeople';
import TreeDescription from '@/app/_components/garden/alley/TreeDescription';



export default function SingleAlley() {

  const { alley } = useParams();
  const alleyData = AlleysData.find((item) => item.slug === `/garden/${alley}`);
  

  if (!alleyData) {
    return <p>Сторінка не знайдена</p>;
  }

  const transformedData = {
    id: alleyData.id,
    title: alleyData.title,
    desc: alleyData.desc,
    gradient: alleyData.gradient,
    tree: alleyData.tree.name,
    src: alleyData.tree.srcBanner,
    slug: alleyData.slug,
    button1: "Посадити дерево",
  };

  const transformedData2 = {
    name:alleyData.tree.name,
    desc:alleyData.tree.desc,
    src: alleyData.tree.src,
    button1: "Посадити дерево",
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

