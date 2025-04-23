"use client"; 
import Image from "next/image";
// import Link from "next/link";

type BenefitsProps = {
    title: string;
    steps: string[];
    btn: string;
};

export default function CallToAction({ title, steps }: BenefitsProps) {
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
                {/* <p className="desc">{}</p> */}
                <ul>
                {steps.map((step, index)=>(
                    <li className="desc" key={index}>{step}</li>
                ))}
                </ul>
                {/* <Link href='#'>
                    <button className="btn btn--medium btn--green">
                        {btn}
                    </button>
                </Link> */}
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
