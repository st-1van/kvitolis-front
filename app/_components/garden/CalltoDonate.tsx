"use client"; 
import Image from "next/image";
import Link from "next/link";
import AnimatedOnScroll from "../ui/AnimatedScroll";

type DonateProps = {
    title: string;
    desc: string;
    btn: string;
    slug: string;
    type?: 'trees' | 'no-trees';
};

export default function CallToDonate({ title, desc, btn, slug, type}: DonateProps) {
    return (
        <section className={`callToAction ${type==='no-trees'?'donate':''}`}>
            {type === 'trees'? (
                <AnimatedOnScroll animationClass="fade-left">
                    <div className="left">
                            <Image
                                className='benefits__img' 
                                src='/assets/alleys/tree1.png'
                                alt='benefit'
                                height={362}
                                width={300}
                            />
                            <Image 
                                className='benefits__img' 
                                src='/assets/alleys/tree1.png'
                                alt='benefit'
                                height={362}
                                width={300}
                            />
                    </div>
                </AnimatedOnScroll>
            ):''}
            <AnimatedOnScroll animationClass="fade-in-up">
                <div className="center">
                    <h2>{title}</h2>
                    <p className="desc">{desc}</p>
                    <Link href={slug}>
                        <button className="btn btn--medium btn--green">
                            {btn}
                        </button>
                    </Link>
                </div>
            </AnimatedOnScroll>
            {type === 'trees'? (
            <AnimatedOnScroll animationClass="fade-right">
                <div className="right">
                        <Image 
                            className='benefits__img' 
                            src='/assets/alleys/tree1.png'
                            alt='benefit'
                            height={362}
                            width={300}
                        />
                        <Image 
                            className='benefits__img' 
                            src='/assets/alleys/tree1.png'
                            alt='benefit'
                            height={362}
                            width={300}
                        />
                </div> 
            </AnimatedOnScroll> 
            ):''}  
        </section>
    );
}