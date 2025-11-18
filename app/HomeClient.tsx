'use client';
import About from "./_components/About";
import WeHave from "./_components/WeHave";
import Carousel, { SlideProps } from "./_components/Carousel";
import InterMap3 from "./_components/InterMap3";
import { NewsItemProps, NewsOnMainPage } from "./_components/News";
import { mapNews } from "./news/NewsClient";
import { useMemo } from "react";
import { FestivalProps } from "./festivals/[festival]/FestivalClient";
import { CardProps } from "./_components/CardItem";


type Props = {
  carouselData: SlideProps[];
  newsData?: NewsItemProps[];
  festivalData?: FestivalProps[];
  cardsData: CardProps[];
  aboutData: string;
};

export default function HomeClient({
  carouselData,
  newsData = [],
  festivalData = [],
  cardsData = [],
  aboutData,
}: Props) {
    
  const mapped = useMemo(
    () => (Array.isArray(newsData) ? newsData.map(mapNews) : []),
    [newsData]
  );


  return (
    <main>
      <Carousel CarouselData={carouselData}/>
      <About text={aboutData} />
      <WeHave 
        festivalData={festivalData}
        cardsData={cardsData}
      />
      <NewsOnMainPage 
        title='Наші новини' 
        desc="Дізнайтеся останні новини та події у нашому парку Квітоліс."
        items={mapped}
      />
      <InterMap3 />
    </main>
  );
}