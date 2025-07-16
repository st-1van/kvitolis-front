"use client";
import { useEffect, useState } from "react";
import AnimatedOnScroll from "../ui/AnimatedScroll";
import { ReactNode } from "react";

type MissionProps = {
  title: string;
  data: DataProps[];
};

type DataProps = {
  name: string;
  desc: ReactNode;
};

export default function Mission({ title, data }: MissionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  

  useEffect(()=>{
    const handleResize = () => {
      const mobile = window.innerWidth <= 431;
      setIsMobile(mobile);
      setOpenIndex(mobile ? null : 0);
    };
    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [])

  const toggleAccordion = (index: number) => {
    if(isMobile === true){
      setOpenIndex(openIndex === index ? null : index);
    }else{
      setOpenIndex(openIndex === index ? 0 : index);
    }
  };

  return (
    <section className="mission" id='about-garden'>
      <AnimatedOnScroll animationClass="fade-in-up" once={true}>
        <div className="mission__title fade-in-up">
          <h2>{title}</h2>
        </div>
      </AnimatedOnScroll>

        <AnimatedOnScroll animationClass="fade-sides" once={true}>
        <div className="accordion container">

          <div className="accordion__base">
            {data.map((item, index) => (
              <div
                key={index}
                className={`accordion__item ${openIndex === index ? "open" : ""}`}
              >
                <button className="accordion__question" onClick={() => toggleAccordion(index)}>
                  {item.name}
                  <span className="accordion__icon">{openIndex === index ? "−" : "+"}</span>
                </button>
                <div
                  key={index}
                  style={{ maxHeight: openIndex === index ? "500px" : "0" }}
                  className="accordion__answer mobile"
                >
                    {item.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="accordion__answer desc">
            {data.map((item, index)=>(
              <div
                key={index} 
                className={`${openIndex === index ? "block" : "hidden"}`}
              >
                  {item.desc}
              </div>
            ))}
          
          </div>
        </div>
        </AnimatedOnScroll>
    </section>
  );
}
