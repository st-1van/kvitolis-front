"use client";
// import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MasonryBlock } from "./MasonaryBlock";

type AlleyItemProps = {
  title: string;
  tree: string;
  alleyImg: string;
  slug: string;
};

type AlleysDataProps = {
  alleysData: AlleyItemProps[];
};

export default function Alleys({ alleysData }: AlleysDataProps) {

  return (
    <section className="alleys">
      <div className="container">
        <div className="alleys__headline row">
          <div className="col">
            <p>12 алей</p>
            <h2>Алеї українства</h2>
          </div>
          <div className="col col-sm">
            <p>
              Кожна алея парку висаджена одним типом дерев і присвячена певній тематиці і на своєму
              шляху розповідає про видатних українських постатей цього напрямку.
            </p>
          </div>
        </div>
        <MasonryBlock data={alleysData} Card={AlleyCard} />
      </div>
    </section>
  );
}

function AlleyCard({ title, alleyImg, slug}: AlleyItemProps) {
  return (
    <div className="alley col">
      <Link href={`/garden/${slug}`}>
        {alleyImg && <Image className="alley__img" src={alleyImg} alt={title} width={394} height={400} />}
        <p className="alley__name">{title}</p>
      </Link>
    </div>
  );
}
