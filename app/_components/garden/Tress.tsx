"use client";
import Image from "next/image";
import Link from "next/link"
import { MasonryBlock } from "./MasonaryBlock";
import AnimatedOnScroll from "../ui/AnimatedScroll";

import { fetchAPI } from "../../../utils/fetch-api";
import { useState, useEffect, useCallback } from "react";

import { CircularProgress } from "@mui/material";

type AlleyItemProps = {
  id: string;
  title: string;
  treeName: string;
  treeImg: string;
  slug?: string;
  priority: string;
};

type Tree = {
  id: string;
  name: string;
  tree: TreeProps;
  slug: string;
};

type TreeProps = {
  name: string;
  img: {
    formats: {
      large: {
        url: string;
      };
    };
  };
};


export default function Trees() {

  // const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState<Tree[]>([]);
  const [isLoading, setLoading] = useState(true);


  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/alleys-col`;
      //замінити параметр порядку
      const urlParamsObject = {
        sort: { id: "desc" },
        populate: {
          tree: {
            populate: ['img']
          },
        }
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);

      setData(responseData.data);
      // setMeta(responseData.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatedData = data.map(({ id, name, tree, slug, priority }:Tree) => ({
    id,
    name,
    treeImg: tree.img.formats.large.url,
    treeName: tree.name,
    slug,
    priority
  }));

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
        {isLoading?<CircularProgress/>:<MasonryBlock data={formatedData} Card={TreeCard} />}
        
      </div>
    </section>
  );
}

function TreeCard({ treeName, treeImg, slug, title }: AlleyItemProps) {

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
