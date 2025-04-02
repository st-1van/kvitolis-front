
"use client"; 
import Image from "next/image";
import Link from "next/link";
// import Link from "next/link";

interface TreeDescProps {
    name:string,
    desc:string,
    src:string,
    button1?:string;
  }

export default function TreeDescription(props: TreeDescProps) {
    const { name, desc, src, button1 } = props;

    return (
        <section className="treeDescription">
            <div className="container">
                <div className="row">
                    <div className="col col-bg">
                    <Image 
                        className='treeDescription__img' 
                        src={src} 
                        alt={`фото-${name}`}
                        // fill={true}
                        height={456}
                        width={650}
                    />
                    </div>
                    <div className="treeDescription__content col col-bg">
                        <p>Дерева алеї</p>
                        <h2>{name}</h2>
                        <p className="treeDescription__description">{desc}</p>
                        <Link href='/garden/alley5/plant-dyb-person'>
                            <button className="btn btn--medium btn--green">
                                {button1}
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function TreeVertical (props: TreeDescProps) {
    const { name, desc, src } = props;

    return (
                <div className="treeDescription grey">
                    <Image 
                        className='treeDescription__img' 
                        src={src} 
                        alt={`фото-${name}`}
                        height={517}
                        width={624}
                    />
                    <div className="treeDescription__content">
                        <h2>{name}</h2>
                        <p className="treeDescription__description">{desc}</p>
                        <p className="guarenties">
                            Ми даємо 100% гарантію, що ваш саджанець роками ростиме на нашій алеї з належним доглядом та турботою
                        </p>
                    </div>
                </div>
    );
    
}
