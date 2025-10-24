"use client"; 
import Image from "next/image";
// import Link from "next/link";

export interface TreeDescProps {
    name:string,
    desc:string,
    src:string,
    latin:string,
    button1?:string;
    slug?:string;
    price?:string;
  }

export default function TreeDescription(props: TreeDescProps) {
    const { 
        name, 
        desc, 
        src, 
        // button1, 
        // slug, 
        latin,
        price
    } = props;
    console.log('photo src:', src);
    
    const transformedPrice = price ? price.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : '';

    return (
        <section className="treeDescription" id='about-alley'>
            <div className="container">
                <div className="row" style={{alignItems: 'center'}}>
                    <div className="treeDescription__img col col-md">
                        <Image 
                            src={src} 
                            alt={`фото-${name}`}
                            height={400}
                            width={400}
                        />
                    </div>
                    <div className="treeDescription__content col col-lg">
                        <p>Тут буде висаджено</p>
                        <h2>{name}</h2>
                        <p className="treeDescription__description">{latin}</p>
                        <p className="treeDescription__description">{desc}</p>
                        {/* <Link href={slug||'#'}>
                            <button className="btn btn--medium btn--green">
                                {button1}
                            </button>
                        </Link> */}

                    <div className="treeDescription__price">
                            <p className="treeDescription__price--title">Вартість саджанця з ПДВ</p>
                            <p className="treeDescription__price--value">{transformedPrice} грн</p>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function TreeVertical (props: TreeDescProps) {
    const { name, desc, src, latin } = props;

    return (
                <div className="treeDescription grey vertical">
                    <Image
                        className='treeDescription__img' 
                        src={src}
                        alt={`фото-${name}`}
                        height={400}
                        width={400}
                    />
                    <div className="treeDescription__content">
                        <h2>{name}</h2>
                        <p className="treeDescription__description">{latin}</p>
                        <p className="treeDescription__description">{desc}</p>
                        <p className="guarenties">
                            Ми даємо 100% гарантію, що ваш саджанець роками ростиме на нашій алеї з належним доглядом та турботою
                        </p>
                    </div>
                </div>
    );
    
}


export function TreeSmallVertical (props: TreeDescProps) {
    const { name, desc, src, latin, price } = props;

    const transformedPrice = price ? price.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : '';

    return (
            <div className="treeDescription small vertical">
                <div className="treeDescription__textDesc">
                    <div>
                        <h2>{name}</h2>
                        <p className="treeDescription__text">{latin}</p>
                        <p className="treeDescription__text">{desc}</p>
                        <p className="guarenties">
                            Ми даємо 100% гарантію, що ваш саджанець роками ростиме на нашій алеї з належним доглядом та турботою
                        </p>
                    </div>
                    <Image 
                        className='treeDescription__img' 
                        src={src} 
                        alt={`фото-${name}`}
                        height={250}
                        width={250}
                    />
                </div>
                <div className="treeDescription__price">
                        <p className="treeDescription__price--title">Вартість саджанця з ПДВ</p>
                        <p className="treeDescription__price--value">{transformedPrice} грн</p>
                </div>
            </div>
    );
    
}