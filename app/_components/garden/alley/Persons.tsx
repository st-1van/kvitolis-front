"use client";
import { useEffect, useMemo, useState } from "react";
import { X, TreeDeciduous } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MapleIcon from "../../ui/MapleIcon";
import { useModal } from "../../context/modal-context";
import AnimatedOnScroll from "../../ui/AnimatedScroll";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

export type PersonsDataProps = {
  id: number;
  name: string;
  desc?: string | null;
  years?: string;
  free?: boolean;
  mecenat?:{
    name: string;
    note: string;
  }
  isSelected?: boolean;
  order?: number;
  photo?: string | null;
};

export type PersonsProps = {
  personsData: PersonsDataProps[];
  alleyName: string;
  searchedPerson?: Record<string, string | string[] | undefined>;
};

const trimText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

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

export default function Persons({ 
  personsData, 
  alleyName, 
  searchedPerson
}: PersonsProps) {
  // always memoize indexedList!
  const indexedList = useMemo(
    () =>
      personsData.map((person, index) => ({
        ...person,
        order: index + 1,
      })),
    [personsData]
  );

 // по id Шукає норм
 // чомусь ще шукає по імені, знайти чому так.
  const personId = Number(searchedPerson?.id);
  const exists = indexedList.some(person => person.id === personId);
  const defaultActiveId = exists ? personId : indexedList[0]?.id; //треба змінити порядок рендеру, щоб спочатку показувалися queried person, а потім вже перша особа зі списку. Інакше при переході за посиланням з параметром searchedPerson, який не є валідним, буде показуватися перша особа зі списку, а не queried person (який може бути валідним, але просто не знайденим через помилки в даних).



  const [filter, setFilter] = useState<'all' | 'free' | 'taken'>('all');
  const [displayedPeople, setDisplayedPeople] = useState<PersonsDataProps[]>(indexedList);
  const [selectedIds, setSelectedIds] = useState<(number)[]>([]);
  const [activePersonId, setActivePersonId] = useState<number | null>(defaultActiveId);
  
  // Prepare filtered lists
  const freeList = useMemo(() => indexedList.filter(p => p.free === true), [indexedList]);
  const takenList = useMemo(() => indexedList.filter(p => p.free === false), [indexedList]);
  const allList = indexedList;

  useEffect(() => {
    if (filter === 'free') setDisplayedPeople(freeList);
    else if (filter === 'taken') setDisplayedPeople(takenList);
    else setDisplayedPeople(allList);
  }, [filter, freeList, takenList, allList]);

  // Sync activePersonId if personsData changes
  useEffect(() => {
    if (!indexedList.find(p => p.id === activePersonId)) {
      setActivePersonId(indexedList[0]?.id ?? null);
    }
  }, [indexedList, activePersonId]);




  // Selection logic by id
  const selectionHandler = (person: PersonsDataProps) => {
    setSelectedIds((prev) =>
      prev.includes(person.id) ? prev.filter(id => id !== person.id) : [...prev, person.id]
    );
  };

  const isSelected = (person: PersonsDataProps) => !!selectedIds.includes(person.id);

  const selectedPersons = indexedList.filter(p => selectedIds.includes(p.id));
  const names = selectedPersons.map(p => p.name);

  // серч параметри для формування посилання на форму меценатства з попередньо вибраними постатями. Якщо searchedPerson валідний, то він буде встановлений як активна особа, і її id буде додано до параметрів посилання. Якщо searchedPerson не валідний або відсутній, то використовуватиметься перша особа зі списку (якщо вона є).
  const params = new URLSearchParams({
    alleyName: alleyName,
    names: names.join(","),
  });

  const link = `/garden/plant-tree?${params.toString()}`;
  const activePerson = indexedList.find(p => p.id === activePersonId) ?? null;

  const isAlleySponsored = alleyName === 'Садівництво' ? true : false;
  // const isMecenatIsSame = takenList.length === takenList.filter(p => allList[0].mecenat.name === p.mecenat?.name).length;
  
  const isAlleysFullyTaken = freeList.length === 0 && takenList.length === allList.length;

  return (
    <section className='aboutAlley'>
      <div className="container">
        <AnimatedOnScroll animationClass="fade-sides">
          <div className="row">
            <div className='persons col-md col'>
              <div className="persons__headline">
              {isAlleysFullyTaken ? (
                <>
                  {/* <h2>Ця алея вже має меценатів.</h2> */}
                  <h2>{isAlleySponsored ? `Меценат цієї алеї` : `Ця алея вже має меценатів.`}</h2>
                  {isAlleySponsored ? <img src='/assets/ecoorganic-logo.png' alt='Ecoorganic logo' style={{width: '66%', height: 'auto', marginBottom: '2rem'}} className="mecenat-logo"/> : ''}
                  
                  <Link href="/garden#alleys">
                    <button className={`btn btn--green btn--medium`}>
                      Обрати іншу алею
                    </button>
                  </Link>
                </>
              )
              : 
              <>
                  {takenList.length !== 0 ? 
                    <>
                      <button
                        className={`btn btn--outlined btn--medium${filter === 'taken' ? ' --active' : ''}`}
                        onClick={() => setFilter('taken')}
                      >
                        {takenList.length} знайшли мецената
                      </button>
                      <button
                        className={`btn btn--green btn--medium${filter === 'free' ? ' --active' : ''}`}
                        onClick={() => setFilter('free')}
                      >
                        {freeList.length} доступних для вибору
                      </button>
                      <button
                        className={`btn btn--green btn--medium${filter === 'all' ? ' --active' : ''}`}
                        onClick={() => setFilter('all')}
                      >
                        Всі
                      </button>
                    </>
                    :
                    <>
                      <h2>Оберіть діячів та станьте меценатом</h2>
                    </>
                  }
              </>
              }
              </div>
              <div>
              <div className="persons__selected">
                {selectedPersons.length > 0 ? (
                  <div className="selected-info">
                    <p className="sub">Ви обрали {selectedPersons.length} {personTextEnding(selectedPersons.length)}</p>
                    <p>Завдяки вашому меценатству буде висаджено {selectedPersons.length} {treeTextEnding(selectedPersons.length)} присвячених обраним постатям</p>
                  </div>
                ) : ''}
                <div className="persons__selected-list">
                  {selectedPersons.length > 0 ? (
                    selectedPersons.map((person) => (
                      <div key={person.id} className="persons__selected-item">
                        <button
                          className="remove-btn"
                          onClick={() => selectionHandler(person)}
                        >
                          <X className="icon" size={24} />
                        </button>
                        <Image
                          src={person.photo ?? '/assets/people/default-person1.png'} alt={person.name}
                          height={100}
                          width={100}
                          onClick={() => setActivePersonId(person.id)}
                        />
                      </div>
                    ))
                  ) : (
                    <span><i>*клікніть на постаті, щоб дізнатися більше</i></span>
                  )}
                </div>
                {selectedPersons.length > 0 ? (
                  <Link href={link}>
                    <button className="btn btn--green btn--medium">
                      Оформити меценатство
                    </button>
                  </Link>
                ) : ''}
              </div>
              <PersonsList
                personsData={displayedPeople}
                setActivePersonId={setActivePersonId}
                selectedIds={selectedIds}
                selectionHandler={selectionHandler}
                isQueried={searchedPerson}
              />
              </div>
            </div>
            {activePerson && (
            <div className="persons__card-wrapper col col-lg">
              <PersonCardNew
                item={activePerson}
                isSelected={() => isSelected(activePerson)}
                selectionHandler={selectionHandler}
              />
            </div>
            )}
          </div>
        </AnimatedOnScroll>
        </div>
  </section>
  );
}

