"use client";
import Image from "next/image";
import Link from "next/link"
import { MasonryBlock } from "./MasonaryBlock";

type AlleyItemProps = {
  id:string;
  title: string;
  tree: string;
  treeImg: string;
  slug?: string;
};

type TreesDataProps = {
  treesData: AlleyItemProps[];
};

export default function Trees({ treesData }: TreesDataProps) {

  return (
    <section className="trees">
      <div className="container">
        <div className="trees__headline">
            <h2>Наші дерева</h2>
            <p className="desc">
              Ми беремо дорослі саджанці, що мають 99% шанс приживання і що за 3 роки дають достатньо тіні. Ми професійно доглядаємо за деревами, щоб наші діти могли творити під ним.
            </p>
        </div>
        <MasonryBlock data={treesData} Card={TreeCard} />
      </div>
    </section>
  );
}

function TreeCard({ title, tree, treeImg, slug }: AlleyItemProps) {
  return (
    <div className="tree">
      <div className="tree__img">
        {treeImg && <Image  src={treeImg} alt={title} width={394} height={400} />}
      </div>
      <div className="tree__text">
        <p className="tree__name">{tree}</p>
        <p>{title}</p>
      </div>
      <Link href={`/garden/${slug}`} >
          <button className="btn btn--medium btn--green">
            Посадити дерево
          </button>
      </Link>
    </div>
  );
}
