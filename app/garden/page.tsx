
import HeadBanner from "../_components/HeadBanner";
import { banner, numbersData, benefitsData, callToActionData, faqData } from '../_components/data/Garden';
import { AlleyData } from '../_components/data/AlleyData';
import Alleys from "../_components/garden/Alleys";
import Benefits from "../_components/garden/Benefits";
import CallToAction from "../_components/garden/CallToAction";
import FAQ from "../_components/garden/FAQ";
import NumbersBlock from "../_components/garden/NumbersBlock";
import Trees from "../_components/garden/Tress";
import SeoQoute from "../_components/SeoQoute"

const transformedData = AlleyData.map(({ id, tree, title, alleyImg, slug }) => ({
  id:id,
  title: title,
  tree: tree.name,
  alleyImg,
  treeImg:tree.treeImg,
  slug,
}));

export default function Garden() {
  return (
    <main>
      <section className="container">
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
        <NumbersBlock {...numbersData}/>
        <Alleys alleysData={transformedData}/>
        {/* <InterMap /> */}
        <SeoQoute />
        <Trees treesData={transformedData}/>
        <Benefits {...benefitsData} />
        <CallToAction {...callToActionData} />
        <FAQ {...faqData} />
    </main>
  );
} 