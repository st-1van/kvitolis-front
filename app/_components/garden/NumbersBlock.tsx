"use client";
import { useEffect, useState, useRef } from "react";

type NumbersProps = {
    title?: string;
    desc?: string;
    numbers: { number: number; text: string, type?:string}[]; 
};


export default function NumbersBlock({ title, desc, numbers }: NumbersProps) {
    const [animatedNumbers, setAnimatedNumbers] = useState(numbers.map(() => 0));
    const numbersRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            numbers.forEach((item, index) => animateNumber(index, item.number));
            observer.disconnect();
          }
        },
        { threshold: 0.5 }
      );
  
      if (numbersRef.current) {
        observer.observe(numbersRef.current);
      }
  
      return () => observer.disconnect();
    }, []);
  
    const animateNumber = (index: number, target: number) => {
      let start = 0;
      const duration = 1000;
      const stepTime = 20;
      const increment = Math.ceil(target / (duration / stepTime));
  
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          start = target;
          clearInterval(timer);
        }
        setAnimatedNumbers((prev) => {
          const newNumbers = [...prev];
          newNumbers[index] = start;
          return newNumbers;
        });
      }, stepTime);
    };
  
    return (
      <section className="numbers">
        <div className="container">
          <div className="numbers__text">
            {title && <h2>{title}</h2>}
            {desc && <p className="desc">{desc}</p>}
          </div>
          <div className="numbers__items" ref={numbersRef}>
            {numbers.map((item, index) => (
              <div key={index} className="numbers__item">
                <p className="numbers__count">{animatedNumbers[index]}{item.type || ""}</p>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }