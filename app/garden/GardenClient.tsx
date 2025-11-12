'use client';
import HeadBanner from "../_components/HeadBanner";
import { banner, benefitsData, callToActionData, faqData, qouteData } from '../_components/data/Garden';
import Benefits from "../_components/garden/Benefits";
import CallToAction from "../_components/garden/CallToAction";
import FAQ from "../_components/garden/FAQ";
import Trees from "../_components/garden/Tress";
import SeoQoute from "../_components/SeoQoute"
import Mission from "../_components/garden/Mission";
import MissionData from "../_components/data/MissionData";
import PulseMap from "../_components/PulseMap";
import Visualisation from "../_components/garden/alley/Visualisation";
import { AlleyItemProps } from "./[alley]/SingleAlleyClient";

type GardenClientProps = {
  alleyData: AlleyItemProps[];
};


export default function GardenClient({alleyData}: GardenClientProps) {

  return (
    <main>
        <section className="mainBanner container animate fade-in-up">
          <HeadBanner
                  id={banner.title} 
                  title={banner.title} 
                  desc={banner.desc} 
                  src={banner.src}
                  btn={banner.btn}
                  gradient={banner.gradient}
                  color='green'
                  photo={banner.photo}
          />
        </section>
        <SeoQoute {...qouteData[1]}/>
        <Visualisation videoId="EM3RXfKOSoY" title="Місія, цілі та цінності"/>
        <Mission title='' data={MissionData} />
        <PulseMap title='Алеї українства' desc='12 алей'/>
        <Trees alleyData={alleyData} />
        <Benefits {...benefitsData} />
        <CallToAction {...callToActionData} />
        <SeoQoute {...qouteData[0]}/>
        <FAQ {...faqData} />
    </main>
  );
}