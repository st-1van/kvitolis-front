import About from "./_components/About";
// import News from "./_components/News";
import WeHave from "./_components/WeHave";
import Carousel from "./_components/Carousel";
import InterMap3 from "./_components/InterMap3";
import { CarouselData } from './_components/data/Carousel';


export default function Home() {
  return (
  <main>
        <Carousel CarouselData={CarouselData}/>
        <About />
        <InterMap3 />
        <WeHave />
        {/* <News title='Що у нас відбувається' desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."/> */}
  </main>
  );
}
