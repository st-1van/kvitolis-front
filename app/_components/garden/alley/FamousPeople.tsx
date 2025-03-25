
"use client"; 
import Image from "next/image";

type FamousPerson = {
    name: string;
    photo: string;
    desc: string;
    free: boolean;
    date: string;
    mecenat: string;
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
                <div className="row">
                    <div className="famousPeople__items">
                    {famousPeople.map((person, index) => (
                        <div className='famousPeople__person' key={person.name}>
                            <Image
                                key={person.name}
                                src={person.photo} 
                                alt={person.name}
                                height={202}
                                width={202}
                            />
                            <div key={index} className="light-green">
                                <div>
                                    <p className="sub">{person.name}</p>
                                    <p>{person.desc}</p>
                                </div>
                                
                                    {!person.free?
                                        <div className="free">
                                            <p className="sub">доступно</p>
                                            <button>+</button>
                                        </div>
                                    :
                                        <div>
                                            <p>Дерево висаджено: {person.date}</p>
                                            <p>Меценат: {person.mecenat}</p> 
                                        </div>
                                    }
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}


{/* <h2>Відомі особистості</h2>
<ul>
  {famousPeople.map((person, index) => (
    <li key={index} className="famous-person">
      <h3>{person.name}</h3>
      <p>{person.desc}</p>
      <p>{person.free ? "Вільний" : "Зайнятий"}</p>
      <p>Дата: {person.date}</p>
      <p>Меценат: {person.mecenat}</p>
    </li>
  ))}
</ul> */}