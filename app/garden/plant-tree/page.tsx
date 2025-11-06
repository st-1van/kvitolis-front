import React from "react";
import PlantTreeClient from "./PlantTreeClient";
// Використовую той самий helper, що й у ChoseTreeWrapper
import { fetchAPI } from "../../../utils/fetch-api";

type Search = Record<string, string | string[] | undefined>;

export default async function Page(props: {
  searchParams?: Promise<Search>;
}) {
  // Next 15: searchParams можуть бути Promise
  const sp = props.searchParams ? await props.searchParams : undefined;

  // Дістаємо alleyName з query (?alleyName=...)
  let alleyTitleParam: string | null = null;
  if (sp && typeof sp.alleyName === "string") {
    alleyTitleParam = sp.alleyName;
  } else if (sp && Array.isArray(sp.alleyName) && sp.alleyName.length > 0) {
    alleyTitleParam = sp.alleyName[0] ?? null;
  }

  let data: unknown[] = [];
  let error: string | null = null;

  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/alleys-col`;

    const urlParamsObject = {
      filters: { alleyName: alleyTitleParam || { $notNull: true } },
      populate: {
        tree: { populate: ["img"] },
        famousPeople: true,
      },
    };

    const options: RequestInit = {
      headers: { Authorization: `Bearer ${token}` },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const responseData: any = await fetchAPI(path, urlParamsObject, options);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const safeData: any[] = Array.isArray(responseData?.data) ? responseData.data : [];
    data = safeData;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("PlantTree page fetch error:", err);
    error = err?.message ?? "Unknown error";
  }

  // Передаємо дані і параметр запиту в клієнтський компонент
  return (
    <PlantTreeClient
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data={data as any[]}
      alleyTitleParam={alleyTitleParam}
      error={error}
      queried={alleyTitleParam !== null}
    />
  );
}