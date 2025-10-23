'use client'
import { useState } from "react";
import { TreeSmallVertical } from '@/app/_components/garden/alley/TreeDescription';
import type { TreeDescProps } from '@/app/_components/garden/alley/TreeDescription';
import type { PersonsProps } from '@/app/_components/garden/alley/Persons';
import AnimatedOnScroll from '../../ui/AnimatedScroll';


type AboutAlleyProps = {
    treeData: TreeDescProps;
    personsData?: PersonsProps['personsData'];
    alleyName: string;
    alleyDesc?: string;
  };

export default function AboutAlley (){
    return(
        <section className='aboutAlley'>
          <div className="container">
             <AnimatedOnScroll animationClass="fade-sides">
               <div className="row">
               </div>
             </AnimatedOnScroll>
           </div>
      </section>
    )
}

export function AlleyDescriptionVertical ({ treeData, alleyName, alleyDesc }: AboutAlleyProps) {
  return (
        <div className="alleyDescVertical container grey">
            <div className="column">
              <div className='alleyDescVertical__content'>
                <h2>{alleyName}</h2>
                <p className="desc">
                  {alleyDesc}
                </p>
              </div>
              <TreeSmallVertical {...treeData} />
            </div>
        </div>
    )
  }


type AccordionProps = {
  title: string;
  steps: { title: string; content: React.ReactNode }[];
};

export function Accordion({ title, steps }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="Accordion">
      <AnimatedOnScroll animationClass="fade-sides">
      <div className="container">
        <div className="Accordion__title">
          <h2>{title}</h2>
        </div>
        <div className="Accordion__content">

          {steps.map((item, index) => (
            <div
              key={index}
              className={`Accordion__item ${openIndex === index ? "open" : ""}`}
            >
              <button className="Accordion__title" onClick={() => toggleAccordion(index)}>
                {item.title}
                <span className="Accordion__icon">{openIndex === index ? "−" : "+"}</span>
              </button>
              <div className="Accordion__copntent" style={{ maxHeight: openIndex === index ? "200px" : "0" }}>
                {item.content}
              </div>
            </div>
          ))}
        </div>
      </div>
      </AnimatedOnScroll>
    </section>
  );
}