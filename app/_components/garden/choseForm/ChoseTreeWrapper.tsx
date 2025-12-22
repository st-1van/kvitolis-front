'use client';

import React, { useCallback, useEffect, useMemo, useState } from "react";
import ChoseTreeForm from "./ChoseTreeForm";
import { AlleyDescriptionVertical } from "../alley/AboutAlley";
import { AlleyItemProps } from "@/app/garden/[alley]/SingleAlleyClient";
import { getImageUrl } from "@/utils/api-helpers";
import { FormProps } from "./ChoseTreeForm";
import { callToActionData } from "../../data/Garden";
import { StepsToBecomeMecenat } from "../../../_components/garden/CallToAction";

export type Person = {
  id: string;
  name: string;
  years?: string;
  free: boolean;
  desc?: string | null;
};

export default function ChoseTreeWrapper(props: {
  // Дані тепер приходять з сервера (page)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  alleyTitleParam: string | null;
  error: string | null;
  queried: boolean;
}) {
  const { data, alleyTitleParam, error, queried } = props;

  // selected alley from received data
  const [selectedAlley, setSelectedAlley] = useState<AlleyItemProps | null>(null);

  // Коли приходять нові дані або змінюється query param — обрати поточну алею
  useEffect(() => {
    if (!Array.isArray(data) || data.length === 0) {
      setSelectedAlley(null);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const aMatches = (item: any) => typeof (item as any).alleyName !== "undefined";

    const matchByQuery =
      alleyTitleParam && (aMatches(data[0]) ? data.find((a) => (a as AlleyItemProps).alleyName === alleyTitleParam) : undefined);

    // fallback: legacy title
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const matchByTitle = alleyTitleParam && data.find((a: any) => (a as any).title === alleyTitleParam);

    const chosen = alleyTitleParam ? (matchByQuery ?? matchByTitle ?? null) : null;

    setSelectedAlley(chosen as AlleyItemProps | null);
  }, [data, alleyTitleParam]);

  // AlleyData for the form
  const AlleyData = useMemo<FormProps["AlleyData"]>(() => {
    return (Array.isArray(data) ? data : []).map((item) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const it: any = item;
      return {
        slug: (it.slug as string) ?? "",
        alleyName: (it.alleyName as string) ?? (it.title as string) ?? "",
      };
    });
  }, [data]);

  const personsList = useMemo<Person[]>(() => {
    if (!selectedAlley) return [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawPeople: any[] = Array.isArray((selectedAlley as any).famousPeople)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? ((selectedAlley as any).famousPeople as any[])
      : [];

    return rawPeople
      .filter((person) => person?.free !== false)
      .map((person) => ({
        id: person?.id != null ? String(person.id) : Math.random().toString(36).slice(2, 9),
        name: person?.name ?? person?.fullName ?? "Unknown",
        years: person?.years ?? person?.life ?? undefined,
        free: typeof person?.free === "string" ? person.free === "true" : !!person?.free,
        desc: person?.desc ?? person?.description ?? "",
      }));
  }, [selectedAlley]);

  const treeData = useMemo(() => {
    if (!selectedAlley) {
      return {
        name: "",
        desc: "",
        src: "",
        latin: "",
        button1: "Посадити дерево",
        price: null as unknown as string | number | null,
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tree: any = (selectedAlley as any).tree ?? {};
    return {
      name: tree.name ?? "",
      desc: tree.desc ?? "",
      src: getImageUrl(tree?.img?.url) ?? "",
      latin: tree.latin ?? "",
      button1: "Посадити дерево",
      price: tree.price ?? "",
    };
  }, [selectedAlley]);

  const handleAlleyChange = useCallback(
    (newAlleyTitle: string) => {
      if (!Array.isArray(data)) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const byName = (data as any[]).find((a: any) => a.alleyName === newAlleyTitle);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const byTitle = (data as any[]).find((a: any) => a.title === newAlleyTitle);

      const matched = (byName as AlleyItemProps) ?? (byTitle as AlleyItemProps) ?? null;
      if (matched) setSelectedAlley(matched);
    },
    [data]
  );

  const chosenAlleySafe: string = selectedAlley
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (((selectedAlley as any).title as string) ?? ((selectedAlley as any).alleyName as string) ?? "")
    : "";

  return (
    <main>
      <section className="plantTree">
        <div className="container">
          {/* Лоадера більше немає (дані вже з сервера). Якщо потрібен — можна передати прапор з page */}
          {error ? (
            <div style={{ color: "red" }}>Error: {error}</div>
          ) : (
            <div className="row">
              {!selectedAlley ? (
                <div className="steps-container container grey">
                  <div className="steps-content">
                    <StepsToBecomeMecenat {...callToActionData} />
                  </div>
                </div>
              ) : (
                <AlleyDescriptionVertical
                  treeData={treeData}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  alleyName={((selectedAlley as any).title as string) ?? ((selectedAlley as any).alleyName as string) ?? ""}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  alleyDesc={((selectedAlley as any).desc as string) ?? ""}
                />
              )}
              <ChoseTreeForm
                AlleyData={AlleyData}
                personsList={personsList}
                handleAlleyChange={handleAlleyChange}
                chosenAlley={chosenAlleySafe}
                queried={queried}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}