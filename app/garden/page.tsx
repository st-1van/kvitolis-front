import HeadBanner from "../_components/HeadBanner";
import { banner, benefitsData, callToActionData, faqData } from '../_components/data/Garden';
import { AlleyData } from '../_components/data/AlleyData';
// import Alleys from "../_components/garden/Alleys";
import Benefits from "../_components/garden/Benefits";
import CallToAction from "../_components/garden/CallToAction";
import FAQ from "../_components/garden/FAQ";
import Trees from "../_components/garden/Tress";
import SeoQoute from "../_components/SeoQoute"
import Mission from "../_components/garden/Mission";
import MissionData from "../_components/data/MissionData";
import PulseMap from "../_components/PulseMap";
// import SimpleQoute from "../_components/SimpleQoute";
import Visualisation from "../_components/garden/alley/Visualisation";

const transformedData = AlleyData.map(({ id, tree, title, alleyImg, slug }) => ({
  id:id,
  title: title,
  tree: tree.name,
  alleyImg,
  treeImg:tree.img,
  slug,
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

        {/* <SimpleQoute /> */}
        <PulseMap title='Алеї українства' desc='12 алей'/>
        {/* <Alleys alleysData={transformedData}/> */}
        <Trees treesData={transformedData}/>
        <Visualisation videoId="FTkth_YF6OM" title="Таким ми бачимо наш Сад"/>
        <Benefits {...benefitsData} />
        <CallToAction {...callToActionData} />
        <SeoQoute />
        <FAQ {...faqData} />
    </main>
  );
} 