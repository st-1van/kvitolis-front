'use client';

import PlantTreeForm from "@/app/_components/garden/alley/PlantTreeForm";
import { TreeVertical } from "@/app/_components/garden/alley/TreeDescription";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import AnimatedOnScroll from "../../ui/AnimatedScroll";

import actualData from "../../data/alleyData/actualData";

const AlleyData = actualData;

export default function PlantTreeWrapper() {
  const searchParams = useSearchParams();

  const [selectedAlley, setSelectedAlley] = useState(AlleyData[0]);
  const [chosenName, setChosenName] = useState("");

  useEffect(() => {
    const alleyTitle = searchParams.get("alleyName");
    const name = searchParams.get("name");

    if (alleyTitle) {
      const matched = AlleyData.find((a) => a.title === alleyTitle);
      if (matched) setSelectedAlley(matched);
    }

    if (name) setChosenName(name);
  }, [searchParams]);

  const treeData = {
    name: selectedAlley.tree.name,
    desc: selectedAlley.tree.desc,
    src: selectedAlley.tree.img,
    latin: selectedAlley.tree.latin,
    button1: "Посадити дерево",
  };

  const handleAlleyChange = (newAlleyTitle: string) => {
    const matched = AlleyData.find((a) => a.title === newAlleyTitle);
    if (matched) setSelectedAlley(matched);
  };

  return (
    <main>
      <section className="plantTree">
        <div className="container" style={{ display: 'flex' }}>
          <AnimatedOnScroll animationClass="fade-sides">
            <div className="row">
              <TreeVertical {...treeData} />
              <PlantTreeForm
                handleAlleyChange={handleAlleyChange}
                chosenName={chosenName}
                chosenAlley={selectedAlley.tree.name}
              />
            </div>
          </AnimatedOnScroll>
        </div>
      </section>
    </main>
  );
}
