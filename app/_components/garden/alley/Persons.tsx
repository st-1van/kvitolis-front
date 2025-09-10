"use client"; 
import { use, useEffect, useState } from "react";
import { Check, X, Shovel, TreeDeciduous } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MapleIcon from "../../ui/MapleIcon";

export type DataProps = {
  id: string;
  name: string;
  photo?: string;
  desc?: string;
  years?:string;
  free?: boolean;
  date?: string;
  mecenat?: string;
  mecenat_note?: string;
  isSelected?: boolean;
  order?:number;
  selectIonHandler?: (name: string) => void;
};

export type PersonsProps = {
  famousPeople: DataProps[];
  alleyName:string;
};

    const trimText = (text: string, maxLength: number) => {
      if (text.length <= maxLength) return text; 
      return text.slice(0, maxLength) + '...';
    }
  

  export default function Persons({ famousPeople, alleyName }: PersonsProps) {
    
    const [ activePerson, setActivePerson ] = useState(famousPeople[0] ?? null);
    // const [ selectedPersonNames, setSelectedPersonNames ] = useState<[] | null>(null);
    const [ selectedPersons, setSelectedPersons ] = useState<DataProps[] | null>(null);
    const [ filter, setFilter ] = useState<'all' | 'free' | 'taken'>('all');
    const [ displayedPeople, setDisplayedPeople ] = useState<DataProps[]>(famousPeople ?? []);

    const indexedList = famousPeople.map((person, index) => ({
      ...person,
      order:index + 1,
    }));

    // console.log(indexedList)
    

    const freeList = indexedList.filter(p => p.free===true);
    const takenList = indexedList.filter(p => p.free===false);
    const allList = indexedList;

    const freeNumber = freeList.length;
    const takenNumber = takenList.length;

    useEffect(() => {
      if (filter === 'free') {
        setDisplayedPeople(freeList);
      } else if (filter === 'taken') {
        setDisplayedPeople(takenList);
      } else {
        setDisplayedPeople(allList);
      }
    }, [filter, famousPeople]);

    useEffect(() => {
    }, [activePerson]);

    const selectionHandler = (person: object) => {
      // console.log('Clicked on:', person);
      if (selectedPersons?.includes(person)) {
        setSelectedPersons(selectedPersons.filter(n => n !== person) as []); 
      } else {
        setSelectedPersons([...(selectedPersons ?? []), person]);
      }
      // console.log('Selected names:', selectedPersons);
    }

    const isSelected = ()=>(selectedPersons?.includes(activePerson ?? '') ?? false);

    const treeTextEnding = (count: number) => {
      if (count % 10 === 1 && count % 100 !== 11) {
        return 'дерево';
      }
      if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
        return 'дерева';
      }
      return 'дерев';
    };

    const personTextEnding = (count: number) => {
      if (count % 10 === 1 && count % 100 !== 11) {
        return 'постать';
      }
      if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
        return 'постаті';
      }
      return 'постатей';
    }
  
    return (
      <>
      <div className='persons'>

        <div className="persons__selected">
          {selectedPersons && selectedPersons.length > 0 ? (
            <div className="selected-info">
              <p className="sub">Ви обрали {selectedPersons.length} {personTextEnding(selectedPersons.length)}</p>
              <p>Завдяки вашому меценатству буде висаджено {selectedPersons.length} {treeTextEnding(selectedPersons.length)} присвячених обраним постатям</p>
              {/* <button className="btn btn--green btn--medium">
                Оформити меценатство
              </button> */}
            </div>
            ) : ''}

          <div className="persons__selected-list"> 
            {selectedPersons && selectedPersons.length > 0 ? (     
              selectedPersons.map((person) => (
                <div key={person.name} className="selected-person">
                  <button 
                    className="remove-btn"
                    onClick={() => selectionHandler(person)}
                  >
                    <X className="icon" size={25} />
                  </button>
                  <Image 
                  src={person.photo ?? '/assets/people/people1.png'} alt={person.name} 
                  height={100} 
                  width={100} 
                  onClick={() => setActivePerson(person)}
                  />
                </div>
              ))
            ) : (
              <span><i>*кліклніть на постаті, щоб дізнатися більше</i></span>
            )}
          </div>
        </div>
        <div className="btn-filters">
          <button 
            className="btn btn--green btn--medium"
            onClick={()=>setFilter('free')}
          >
            {freeNumber} доступних для вибору
          </button>
          <button 
            className="btn btn--outlined btn--medium"
            onClick={() => setFilter('taken')}
          >
            {takenNumber} знайшли мецената
          </button>
          <button 
            className="btn btn--green btn--medium"
            onClick={()=>setFilter('free')}
          >
            Всі
          </button>
        </div>
        <PersonsList 
          famousPeople={displayedPeople ?? []}
          setActivePerson={setActivePerson}
          selectedPersons={selectedPersons ?? []}
          selectionHandler={selectionHandler}
        />
      </div>
      <PersonCardNew 
        item={activePerson} 
        isSelected={isSelected} 
        selectionHandler={selectionHandler} 
      />
      </>
    );
  }

  

