'use client';

import { CircularProgress } from "@mui/material";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

import HeadBanner from "../../_components/HeadBanner";
import { FoodAndFun } from "../../_components/WeHave";
import Image from "next/image";
import AnimatedOnScroll from "../../_components/ui/AnimatedScroll";
import StandartGallery, { ImageItemProps } from "../../_components/StandartGallery";
import type { SlideProps } from "../../_components/Carousel";

type FestivalProps ={
  id:string;
  slug:string;
  aboutTitle?:string;
  aboutDesc?:string;
  dateTitle?:string;
  dateDesc?:string;
  mainBanner: SlideProps;
  time:{
    text:string;
  }[];
  price:{
    days:string;
    price:string;
  }[];
  benefits: {
    id:string;
    title:string;
    desc?:string;
    photo:{
      url:string;
    };
  }[]
  gallery: ImageItemProps[];
};

export default function FestivalClient(props: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = props.data as any as FestivalProps;

  // Якщо з якихось причин прийшло порожньо — покажемо простий fallback
  if (!data) {
    return (
      <main>
        <div style={{ width: "100%", textAlign: "center", padding: 40 }}>
          <CircularProgress />
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="mainBanner container animate fade-in-up">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <HeadBanner {...(data?.mainBanner as any)} />
      </section>

      <section className="season">
        <div className="container">
          <AnimatedOnScroll animationClass="fade-in-up">
            <div className="text-block center">
              <h2>{data?.aboutTitle}</h2>
              <p>{data?.aboutDesc}</p>
            </div>
          </AnimatedOnScroll>

          <div className="content">
            <FoodAndFun
              desc="Щодня на вас чекають"
              center="center"
              style="rounded"
              data={(data?.benefits ?? []).filter((_, index) => index < 3)}
            />
          </div>
        </div>
      </section>

      <section className="season">
        <div className="container">
          <div className="content">
            <FoodAndFun
              desc="У вихідних ще більше розваг"
              center="center"
              style="rounded"
              data={(data?.benefits ?? []).filter((_, index) => 2 < index && index < 6)}
            />
          </div>
        </div>
      </section>

      <section className="gallery">
        <AnimatedOnScroll animationClass="fade-in-up">
          <StandartGallery images={data?.gallery ?? []} />
        </AnimatedOnScroll>
      </section>

      <section className="date">
        <div className="container">
          <AnimatedOnScroll animationClass="fade-in-up">
            <div className="text-block center">
              <p>чекаємо на вас</p>
              <h2>{data?.dateTitle}</h2>
              <p>{data?.dateDesc}</p>
            </div>
          </AnimatedOnScroll>

          <AnimatedOnScroll animationClass="fade-sides">
            <div className="content">
              <div className="col col-sm green data-card">
                <Image src="/assets/icons/clock.svg" width={65} height={65} alt="icon-clock" />
                <p className="subp">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
                    {data?.time?.[0]?.text ?? ""}
                  </ReactMarkdown>
                </p>
              </div>

              {data?.time?.[1] && (
                <div className="col col-sm green data-card">
                  <Image src="/assets/icons/clock.svg" width={65} height={65} alt="icon-clock" />
                  <p className="subp">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
                      {data?.time?.[1]?.text ?? ""}
                    </ReactMarkdown>
                  </p>
                </div>
              )}
            </div>
          </AnimatedOnScroll>
        </div>
      </section>

      <section className="tickets">
        <div className="container">
          <AnimatedOnScroll animationClass="fade-in-up">
            <div className="text-block center">
              <h2>Вартість квитків</h2>
            </div>
          </AnimatedOnScroll>

          <AnimatedOnScroll animationClass="fade-sides">
            <div className="content">
              <div className="col col-bg grey cost-card">
                <div>
                  <p className="subp">{data?.price?.[0]?.days ?? ""}</p>
                  <Image src="/assets/icons/tickets.svg" width={70} height={61} alt="icon-calendar" />
                </div>
                <p>
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
                    {data?.price?.[0]?.price ?? ""}
                  </ReactMarkdown>
                </p>
              </div>

              {data?.price?.[1] && (
                <div className="col col-bg grey cost-card">
                  <div>
                    <p className="subp">{data?.price?.[1]?.days ?? ""}</p>
                    <Image src="/assets/icons/tickets.svg" width={70} height={61} alt="icon-calendar" />
                  </div>
                  <p>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
                      {data?.price?.[1]?.price ?? ""}
                    </ReactMarkdown>
                  </p>
                </div>
              )}
            </div>
          </AnimatedOnScroll>
        </div>
      </section>
    </main>
  );
}