export function returnLocalTime(date: string) {
  const localDate = new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return localDate.slice(6, 10) + "." + localDate.slice(0, 2) + "." + localDate.slice(3, 5);
}
