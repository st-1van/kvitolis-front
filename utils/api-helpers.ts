// utils/api-helpers.ts

export function getStrapiURL(path = ""): string {
  const base = process.env.NEXT_PUBLIC_STRAPI_API_URL || process.env.STRAPI_URL || "http://localhost:1337";
  const normalizedBase = base.replace(/\/$/, "");
  if (!path) return normalizedBase;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

/**
 * Повертає повний URL до медіа.
 * Підтримує формати:
 *  - абсолютний з протоколом: https://... -> повертаємо як є
 *  - protocol-relative: //cdn.example.com/... -> додаємо 'https:' перед ним
 *  - абсолютний без протоколу: cdn.example.com/... -> додаємо 'https://' (безпечний default)
 *  - відносний: /uploads/... -> додаємо базовий Strapi URL (NEXT_PUBLIC_STRAPI_API_URL)
 *
 * Повертає null якщо url == null або порожній.
 */
export function getStrapiMedia(url: string | null | undefined): string | null {
  if (!url) return null;

  const trimmed = String(url).trim();

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  if (trimmed.startsWith("//")) {
    // protocol-relative -> default to https
    return `https:${trimmed}`;
  }

  // If looks like host without protocol (e.g. "media.strapiapp.com/uploads/..")
  // add https:// by default
  if (/^[a-z0-9.-]+\//i.test(trimmed) && !trimmed.startsWith("/")) {
    return `https://${trimmed}`;
  }

  // Otherwise treat as relative path and prepend Strapi base URL
  return getStrapiURL(trimmed);
}

/**
 * getImageUrl:
 * - якщо задався NEXT_PUBLIC_STRAPI_MEDIA_URL (наприклад CDN), використовуємо його як базу
 * - інакше використовуємо getStrapiMedia
 */
export function getImageUrl(relativePath: string | null | undefined): string | null {
  if (!relativePath) return null;
  const trimmed = String(relativePath).trim();
  // Already absolute?
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("//")) {
    if (trimmed.startsWith("//")) return `https:${trimmed}`;
    return trimmed;
  }

  const mediaBase = process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL;
  if (mediaBase) {
    const base = mediaBase.replace(/\/$/, "");
    return `${base}${trimmed.startsWith("/") ? "" : "/"}${trimmed}`;
  }

  return getStrapiMedia(trimmed);
}