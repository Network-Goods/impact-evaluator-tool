import { useRouter } from "next/router";
import { useState } from "react";
import Button from "./Button";

const LinkButton = ({
  text,
  link,
  small,
}: {
  text: string;
  link: string;
  small?: boolean;
}) => {
  const [disabled, set_disabled] = useState(false);
  const router = useRouter();

  async function onClick() {
    set_disabled(true);

    router.push(link);
    set_disabled(false);
  }

  return (
    <Button
      small={small}
      text={text}
      disabled={disabled}
      onClick={() => onClick()}
    />
  );
};

export default LinkButton;
