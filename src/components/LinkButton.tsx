import { Button } from "@mui/material";

import { useRouter } from "next/router";
import { useState } from "react";

const LinkButton = ({ text, link }: { text: string; link: string }) => {
  const [disabled, set_disabled] = useState(false);
  const router = useRouter();

  async function onClick() {
    set_disabled(true);

    router.push(link);
    set_disabled(false);
  }

  return (
    <Button
      disabled={disabled}
      className=""
      variant="contained"
      onClick={() => onClick()}
    >
      {text}
    </Button>
  );
};

export default LinkButton;
