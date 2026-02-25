"use client";
import Image from "next/image";
import Link from "next/link"
import { MasonryBlock } from "./MasonaryBlock";
import AnimatedOnScroll from "../ui/AnimatedScroll";
import { getImageUrl } from "@/utils/api-helpers";
import { AlleyItemProps } from "@/app/garden/[alley]/SingleAlleyClient";



export type TreeProps = {
  name: string;
  desc: string;
  latin: string;
  price: string;
  img: {
    formats: {
      large: {
        url: string;
      };
    };
    url: string;
  };
};



export default function Trees({ alleyData }: { alleyData: AlleyItemProps[] }) {


  const formatedData = alleyData.map(({ alleyName, id, tree, slug, priority }: AlleyItemProps) => ({
    id,
    alleyName,
    tree,
    priority,
    slug,
  }));
  // console.log('Formated data for trees:', data);

  return (
    <section className="trees" id="alleys">
      <div className="container">
        <AnimatedOnScroll animationClass="fade-in-up">
          <div className="trees__headline">
              <h2>Наші алеї</h2>
              <p className="desc">
                Ми беремо дорослі саджанці, що мають 99% шанс приживання, і що за 3 роки дають достатньо тіні. Та кожен сад потребує догляду вмілих рук, і не рідко один садівник присв’ячує все своє життя одному саду. 
              </p>
          </div>
        </AnimatedOnScroll>
        <MasonryBlock data={formatedData} Card={TreeCard} />
        
      </div>
    </section>
  );
}

type TreeCardProps = Pick<AlleyItemProps, 'id' | 'alleyName' | 'tree' | 'priority' | 'slug'> & { index: number };

function TreeCard({ tree, slug, alleyName }: TreeCardProps) {
  const treeName = tree.name;
  const treeImg = getImageUrl(tree.img.url) ?? "/assets/banners/visual/default-tree.jpg";

  return (
    <AnimatedOnScroll animationClass="fade-in-up">
      <div className="tree">
        <div className="tree__img">
          <div className="tree__overlay">
            <p>{treeName}</p>
            <Link href={`/garden/${slug}`}>
              <button className="btn btn--medium btn--outlined">
                Детальніше
              </button>
            </Link>
          </div>
          {treeImg && <Image src={treeImg} alt={treeName} width={394} height={400} />}
        </div>
        <Link href={`/garden/${slug}`}>
          <div className="tree__text">
            <p className="tree__name">{alleyName}</p>
          </div>
        </Link>
      </div>
    </AnimatedOnScroll>
  );
}
