
"use client"; 
import Image from "next/image";
import { MasonryBlock } from "../MasonaryBlock";

type FamousPerson = {
    id:string;
    name: string;
    photo: string;
    desc?: string;
    free: boolean;
    date?: string;
    mecenat?: string;
  };
  
  type FamousPeopleProps = {
    famousPeople: FamousPerson[];
  };
  
export default function FamousPeople({ famousPeople }: FamousPeopleProps) {
    return (
        <section className="famousPeople">
            <div className="container">
                <div className="famousPeople__headline">
                    <h2>Відомі діячі</h2>
                    <p>Кожне висаджене дерево - присвячене відомій ісоричній постаті. Ви можете обрати когось із доступних</p>
                </div>
                    <MasonryBlock data={famousPeople} Card={PersonCard} />
            </div>
        </section>
    );
}


function PersonCard({name, photo, desc, free, mecenat}:FamousPerson) {

    return(
        <div className='famousPeople__card' key={name}>
            <Image
                className="famousPeople__img"
                key={name}
                src={photo}
                alt={name}
                height={202}
                width={202} />
            <div className="famousPeople__text">
                <div>
                    <p className="sub">{name}</p>
                    <p className="famousPeople__info">{desc}</p>
                </div>

                {free===true ?
                    <div className="famousPeople__free">
                        <p style={{ fontWeight: 'bold' }}>доступно</p>
                        <button>+</button>
                    </div>
                    :
                    <div className="test">
                        {/* <p>Дерево висаджено: {date||''}</p> */}
                        <p className="famousPeople__info">Меценат: {mecenat||''}</p>
                    </div>}
            </div>
        </div>
    )


}