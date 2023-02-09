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

export function parseEvaluationResults(results: any) {
  let output = [];
  let headerArr: (string | number)[] = ["github_handle"];
  results.submissions.forEach(function (submission: any, idx: number) {
    headerArr.push(submission.name);
  });
  output.push(headerArr);

  results.evaluators.forEach(function (evaluator: any, i: number) {
    let evalArr: (string | number)[] = [];

    output.push(evalArr);
    evalArr.push(evaluator.github_handle);
    results.submissions.forEach(function (submission: any, j: number) {
      let votes = 0;
      results.votes.forEach(function (vote: any, j: number) {
        if (vote.evaluator_id === evaluator.evaluator_id && vote.submission_id === submission.id) {
          votes = vote.votes;
        }
      });
      evalArr.push(votes);
    });
  });
  return output;
}

export function sortEvaluationResults(obj: any) {
  obj.evaluators.sort(function (a: any, b: any) {
    if (a.github_handle < b.github_handle) {
      return -1;
    }
    if (a.github_handle > b.github_handle) {
      return 1;
    }
    return 0;
  });

  obj.submissions.sort(function (a: any, b: any) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
}

export function parseNestedArraysIntoCSV(data: any) {
  let csv = "";
  data.forEach((row: any) => {
      csv += row.join(",");
    csv += "\n";
  });
  return csv;
}

export function downloadCSV(data: any) {
    const blob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "download.csv");
    a.click();
  };