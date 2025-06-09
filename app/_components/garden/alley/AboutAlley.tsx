'use client'
import { useState, useEffect, useCallback } from "react";

import { TreeVertical } from '@/app/_components/garden/alley/TreeDescription';
import Persons from '@/app/_components/garden/alley/Persons';
import type { TreeDescProps } from '@/app/_components/garden/alley/TreeDescription';
import type { PersonsProps } from '@/app/_components/garden/alley/Persons';
import AnimatedOnScroll from '../../ui/AnimatedScroll';

import { fetchAPI } from "../../../../utils/fetch-api";

type AboutAlleyProps = {
    treeData: TreeDescProps;
    personsData: PersonsProps['famousPeople'];
    alleyName:string;
    alleySlug:string;
  };

export default function AboutAlley ({ treeData, personsData, alleyName, alleySlug}: AboutAlleyProps){
  

    const [meta, setMeta] = useState<Meta | undefined>();
    const [data, setData] = useState<any>([]);
    const [isLoading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
      setLoading(true);
      try {
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        const path = `/alleys-col/`;
        const urlParamsObject = {
          filters: {
            slug: {
              $eq: alleySlug,
            },
          },
          populate: {
            tree: {
              populate: ['img']
            },
            famousPeople: {
              populate:['photo']
            },
          },
        };
        const options = { headers: { Authorization: `Bearer ${token}` } };
        const responseData = await fetchAPI(path, urlParamsObject, options);

        setData(responseData.data);
        setMeta(responseData.meta);
        
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, []);

    useEffect(() => {
      fetchData();
    }, [fetchData]);

    if(isLoading) return 'loading'; 


    const formatedTreeData = {
      name: data[0].tree.name,
      desc: data[0].tree.desc,
      src: data[0].tree.img.formats.large.url,
      button1: "Посадити дерево",
      slug: '/garden/plant-tree',
    }

    

    
    return(
        <section className='aboutAlley'>
          <div className="container">
            <AnimatedOnScroll animationClass="fade-sides">
              <div className="row" 
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '1rem'}}>
                <TreeVertical {...formatedTreeData} />
                <Persons famousPeople={data[0].famousPeople} alleyName={alleyName}/>
              </div>
            </AnimatedOnScroll>
           </div>
      </section>
    )
}