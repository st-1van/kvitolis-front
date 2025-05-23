"use client";
import { useState } from "react";
import AnimatedOnScroll from "../ui/AnimatedScroll";

type FAQProps = {
  title: string;
  qa: QaProps[];
};

type QaProps = {
  question: string;
  answer: string;
};

export default function FAQ({ title, qa }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="FAQ">
      <AnimatedOnScroll animationClass="fade-sides">
      <div className="container">
        <div className="FAQ__title">
          <h2>{title}</h2>
        </div>
        <div className="FAQ__accordion">
          {qa.map((item, index) => (
            <div
              key={index}
              className={`FAQ__item ${openIndex === index ? "open" : ""}`}
            >
              <button className="FAQ__question" onClick={() => toggleAccordion(index)}>
                {item.question}
                <span className="FAQ__icon">{openIndex === index ? "−" : "+"}</span>
              </button>
              <div className="FAQ__answer" style={{ maxHeight: openIndex === index ? "200px" : "0" }}>
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </AnimatedOnScroll>
    </section>
  );
}
