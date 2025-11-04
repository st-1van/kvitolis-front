// lib/strapi.ts
// Централізована fetch-функція та хелпери для Strapi v5 з таймаутом та retry.

import { getStrapiURL, getStrapiMedia, getImageUrl as helperGetImageUrl } from "@/utils/api-helpers";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || process.env.STRAPI_URL || getStrapiURL();
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || '';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type QueryValue = string | number | boolean | null | Record<string, any> | QueryValue[];
type QueryObject = Record<string, QueryValue>;

function buildQueryParams(obj: QueryObject, prefix = ''): string[] {
  const parts: string[] = [];

  Object.entries(obj).forEach(([key, value]) => {
    const pref = prefix ? `${prefix}[${encodeURIComponent(key)}]` : encodeURIComponent(key);

    if (value === null || value === undefined) return;

    if (Array.isArray(value)) {
      value.forEach((v, i) => {
        if (v === null || v === undefined) return;
        if (typeof v === 'object') {
          parts.push(...buildQueryParams(v as QueryObject, `${pref}[${i}]`));
        } else {
          parts.push(`${pref}[${i}]=${encodeURIComponent(String(v))}`);
        }
      });
    } else if (typeof value === 'object') {
      parts.push(...buildQueryParams(value as QueryObject, pref));
    } else {
      parts.push(`${pref}=${encodeURIComponent(String(value))}`);
    }
  });

  return parts;
}

function serializeQuery(query?: string | QueryObject): string {
  if (!query) return '';
  if (typeof query === 'string') return query.replace(/^\?/, '');
  const parts = buildQueryParams(query);
  return parts.join('&');
}

/**
 * fetchWithTimeout + retry
 * options:
 *  - timeout (ms) default 10000
 *  - retries default 1 (no retry). Set 2-3 for retries.
 */
export async function fetchAPI(path: string, query?: string | QueryObject, options: RequestInit & { timeout?: number; retries?: number } = {}) {
  if (!STRAPI_URL) throw new Error("STRAPI base URL is not set (NEXT_PUBLIC_STRAPI_API_URL or STRAPI_URL)");

  const base = STRAPI_URL.replace(/\/$/, '');
  const apiPath = path.startsWith('/') ? path : `/${path}`;
  let url = `${base}/api${apiPath}`;

  const qs = serializeQuery(query);
  if (qs) url += url.includes('?') ? `&${qs}` : `?${qs}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  const timeout = options.timeout ?? 10000; // ms
  const retries = Math.max(0, (options.retries ?? 0));

  let attempt = 0;
  while (attempt <= retries) {
    attempt++;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const res = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      } as RequestInit);

      clearTimeout(id);

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Strapi fetch failed ${res.status} ${res.statusText} ${text} (url: ${url})`);
      }

      return res.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      clearTimeout(id);
      const isLast = attempt > retries;
      // const name = err?.name ?? '';
      // If aborted, name can be 'AbortError' or undici's HeadersTimeoutError with code UND_ERR_HEADERS_TIMEOUT
      // Log and retry if possible
      console.warn(`fetchAPI attempt ${attempt} failed for ${url}: ${err?.message || err} ${isLast ? '(no more retries)' : '(retrying)'}`);

      if (isLast) {
        // rethrow the original error
        throw err;
      }
      // simple backoff before retrying
      const backoff = 200 * attempt;
      await new Promise(r => setTimeout(r, backoff));
      // then loop to retry
    }
  }

  // Should never reach here
  throw new Error('fetchAPI: unexpected exit from retry loop');
}


export { getStrapiURL, getStrapiMedia, helperGetImageUrl as getImageUrlFromHelpers };
export default fetchAPI;