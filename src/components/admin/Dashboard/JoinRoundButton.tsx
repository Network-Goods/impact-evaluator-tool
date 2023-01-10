import Add from "public/images/svg/Add";
import Button from "src/components/Button";

const JoinRoundButton = () => {
  return (
    <div>
      <Button
        secondary
        text="Join Round"
        icon={<Add className="mb-1 fill-[#898888]" />}
        onClick={() => console.log("Join Round")}
      />
    </div>
  );
};

export default JoinRoundButton;
