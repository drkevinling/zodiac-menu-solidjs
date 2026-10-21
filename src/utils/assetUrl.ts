// `/images/*` is cached `immutable` for a year (see vercel.json). Production
// already requests `?v=0.1.1`, so replacing bytes at `/images/1.webp` would
// leave returning visitors on the old photo. A menu photo change has to ship
// under a new filename. This query does not bust a URL that is already cached.
const ASSET_VERSION = import.meta.env.VITE_ASSET_VERSION ?? '1';

export function assetUrl(path: string): string {
  if (!path.startsWith('/')) {
    return path;
  }

  const [pathname, existingQuery = ''] = path.split('?');
  const params = new URLSearchParams(existingQuery);
  params.set('v', ASSET_VERSION);

  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}
