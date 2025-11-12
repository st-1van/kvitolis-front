'use client';
import About from "./_components/About";
import WeHave from "./_components/WeHave";
import Carousel, { SlideProps } from "./_components/Carousel";
import InterMap3 from "./_components/InterMap3";
import { NewsItemProps, NewsOnMainPage } from "./_components/News";
import { mapNews } from "./news/NewsClient";
import { useMemo } from "react";
import { FestivalProps } from "./festivals/[festival]/FestivalClient";


type Props = {
  carouselData: SlideProps[];
  newsData?: NewsItemProps[];
  festivalData?: FestivalProps[];
};

export default function HomeClient({
  carouselData,
  newsData = [],
  festivalData = [],
}: Props) {
    
  const mapped = useMemo(
    () => (Array.isArray(newsData) ? newsData.map(mapNews) : []),
    [newsData]
  );


  return (
    <main>
      <Carousel CarouselData={carouselData}/>
      <About />
      <InterMap3 />
      <WeHave festivalData={festivalData} />
      <NewsOnMainPage 
        title='Наші новини' 
        desc="Дізнайтеся останні новини та події у нашому парку Квітоліс."
        items={mapped}
      />
    </main>
  );
}