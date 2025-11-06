"use client";
import Image from "next/image";
import Link from "next/link"
import { MasonryBlock } from "./MasonaryBlock";
import AnimatedOnScroll from "../ui/AnimatedScroll";

import { fetchAPI } from "../../../utils/fetch-api";
import { useState, useEffect, useCallback } from "react";

import { CircularProgress } from "@mui/material";
import { getImageUrl } from "@/utils/api-helpers";
import { AlleyItemProps } from "@/app/garden/[alley]/page";



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


export default function Trees() {

  // const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState<AlleyItemProps[]>([]);
  const [isLoading, setLoading] = useState(true);


  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/alleys-col`;
      //замінити параметр порядку
      const urlParamsObject = {
        sort: { priority: "desc" },
        populate: {
          tree: {
            populate: ['img']
          },
        }
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);

      setData(responseData.data);
      console.log('Fetched alley data:', responseData.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const formatedData = data.map(({ alleyName, id, tree, slug, priority }: AlleyItemProps) => ({
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
        {isLoading?<CircularProgress/>:<MasonryBlock data={formatedData} Card={TreeCard} />}
        
      </div>
    </section>
  );
}

type TreeCardProps = Pick<AlleyItemProps, 'id' | 'alleyName' | 'tree' | 'priority' | 'slug'> & { index: number };

function TreeCard({ tree, slug, alleyName }: TreeCardProps) {
  const treeName = tree.name;
  const treeImg = tree.img?.url;

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
          {treeImg && <Image src={getImageUrl(treeImg)} alt={treeName} width={394} height={400} />}
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
