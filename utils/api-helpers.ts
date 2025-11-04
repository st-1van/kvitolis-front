// utils/api-helpers.ts
// Базові хелпери для Strapi URL / media.
// Єдиний джерело правди для базових URL та побудови абсолютного шляху до медіа.

export function getStrapiURL(path = ""): string {
  const base = process.env.NEXT_PUBLIC_STRAPI_API_URL || process.env.STRAPI_URL || "http://localhost:1337";
  // ensure no double slash
  return `${base.replace(/\/$/, "")}${path.startsWith("/") ? "" : path ? `/${path}` : ""}`;
}

/** Повертає повний URL до медіа; якщо url вже абсолютний — повертає як є */
export function getStrapiMedia(url: string | null): string | null {
  if (url == null) return null;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${getStrapiURL()}${url.startsWith("/") ? "" : "/"}${url}`;
}

/** Форматування дати (helper) */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

/**
 * getImageUrl:
 * - використовує NEXT_PUBLIC_STRAPI_MEDIA_URL якщо задано (може бути CDN)
 * - інакше будує через getStrapiMedia
 */
export function getImageUrl(relativePath: string | null | undefined): string | null {
  if (!relativePath) return null;
  if (relativePath.startsWith("http") || relativePath.startsWith("//")) return relativePath;
  const mediaBase = process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL;
  if (mediaBase) {
    return `${mediaBase.replace(/\/$/, "")}${relativePath.startsWith("/") ? "" : "/"}${relativePath}`;
  }
  return getStrapiMedia(relativePath);
}