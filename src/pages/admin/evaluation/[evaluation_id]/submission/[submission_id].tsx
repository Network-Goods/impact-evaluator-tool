import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { FC, useState } from "react";

const Home: FC = () => {
  const router = useRouter();
  // const { evaluation_id, submission_id } = router.query;

  // console.log("submission: ", router.query);

  // if (!submissionId) {
  //   console.error("No submission id");
  //   return <div>Error</div>;
  // }

  // if (Array.isArray(submissionId)) {
  //   console.error("submissionId is array");
  //   return <div>Error</div>;
  // }

  // let res = store.findSubmission(submissionId);
  // if (!res) {
  //   console.error("Failed to find submission by id ", submissionId);
  //   return <div>Error</div>;
  // }

  // let [evaluation, submission] = res;

  // const onBlur = (event: any) => {
  //   let value = event.target.value;

  //   setSubmissionName(submission, value);
  // };

  // const onChange = (event: any) => {
  //   submission.name = event.target.value;
  // };

  return (
    <div className="flex flex-col">
      {/* {id}
      <LinkButton text="evaluation" link={`/evaluation/${evaluation_id}`} />
      <div>
        <span className="text-xl">{submission.name}</span>
      </div>

      <div className="flex w-[295px] pb-2">
        <span className="pr-4 leading-8">Title:</span>

        <TextField
          fullWidth
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Your answer"
          variant="standard"
          value={submission.name}
        />
      </div> */}

      {/* <DeleteSubmissionButton evaluation={evaluation} submission={submission} /> */}
    </div>
  );
};

export default Home;
