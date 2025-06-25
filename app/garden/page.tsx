import HeadBanner from "../_components/HeadBanner";
import { banner, benefitsData, callToActionData, faqData } from '../_components/data/Garden';
import Benefits from "../_components/garden/Benefits";
import CallToAction from "../_components/garden/CallToAction";
import FAQ from "../_components/garden/FAQ";
import Trees from "../_components/garden/Tress";
import SeoQoute from "../_components/SeoQoute"
import Mission from "../_components/garden/Mission";
import MissionData from "../_components/data/MissionData";
import PulseMap from "../_components/PulseMap";
import Visualisation from "../_components/garden/alley/Visualisation";
import actualData from "../_components/data/alleyData/actualData";

const alleyData = actualData;

const transformedData = alleyData.map(({ id, tree, title, slug, priority }) => ({
  id:id,
  title: title,
  tree: tree.name,
  treeImg:tree.img,
  slug,
  priority
}));

export default function Garden() {
  return (
    <main>
        <section className="mainBanner container animate fade-in-up">
          <HeadBanner
                  key={banner.title} 
                  title={banner.title} 
                  desc={banner.desc} 
                  src={banner.src}
                  slug={banner.slug}
                  slug2={banner.slug2}
                  button1={banner.button1}
                  button2={banner.button2}
                  gradient={banner.gradient}
          />
        </section>
        <Mission title='Місія, цілі та цінності' data={MissionData} />
        <PulseMap title='Алеї українства' desc='12 алей'/>
        <Trees treesData={transformedData}/>
        <Visualisation videoId="6HhLWZ-VV3w" title="Таким ми бачимо наш Сад"/>
        <Benefits {...benefitsData} />
        <CallToAction {...callToActionData} />
        <SeoQoute />
        <FAQ {...faqData} />
    </main>
  );
} 