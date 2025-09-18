"use client";
import Image from "next/image";
import Link from "next/link"
import { MasonryBlock } from "./MasonaryBlock";
import AnimatedOnScroll from "../ui/AnimatedScroll";

type AlleyItemProps = {
  id: string;
  title: string;
  tree: string;
  treeImg: string;
  slug?: string;
  priority: string;
};

type TreesDataProps = {
  treesData: AlleyItemProps[];
};

export default function Trees({ treesData }: TreesDataProps) {

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
        <MasonryBlock data={treesData} Card={TreeCard} />
      </div>
    </section>
  );
}

function TreeCard({ title, tree, treeImg, slug }: AlleyItemProps) {
  return (
    <AnimatedOnScroll animationClass="fade-in-up">
      <div className="tree">
        <div className="tree__img">
          <div className="tree__overlay">
            <p>{tree}</p>
            <Link href={`/garden/${slug}`}>
              <button className="btn btn--medium btn--outlined">
                Детальніше
              </button>
            </Link>
          </div>
          {treeImg && <Image src={treeImg} alt={title} width={394} height={400} />}
        </div>
        <Link href={`/garden/${slug}`}>
          <div className="tree__text">
            <p className="tree__name">{title}</p>
          </div>
        </Link>
      </div>
    </AnimatedOnScroll>
  );
}
