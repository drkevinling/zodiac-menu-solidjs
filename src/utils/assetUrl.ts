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
