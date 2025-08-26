export function buildUTM(url: string, params: Record<string,string>) {
  const q = new URLSearchParams(params);
  return `${url}${url.includes('?') ? '&' : '?'}${q.toString()}`;
}
