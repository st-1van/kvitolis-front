'use client';

import ChoseTreeForm from "./ChoseTreeForm";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import AnimatedOnScroll from "../../ui/AnimatedScroll";

import actualData from "../../data/alleyData/actualData";
import { AlleyDescriptionVertical } from "../alley/AboutAlley";

const AlleyData = actualData;
const defaultPeople = AlleyData[0].famousPeople
        .filter(person => person.free !== false)
        .map(person => ({
          ...person,
          free: typeof person.free === "string" ? person.free === "true" : !!person.free
        }))

export type Person = {
  id: string;
  name: string;
  years?: string;
  free: boolean;
  desc?: string;
};

export default function ChoseTreeWrapper() {
  const searchParams = useSearchParams();
  const [selectedAlley, setSelectedAlley] = useState(AlleyData[0]);
  const [personsList, setPersonsList] = useState<Person[]>(defaultPeople);
  //додати лоадінг
  const alleyTitle = searchParams.get("alleyName");

  useEffect(() => {

    if (alleyTitle) {
      const matched = AlleyData.find((a) => a.title === alleyTitle);
      const filteredPeople = matched?.famousPeople
        .filter(person => person.free !== false)
        .map(person => ({
          ...person,
          free: typeof person.free === "string" ? person.free === "true" : !!person.free
        })) || defaultPeople;

      if (matched) {
        setSelectedAlley(matched);
        setPersonsList(filteredPeople)
      }
    }

  }, [selectedAlley]);

  const treeData = {
    name: selectedAlley.tree.name,
    desc: selectedAlley.tree.desc,
    src: selectedAlley.tree.img,
    latin: selectedAlley.tree.latin,
    button1: "Посадити дерево",
  };

  const handleAlleyChange = (newAlleyTitle: string) => {
    const matched = AlleyData.find((a) => a.title === newAlleyTitle);

    if (matched) {
      setSelectedAlley(matched);
      const filteredPeople = matched.famousPeople
        .filter(person => person.free !== false)
        .map(person => ({
          ...person,
          free: typeof person.free === "string" ? person.free === "true" : !!person.free
        }));
      setPersonsList(filteredPeople);
    }
  };

  return (
    <main>
      <section className="plantTree">
        <div className="container" style={{ display: 'flex' }}>
          <AnimatedOnScroll animationClass="fade-sides">
            <div className="row">
              <AlleyDescriptionVertical
                treeData={treeData}
                alleyName={selectedAlley.title}
                alleyDesc={selectedAlley.desc}
              />
              <ChoseTreeForm
                handleAlleyChange={handleAlleyChange}
                chosenAlley={selectedAlley.title}
                personsList={personsList}
                queried={alleyTitle !== null}
              />
            </div>
          </AnimatedOnScroll>
        </div>
      </section>
    </main>
  );
}
