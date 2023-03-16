export function returnTime(date: string | null) {
  if (date === null) {
    return;
  }
  const time = new Date(date).toUTCString();
  return time.slice(17, 22) + " UTC";
}

export function returnDate(date: string | null) {
  if (date === null) {
    return;
  }
  const fullDate = new Date(date);
  return fullDate.getUTCFullYear() + "." + (Number(fullDate.getUTCMonth()) + 1) + "." + fullDate.getUTCDate();
}

export function filterSubmissions(search: string, submissions: any) {
  return submissions
    .filter((sub: any) => sub.is_submitted === true)
    .filter((val: any) => {
      if (search === "") {
        return val;
      } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
        return val;
      }
    });
}

export function parseEvaluationResults(results: any) {
  const output = [];
  const headerArr: (string | number)[] = ["github_handle"];
  results.submissions.forEach(function (submission: any, idx: number) {
    headerArr.push(submission.name);
  });
  headerArr.push("credits_used");
  headerArr.push("voice_credits");
  output.push(headerArr);

  results.evaluators.forEach(function (evaluator: any, i: number) {
    const evalArr: (string | number)[] = [];

    output.push(evalArr);
    evalArr.push(evaluator.github_handle);
    let creditsUsed = 0;
    results.submissions.forEach(function (submission: any, j: number) {
      let votes = 0;
      results.votes.forEach(function (vote: any, j: number) {
        if (vote.evaluator_id === evaluator.evaluator_id && vote.submission_id === submission.id) {
          votes = vote.votes;
        }
      });
      creditsUsed += votes * votes;
      evalArr.push(votes);
    });
    evalArr.push(creditsUsed);
    evalArr.push(evaluator.voice_credits);
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

export function downloadCSV(data: any, csvName: string) {
  const blob = new Blob([data], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", csvName);
  a.click();
}

export function submissionFormCustomFieldsCheck(formInputs: any, submission_id: string | string[] | undefined) {
  let completed = true;
  formInputs.evaluation_field.map((field: any) => {
    field.submission_field.map((subfield: any) => {
      if (subfield.submission_id === submission_id && subfield.field_body === "") {
        completed = false;
      }
    });
  });
  return completed;
}
