"use client"; 
import Image from "next/image";
import Link from "next/link";

type BenefitsProps = {
    title: string;
    steps: string[];
    btn: string;
};

export default function CallToAction({ title, steps }: BenefitsProps) {
    return (
        <section className="callToAction fade-in-up">
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
                <div className="callToAction__steps">
                    {steps.map((step, index)=>(
                        <div className='step' key={index}>
                            <span>{index+1}</span>
                            <p className="desc" key={index}>{step}</p>
                        </div>
                    ))}
                </div>


                <Link href='/garden/plant-tree'>
                    <button className="btn btn--medium btn--green">
                        Долучитися
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
            <div className="trees">
            </div>      
        </section>
    );
}
