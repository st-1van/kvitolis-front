'use client';

import PlantTreeForm from "@/app/_components/garden/alley/PlantTreeForm";
import { TreeVertical } from "@/app/_components/garden/alley/TreeDescription";
import { useSearchParams } from "next/navigation";
import { AlleyData } from "@/app/_components/data/AlleyData";
import { useState, useEffect } from "react";

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
          <div className="row">
            <TreeVertical {...treeData} />
            <PlantTreeForm
              handleAlleyChange={handleAlleyChange}
              chosenName={chosenName}
              chosenAlley={selectedAlley.tree.name}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