function PersonCardNew({ item, isSelected, selectionHandler }: { item: PersonsDataProps; isSelected?: () => boolean; selectionHandler?: (person: PersonsDataProps) => void; }) {
  const { name, photo, desc, free, mecenat, years } = item;

  return (
    <>
      <div className='persons__card' key={item.id} id={String(item.id)}>
        <Image
          className="persons__card-img"
          src={photo ?? '/assets/people/default-person1.png'}
          alt={name}
          height={160}
          width={160}
        />
        <div className="persons__card-text">
            <p className="persons__card-title sub">{name}</p>
            <p className="persons__card-years">{years}</p>
            <p className="persons__card-info">{desc ?? 'Перепрошуємо, наразі опис відсутній та буде додано найближчим часом.'}</p>
            {free === true ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    selectionHandler?.(item);
                  }}
                  className={`btn btn--green btn--medium persons__card-mecenat-btn${isSelected && isSelected() ? ' --selected' : ''}`}
                >
                  {isSelected && isSelected() ? 'Обрано' : 'Cтати меценатом'}
                </button>
            ) : (
              '')}
        </div>
      </div>
      {free === true ? (
        ''
      ) : (
        <div className="mecenat green">
          <p className="mecenat__info">Меценат: {mecenat?.name ?? 'Анонімний меценат'}</p>
          <p className="mecenat__note">          
          <ReactMarkdown
              rehypePlugins={[rehypeSanitize]}
              remarkPlugins={[remarkGfm]}
          >
            {mecenat?.note ?? "*Історія меценатства цієї постаті буде додана найближчим часом."}
          </ReactMarkdown>
          </p>
        </div>
      )}
    </>
  );
}

