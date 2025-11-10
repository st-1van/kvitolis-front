'use client'
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

import HeadBanner from "../_components/HeadBanner"
import { FoodAndFun } from "../_components/WeHave"
import AnimatedOnScroll from "../_components/ui/AnimatedScroll"
import { EventsCallToAction } from '../_components/data/Events'
import StandartGallery, { ImageItemProps } from "../_components/StandartGallery"
import CallToAction from "../_components/garden/CallToAction"
import { SlideProps } from "../_components/Carousel"



export type EventsProps ={
  id:string;
  slug:string;
  aboutTitle?:string;
  aboutDesc?:string;
  mainBanner: SlideProps;
  benefits: {
    id:string;
    title:string;
    desc?:string;
    photo:{
      url:string;
    };
  }[]
  gallery: ImageItemProps[];
}

 
export default function EventsClient(data: EventsProps) {

    
  return <main>
        <section className="mainBanner container animate fade-in-up">
          <HeadBanner {...data.mainBanner}/>
        </section>

        <section className="gallery">
          <div className="container">
            <AnimatedOnScroll animationClass="fade-in-up">
              <div className="text-block center">
                <h2>{data.aboutTitle}</h2>
                <p>
                  <ReactMarkdown
                    rehypePlugins={[rehypeSanitize]}
                    remarkPlugins={[remarkGfm]}
                  >
                    {data.aboutDesc || ''}
                  </ReactMarkdown>
                </p>
              </div>
            </AnimatedOnScroll>
          </div>
            <AnimatedOnScroll animationClass="fade-in-up">
              <StandartGallery images={data?.gallery} />
            </AnimatedOnScroll>
        </section>

        <section id='about-events'>
          <div className="container">
            <AnimatedOnScroll animationClass="fade-in-up">
              <div className="text-block center">
                <h2>У нас є все необхідне для вашої події</h2>
              </div>
            </AnimatedOnScroll>
            <div className="content">
              <FoodAndFun 
                center="center"
                style='rounded'
                data={data?.benefits}
              />
            </div>
          </div>
        </section>
        <CallToAction {...EventsCallToAction} />
    </main>
}