function PersonCardNew({ item, isSelected, selectionHandler }: { item: DataProps; isSelected?: () => boolean; selectionHandler?: (name: object) => void; }) {
    const { name, photo, desc, free, mecenat, years, mecenat_note } = item;

    return (
      <div>
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
              <p className="spersons__info">{years}</p>
              <p className="persons__info">{desc??'Перепрошуємо, наразі опис відсутній та буде додано найближчим часом.'}</p>
            </div>
          </div>
        </div>
        {free===true ? (
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              selectionHandler?.(item);
            }} 
            className={`btn btn--green btn--medium mecenat-btn ${isSelected && isSelected() ? '--selected' : ''}`}
          >
                {isSelected && isSelected() ? 'Обрано' : 'Cтати меценатом'}
          </button>
        ) : (
          <div className="mecenat green">
              <p className="mecenat__info">Меценат: {mecenat ?? 'Анонімний меценат'}</p>
              {/* <p className="mecenat__note">
                {mecenat_note??''}
              </p> */}

              <p className="mecenat__note">
                {mecenat_note ?? 
                "“Привіт, мене звуть Олександр Каширець. Працюю у сфері стратегічних комунікацій державних проєктів. Народився і виріс на Волині, активно цікавлюся й підтримую проєкти, які  об’єднуть нас, як націю та громадян. Цей проект відкрив для мене доволі багато імен видатних українців, яких я ще не знав. Саме тому, я обрав княгиню Ольгу”"
                }
              </p>
          </div>
        )}
      </div>
    );
}

function PersonsList ({ famousPeople, setActivePerson, selectedPersons, selectionHandler, }: { famousPeople: DataProps[]; setActivePerson: (person: DataProps) => void; selectedPersons: DataProps[]; selectionHandler?: (name: object) => void; }) {
  return (
        <div className="container1">
          <div className="scrollable">
            <div className='persons__list'>
              {famousPeople.map((item) => (
                <div 
                  key={item.id} 
                  className={`item ${selectedPersons?.includes(item) ? '--selected' : ''}`} 
                  onClick={() => setActivePerson(item)}
                >
                  <Image
                    src={item.photo ?? '/assets/people/people1.png'}
                    alt={item.name}
                    height={100}
                    width={100}
                  />

                  <div className={`status-button ${item.free ? '--free' : '--taken'}`}>
                    {item.free ? (
                      <button
                        onClick={(e) => { 
                          e.stopPropagation();
                          selectionHandler?.(item);
                        }}
                      >
                          <MapleIcon type='filled'/>
                      </button>
                      ) : (
                        <TreeDeciduous size={25} />
                    )}
                  </div>                  
                  <div>
                    <p className="sub">{`${item.order} | ${item.name}`}</p>
                    <p className="persons__info">{item.desc? trimText(item.desc, 80) : item.years}</p>
                  </div>
                </div>
              ))}
              <div>
                {/* <p className="sub">
                  Ми теж хотіли б, щоб цей список ніколи не закінчувався.
                </p> */}
              </div>
            </div>
          </div>
  
          <div className="fade-overlay">
            <div className="top" />
            <div className="bottom" />
          </div>
        </div>
)}


