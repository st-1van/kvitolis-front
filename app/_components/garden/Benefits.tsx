"use client"; 
import Image from "next/image";
import AnimatedOnScroll from "../ui/AnimatedScroll";

type BenefitsProps = {
    title: string;
    benefits: string[];
    imgSrc: string;
};

type BenefitsItemProps = {
    title: string;
    benefits: string[];
    type:string;
};

export default function Benefits({ title, benefits, imgSrc }: BenefitsProps) {
    return (
        <section className="benefits">
            <div className="container">
                <AnimatedOnScroll animationClass="fade-sides">
                <div className="row light-green">
                    <Image 
                        className='benefits__img' 
                        src={imgSrc} 
                        alt='benefit'
                        height={456}
                        width={650}
                    />
                    <BenefitsItems title={title} benefits={benefits} type=''/> 
                </div>
                </AnimatedOnScroll>
            </div>
        </section>
    );
}

export function BenefitsItems({title, benefits, type}: BenefitsItemProps){
    return(
        <div className={`benefits__items ${type}`}>
            {type?<p className="benefits__title">{title}</p>:<h2>{title}</h2>}
            <ul>
                {benefits.map((item, index) => (
                    <li key={index}>{item}</li>  
                ))}
            </ul>
        </div>
    )
}
