import { useState } from "react";
import Add from "public/images/svg/Add";
import Button from "src/components/Button";
import JoinRoundModal from "./JoinRoundModal";

const JoinRoundButton = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        secondary
        text="Join Round"
        icon={<Add className="mb-1 fill-[#898888]" />}
        onClick={handleOpen}
      />
      <JoinRoundModal handleClose={handleClose} open={open} />
    </div>
  );
};

export default JoinRoundButton;
