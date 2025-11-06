// lib/strapi.ts
// Типізований fetch wrapper для Strapi v5 з таймаутом/ретраями.
// Використовує utils/api-helpers як single source of truth для побудови URL медіа.

import { getImageUrl as getImageUrlFromHelpers } from "@/utils/api-helpers";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || process.env.STRAPI_URL || "";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || "";

/** Типи для query-серіалізатора */
type Primitive = string | number | boolean | null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type QueryValue = Primitive | Record<string, any> | QueryValue[];
type QueryObject = Record<string, QueryValue>;

function buildQueryParams(obj: QueryObject, prefix = ""): string[] {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const pref = prefix ? `${prefix}[${encodeURIComponent(key)}]` : encodeURIComponent(key);
    if (value === null || value === undefined) continue;
    if (Array.isArray(value)) {
      value.forEach((v, i) => {
        if (v === null || v === undefined) return;
        if (typeof v === "object") parts.push(...buildQueryParams(v as QueryObject, `${pref}[${i}]`));
        else parts.push(`${pref}[${i}]=${encodeURIComponent(String(v))}`);
      });
    } else if (typeof value === "object") {
      parts.push(...buildQueryParams(value as QueryObject, pref));
    } else {
      parts.push(`${pref}=${encodeURIComponent(String(value))}`);
    }
  }
  return parts;
}

function serializeQuery(query?: string | QueryObject): string {
  if (!query) return "";
  if (typeof query === "string") return query.replace(/^\?/, "");
  return buildQueryParams(query).join("&");
}

export async function fetchAPI<T = unknown>(
  path: string,
  query?: string | QueryObject,
  options: RequestInit & { timeout?: number; retries?: number } = {}
): Promise<T> {
  if (!STRAPI_URL) throw new Error("STRAPI base URL is not set (NEXT_PUBLIC_STRAPI_API_URL or STRAPI_URL)");
  const base = STRAPI_URL.replace(/\/$/, "");
  const apiPath = path.startsWith("/") ? path : `/${path}`;
  let url = `${base}/api${apiPath}`;

  const qs = serializeQuery(query);
  if (qs) url += url.includes("?") ? `&${qs}` : `?${qs}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };

  if (STRAPI_TOKEN) {
    headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
  }

  const timeout = options.timeout ?? 10000;
  const retries = Math.max(0, options.retries ?? 0);

  let attempt = 0;
  while (attempt <= retries) {
    attempt++;
    const controller = new AbortController();
    const abortId = setTimeout(() => controller.abort(), timeout);
    try {
      const res = await fetch(url, { ...options, headers, signal: controller.signal } as RequestInit);
      clearTimeout(abortId);
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Strapi fetch failed ${res.status} ${res.statusText} ${text} (url: ${url})`);
      }
      return (await res.json()) as T;
    } catch (err) {
      clearTimeout(abortId);
      const isLast = attempt > retries;
      // eslint-disable-next-line no-console
      console.warn(`fetchAPI attempt ${attempt} failed for ${url}: ${(err as Error)?.message || String(err)} ${isLast ? "(no more retries)" : "(retrying)"}`);
      if (isLast) throw err;
      const backoff = 200 * attempt;
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, backoff));
    }
  }
  throw new Error("fetchAPI: unexpected exit from retry loop");
}

/** Re-export helper for building image URLs */
export function getImageUrl(relativePath?: string | null): string | null {
  return getImageUrlFromHelpers(relativePath ?? null);
}

export default fetchAPI;