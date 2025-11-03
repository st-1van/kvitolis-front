'use client';
import About from "./_components/About";
import WeHave from "./_components/WeHave";
import Carousel, { SlideProps } from "./_components/Carousel";
import InterMap3 from "./_components/InterMap3";
import { useCallback, useEffect, useState } from "react";
import { fetchAPI } from "../utils/fetch-api";
import { CircularProgress } from "@mui/material";


export default function Home() {
    const [data, setData] = useState<{ carousel?: SlideProps[] } | null>(null);
    const [isLoading, setLoading] = useState(true);
  
    const fetchData = useCallback(async () => {
      setLoading(true); 
      try {
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        const path = `/golovna`;
        //замінити параметр порядку
  
        const urlParamsObject = {
          populate: {
            carousel: {
              populate: ['photo', 'btn']
            },
          }
        };
        const options = { headers: { Authorization: `Bearer ${token}` } };
        const responseData = await fetchAPI( path, urlParamsObject, options );
  
        setData(responseData.data);
        console.log('Successfully fetched alley data:');
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, []);
  
    useEffect(() => {
      fetchData();
    }, [fetchData]);
  
    if (isLoading) {
      return <main><CircularProgress className="loader"/></main>
    }
    

  return (
  <main>
        <Carousel CarouselData={data?.carousel ?? []}/>
        <About />
        <InterMap3 />
        <WeHave />
        {/* <News title='Що у нас відбувається' desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."/> */}
  </main>
  );
}