function PersonsList({
  personsData,
  setActivePersonId,
  selectedIds,
  selectionHandler,
  isQueried,
}: {
  personsData: PersonsDataProps[];
  setActivePersonId: (id: number) => void;
  selectedIds: number[];
  selectionHandler?: (person: PersonsDataProps) => void;
  isQueried?: string | Record<string, string | string[] | undefined>;
}) {

  const { showModal } = useModal();

  const isMobile = () => typeof window !== "undefined" && window.innerWidth < 769;

  const handleItemClick = (item: PersonsDataProps) => {
    setActivePersonId(item.id);
    if (isMobile()) {
      showModal(
        <PersonCardNew 
          item={item}
          selectionHandler={selectionHandler}
        />
      );
    }
  };

  useEffect(() => {
    if (isQueried && typeof isQueried === 'object' && 'name' in isQueried) {
      const queriedPerson = personsData.find(p => p.name === isQueried.name);
      if (queriedPerson) {
        handleItemClick(queriedPerson);
      }
    }

  }, [isQueried, personsData]);


  return (
    <div className="container1">
      <div className="scrollable">
        <div className='persons__list'>
          {personsData.map((item) => (
            <div
              key={item.id}
              className={`item${selectedIds.includes(item.id) ? ' --selected' : ''}`}
              // onClick={() => setActivePersonId(item.id)}
              id={String(item.id)}
              onClick={() => handleItemClick(item)}
            >
              <div className="item__img-wrapper">
                <Image
                  src={item.photo ?? '/assets/people/default-person1.png'}
                  alt={item.name}
                  height={100}
                  width={100}
                  className="item__img"
                  unoptimized
                />
                <div className={`status-button${item.free ? ' --free' : ' --taken'}`}>
                  {item.free ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        selectionHandler?.(item);
                      }}
                    >
                      <MapleIcon type='filled' />
                    </button>
                  ) : (
                    <TreeDeciduous className='svg-icon' size={25} />
                  )}
                </div>
              </div>
              <div>
                <p className="sub">{`${item.order ?? ''} | ${item.name}`}</p>
                <p className="persons__info">{item.desc ? trimText(item.desc, 80) : item.years}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fade-overlay">
        <div className="top" />
        <div className="bottom" />
      </div>
    </div>
  )
}