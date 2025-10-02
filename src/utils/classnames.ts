export function classnames(...args: string[]) {
  const set = new Set(args);
  return Array.from(set).join(" ");
}
