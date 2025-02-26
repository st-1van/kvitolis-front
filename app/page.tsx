// import { Slider, Slider3} from "./_components/Slider";

import About from "./_components/About";
import News from "./_components/News";
import WeHave from "./_components/WeHave";

import Carousel from "./_components/Carousel";


export default function Home() {
  return (
  <main>
        <Carousel />
        <About />
        <WeHave />
    <News title='Що у нас відбувається' desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."/>


    
    {/* <Slider/> */}

  </main>
  );
}
