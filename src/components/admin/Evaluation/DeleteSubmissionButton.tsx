import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const DeleteSubmissionButton = () => {
  // const store = useStore();
  // let [disabled, set_disabled] = useState(false);

  // const router = useRouter();

  // async function onClick() {
  //   set_disabled(true);

  //   let res = await store.deleteSubmission(evaluation, submission);
  //   if (res instanceof Error) {
  //     console.error('Failed to delete evaluation', res);
  //     return;
  //   }

  //   router.push(`/evaluation/${evaluation.id}`);
  // }

  return (
    <div></div>
    // <Button disabled={disabled} className='' variant="contained" onClick={() => onClick()}>Delete</Button>
  );
};

export default DeleteSubmissionButton;
