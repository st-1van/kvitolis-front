'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ChoseTreeForm from "./ChoseTreeForm";
import { useSearchParams } from "next/navigation";
import { AlleyDescriptionVertical } from "../alley/AboutAlley";
import { fetchAPI } from "../../../../utils/fetch-api";
import { CircularProgress } from "@mui/material";
import { AlleyItemProps } from "@/app/garden/[alley]/page";
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

export default function ChoseTreeWrapper() {
  const searchParams = useSearchParams();
  const alleyTitleParam = searchParams.get("alleyName") ?? null;

  const [data, setData] = useState<AlleyItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // selected alley from fetched data (or null until available)
  const [selectedAlley, setSelectedAlley] = useState<AlleyItemProps | null>(null);

  // mounted ref to avoid setState after unmount
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Fetch data (cancels on unmount / param change)
  const fetchData = useCallback(
    async (signal?: AbortSignal) => {
      setIsLoading(true);
      setError(null);

      try {
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        const path = `/alleys-col`;

        const urlParamsObject = {
          filters: { alleyName: alleyTitleParam || { $notNull: true } },
          populate: {
            tree: {
              populate: ["img"],
            },
            famousPeople: true,
          },
        };

        const options: RequestInit = {
          headers: { Authorization: `Bearer ${token}` },
          signal,
        };

        const responseData = await fetchAPI(path, urlParamsObject, options);
        const safeData = Array.isArray(responseData?.data) ? responseData.data : [];

        if (!mountedRef.current) return;
        setData(safeData);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err?.name === "AbortError") {
          // request was cancelled, ignore
          return;
        }
        console.error(err);
        if (!mountedRef.current) return;
        setError(err?.message ?? "Unknown error");
      } finally {
        if (!mountedRef.current) return;
        setIsLoading(false);
      }
    },
    [alleyTitleParam]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData]);

  // When data or query param changes, pick the selected alley from fetched data.
  useEffect(() => {
    if (!Array.isArray(data) || data.length === 0) {
      setSelectedAlley(null);
      return;
    }

    // prefer matching alleyName or title fields depending on API / legacy
    const matchByQuery =
      alleyTitleParam &&
      (aMatches(data[0]) ? data.find((a) => a.alleyName === alleyTitleParam) : undefined);

    // fallback: try title (legacy)
    const matchByTitle =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      alleyTitleParam && data.find((a) => (a as any).title === alleyTitleParam);

    // If there's a specific query, use matched; otherwise use first item
    const chosen = alleyTitleParam ? (matchByQuery ?? matchByTitle ?? null) : null;

    setSelectedAlley(chosen as AlleyItemProps | null);

    function aMatches(item: AlleyItemProps) {
      // helper to check if AlleyItemProps has alleyName property
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return typeof (item as any).alleyName !== "undefined";
    }
  }, [data, alleyTitleParam]);

  // AlleyData for the form: safe mapping (no undefined alleyName)
  const AlleyData = useMemo<FormProps["AlleyData"]>(() => {
    return data.map(({ slug, alleyName }) => ({
      slug: slug ?? "",
      alleyName: alleyName ?? "",
    }));
  }, [data]);

  // Derived list of persons from the selected alley (normalized)
  const personsList = useMemo<Person[]>(() => {
    if (!selectedAlley) return [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawPeople: any[] = Array.isArray((selectedAlley as any).famousPeople)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? (selectedAlley as any).famousPeople
      : [];

    return rawPeople
      .filter((person) => person?.free !== false) // keep when free not explicitly false
      .map((person) => ({
        id: person?.id != null ? String(person.id) : Math.random().toString(36).slice(2, 9),
        name: person?.name ?? person?.fullName ?? "Unknown",
        years: person?.years ?? person?.life ?? undefined,
        free:
          typeof person?.free === "string" ? person.free === "true" : !!person?.free,
        desc: person?.desc ?? person?.description ?? "",
      }));
  }, [selectedAlley]);

  // Tree data mapping for AlleyDescriptionVertical
  const treeData = useMemo(() => {
    if (!selectedAlley) {
      return {
        name: "",
        desc: "",
        src: "",
        latin: "",
        button1: "Посадити дерево",
        price: null,
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tree = (selectedAlley as any).tree ?? {};
    return {
      name: tree.name ?? "",
      desc: tree.desc ?? "",
      src: getImageUrl(tree?.img?.url) ?? "",
      latin: tree.latin ?? "",
      button1: "Посадити дерево",
      price: tree.price ?? "",
    };
  }, [selectedAlley]);

  // handler to change alley based on selection from form (keeps using fetched data)
  const handleAlleyChange = useCallback(
    (newAlleyTitle: string) => {
      if (!Array.isArray(data)) return;

      // try to find by alleyName or legacy title
      const matched =
        data.find((a) => a.alleyName === newAlleyTitle) ??
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.find((a: any) => a.title === newAlleyTitle);

      if (matched) {
        setSelectedAlley(matched);
      }
    },
    [data]
  );

  // Safe chosenAlley string to avoid accessing selectedAlley when null (prevents render-time exception)
  const chosenAlleySafe: string = selectedAlley
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((selectedAlley as any).title ?? (selectedAlley as any).alleyName ?? "")
    : "";


  console.log('selectedAlley:', selectedAlley);
  console.log('safe chosenAlleySafe:', chosenAlleySafe);
  return (
    <main>
      <section className="plantTree">
        <div className="container">
          {isLoading ? (
            <div style={{ width: "100%", textAlign: "center", padding: 40 }}>
              <CircularProgress />
            </div>
          ) : error ? (
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
                  alleyName={(selectedAlley as any).title ?? (selectedAlley as any).alleyName ?? ""}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  alleyDesc={(selectedAlley as any).desc ?? ""}
                />
              )}
              <ChoseTreeForm
                AlleyData={AlleyData}
                handleAlleyChange={handleAlleyChange}
                chosenAlley={chosenAlleySafe}
                personsList={personsList}
                queried={alleyTitleParam !== null}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
