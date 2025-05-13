"use client";
import { useState } from "react";

type MissionProps = {
  title: string;
  data: DataProps[];
};

type DataProps = {
  name: string;
  desc: string;
};

export default function Mission({ title, data }: MissionProps) {
  const [openIndex, setOpenIndex] = useState<number | 0>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? 0 : index);
  };

  return (
    <section className="mission" id='about-garden'>
        <div className="mission__title fade-in-up">
          <h2>{title}</h2>
        </div>


        <div className="accordion container fade-sides">

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
                  <p>
                    {item.desc}
                  </p>
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
                <p>
                  {item.desc}
                </p>
              </div>
            ))}
          
          </div>
        </div>
    </section>
  );
}
