export function formatDueDate(dateString: string) {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formatter.format(date);
}

export function formatFullDate(dateString: string) {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "long",
    timeStyle: "short",
  });
  return formatter.format(date);
}
