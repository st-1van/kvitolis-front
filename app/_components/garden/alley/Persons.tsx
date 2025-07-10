"use client"; 
import { Shovel, TreeDeciduous } from "lucide-react";
import Image from "next/image";
import { useModal } from "../../context/modal-context";
import Link from "next/link";

export type DataProps = {
  id: string;
  name: string;
  photo?: string;
  desc?: string;
  years?:string;
  free?: boolean;
  date?: string;
  mecenat?: string;
};

export type PersonsProps = {
  famousPeople: DataProps[];
  alleyName:string;
};
  

  export default function Persons({ famousPeople, alleyName }: PersonsProps) {
    
    const { showModal } = useModal();
  
    return (
      <div className='persons'>
        <h2 className="persons__headline">Ця алея присвячена</h2>
  
        <div className="container1">
          <div className="scrollable">
            <div className='persons__list'>
              {famousPeople.map((item) => (
                <div key={item.id} className="item">
                  <div>
                    <p className="sub">{item.name}</p>
                    <p className="persons__info">{item.years||item.desc}</p>
                   
                    {/* приховую кнопку, доки не додадуть нормально фоток */}

                    {/* <button
                      className="btn btn--minimal"
                      onClick={() => showModal(<PersonCard item={item} />)}
                    >
                      дізнатися більше
                    </button> */}
                  </div>
                  {/* коли підключиться адмінка  змінити стан item.free */}
                  {item.free!==false ? 
                  <Link href={`/garden/plant-tree?name=${item.name}&alleyName=${alleyName}`} >
                    <button className={`status --free`}>
                        посадити 
                        <Shovel className='icon' size={20} />
                    </button>
                  </Link>
                  : 
                  <button
                    className={`status --taken`}
                    onClick={() => showModal(<PersonCard item={item} />)}
                  >
                  <TreeDeciduous className='icon' size={20} />
                </button> }
                  {/* <button
                    className={`status ${item.free ? '--free' : '--taken'}`}
                    onClick={() => showModal(<PersonCard item={item} />)}
                  >
                    {item.free ? 'посадити' : ''}
                    {item.free ? (
                      <Shovel className='icon' size={20} />
                    ) : (
                      <TreeDeciduous className='icon' size={20} />
                    )}
                  </button> */}
                </div>
              ))}
              <div>
                <p className="sub">
                  Ми теж хотіли б, щоб цей список ніколи не закінчувався.
                </p>
              </div>
            </div>
  

          </div>
  
          <div className="fade-overlay">
            <div className="top" />
            <div className="bottom" />
          </div>
        </div>
      </div>
    );
  }

  
  function PersonCard({ item }: { item: DataProps }) {
    const { name, photo, desc, free, mecenat } = item;
  
    return (
      <div className='persons__card' key={name}>
        <Image
          className="persons__img"
          src={photo ?? '/assets/people/people1.png'}
          alt={name}
          height={202}
          width={202}
        />
        <div className="persons__text">
          <div>
            <p className="sub">{name}</p>
            <p className="persons__info">{desc}</p>
          </div>
  
          {free ? (
            <div className="persons__free">
              <p style={{ fontWeight: 'bold' }}>доступно</p>
              <button>+</button>
            </div>
          ) : (
            <div className="test">
              <p className="persons__info">Меценат: {mecenat || ''}</p>
            </div>
          )}
        </div>
      </div>
    );
  }