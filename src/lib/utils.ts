export function returnTime(date: Date | null) {
  if (date === null) {
    return;
  }
  const time = new Date(date).toUTCString();
  return time.slice(17, 22) + " UTC";
}

export function returnDate(date: Date | null) {
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
  const submissions = results.submissions.filter((sub: any) => sub.is_submitted == true);

  submissions.forEach(function (submission: any, idx: number) {
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
    submissions.forEach(function (submission: any, j: number) {
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

export function parseSubmissions(submissions: any) {
  submissions = submissions.filter((sub: any) => sub.is_submitted == true);
  submissions.sort((a: any, b: any) => a.project_name.toLowerCase().localeCompare(b.project_name.toLowerCase()));

  // submission.name as project_name,
  // "user".github_handle as submitter_github,
  // "user".preferred_email as submitter_email,
  // submission.github_handle as representative_github,
  // description->>'summary' as summary,
  // description->>'description' as description,
  // description->>'specs' as specs,

  if (submissions.length == 0) {
    return [];
  }

  const output = [];
  const headerArr: (string | number)[] = [
    "project_name",
    "submitter_github",
    "submitter_email",
    "representative_github",
    "github_link",
    "links",
    "contract_id",
  ];

  submissions[0].fields.sort((a: any, b: any) => a.field_order - b.field_order);
  for (const field of submissions[0].fields) {
    headerArr.push(field.heading);
  }

  output.push(headerArr);

  for (const submission of submissions) {
    const submissionArr: (string | number)[] = [];
    submissionArr.push(submission.project_name);
    submissionArr.push(submission.submitter_github);
    submissionArr.push(submission.submitter_email);
    submissionArr.push(submission.representative_github);
    submissionArr.push(submission.github_link);
    submissionArr.push(submission.links);
    submissionArr.push(submission.contract_id || "");

    submission.fields.sort((a: any, b: any) => a.field_order - b.field_order);

    for (const field of submission.fields) {
      submissionArr.push(field.field_body);
    }

    output.push(submissionArr);
  }

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
    const r = [];
    for (let a of row) {
      let strValue = String(a);
      r.push(`"${strValue.split('"').join('""')}"`);
    }
    csv += r.join(",");
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
