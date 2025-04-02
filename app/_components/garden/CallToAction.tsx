"use client"; 
import Image from "next/image";
import Link from "next/link";

type BenefitsProps = {
    title: string;
    desc: string;
    btn: string;
};

export default function CallToAction({ title, desc, btn }: BenefitsProps) {
    return (
        <section className="callToAction">
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
            <div className="center">
                <h2>{title}</h2>
                <p className="desc">{desc}</p>
                <Link href='/garden/alley5/plant-dyb-person'>
                    <button className="btn btn--medium btn--green">
                        {btn}
                    </button>
                </Link>
            </div>

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
        </section>
    );
}
