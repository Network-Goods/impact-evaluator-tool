export function returnLocalTime(date: string) {
  const localTime = new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZoneName: "short",
  });
  return localTime;
}

export function returnLocalDate(date: string) {
  const localDate = new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return localDate.slice(6, 10) + "." + localDate.slice(0, 2) + "." + localDate.slice(3, 5);
}

export function filterSubmissions(search: string, submissions: any) {
  return submissions.filter((val: any) => {
    if (search === "") {
      return val;
    } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
      return val;
    }
  });
}
