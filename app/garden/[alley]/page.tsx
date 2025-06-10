'use client'
import BannerSlider from '@/app/_components/garden/alley/BannerSlider';
import {  callToActionData, faqData } from '../../_components/data/Garden'
import { AlleyData } from '../../_components/data/AlleyData'
import CallToAction from "../../_components/garden/CallToAction";
import FAQ from "../../_components/garden/FAQ";
import { useParams } from "next/navigation";
import AboutAlley from '@/app/_components/garden/alley/AboutAlley';

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
    src:"/assets/banners/alleyBanner.png",
    slug: '/garden/plant-tree',
    button1: "Посадити дерево",
  };

  const transformedData2 = {
    name:alleyData.tree.name,
    desc:alleyData.tree.desc,
    src: alleyData.tree.img,
    button1: "Посадити дерево",
    slug: '/garden/plant-tree',
  }


  return (
  <main>
              <BannerSlider  {...transformedData} />
              <AboutAlley 
                treeData={transformedData2} 
                // personsData={alleyData.famousPeople} 
                alleyName={alleyData.title} 
                alleySlug={String(alley)}
              />
              <CallToAction {...callToActionData} />
              <FAQ {...faqData} />

  </main>
  );
}
