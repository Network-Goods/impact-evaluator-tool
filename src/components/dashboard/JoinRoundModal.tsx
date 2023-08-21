import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Close from "public/images/svg/Close";
import { useUserProfileStore } from "src/lib/UserProfileStore";
import { rpc, isError } from "src/lib";
import { trpc } from "src/lib/trpc";
import { useRouter } from "next/router";

const style = {
  position: "absolute",

  bgcolor: "white",
  boxShadow: 24,
  py: 2,
  pl: 8,
  pr: 2,
  borderRadius: "9.31292px",
};

interface FormInputs {
  code: string;
  email: string;
}

type JoinRoundModalProps = {
  handleClose: () => void;
  open: boolean;
};

const JoinRoundModal = ({ handleClose, open }: JoinRoundModalProps) => {
  const session = useSession();
  const userProfileStore = useUserProfileStore();
  const router = useRouter();

  const githubEmail = session?.user.email || "";
  const [error, setError] = useState("");
  const [isGithubEmailChecked, setIsGithubEmailChecked] = useState(true);
  const [formInputs, setFormInputs] = useState<FormInputs>({
    code: "",
    email: isGithubEmailChecked ? githubEmail : "",
  });

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: keyof FormInputs) => {
    const value = event.target.value;
    setFormInputs((values: FormInputs) => ({ ...values, [fieldName]: value }));
  };

  const handleChecked = () => {
    const email = !isGithubEmailChecked ? githubEmail : "";
    setIsGithubEmailChecked((prev) => !prev);
    setFormInputs((values: FormInputs) => ({ ...values, email: email }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: this should never execute, need improve guarentees and fudge typechecking
    if (!userProfileStore.profile) {
      return;
    }

    // TODO: add correct type for errors
    const data = await trpc().user.joinWithCode.mutate({
      user_id: userProfileStore.profile.id!,
      code: formInputs.code,
      preferred_email: formInputs.email,
    });

    if (isError(data)) {
      setError(data.error);
      return;
    }

    if (data && data.submission) {
      router.push(`/evaluation/${data.evaluationID}/submission/${data.submission.id}`);
    } else {
      window.location.replace("/");
    }
  };

  const isJoinButtonDisabled = !formInputs.code && (isGithubEmailChecked ? !githubEmail : !formInputs.email);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={style}
          className="translate-x-[-5%] md:-translate-x-1/2 -translate-y-1/2 top-[40%] left-[10%] md:left-1/2 md:w-[739px]"
        >
          <div className="flex justify-between items-center text-offblack">
            <h1 className="text-[28px] text-blue-alt font-semibold">Join an Impact Evaluator Round</h1>

            <button
              onClick={handleClose}
              className="p-6 text-offblack hover:text-[#979797] transition-colors duration-200 ease-in-out transform"
            >
              <Close className="fill-current" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col max-w-xl text-offblack">
            <label className="my-2" htmlFor="code">
              Enter the unique round code:
              <input
                className="appearance-none border border-gray rounded-lg w-full py-2 px-3 mt-3 font-medium focus:outline-none"
                type="text"
                value={formInputs.code}
                onChange={(e) => handleFormChange(e, "code")}
              />
            </label>
            <label className="mt-2 flex flex-col" htmlFor="emailCheck">
              Email address:
              <br />
              <p className="text-sm text-[#979797]">
                Emails are used by round administrators to share details about the Impact Evaluator.
              </p>
              <div className="flex mt-2">
                <input
                  className=" text-[#E5E7EB] border-[#E5E7EB] rounded-lg"
                  type="checkbox"
                  checked={isGithubEmailChecked}
                  onChange={() => handleChecked()}
                />{" "}
                <span className="ml-2">Use email from Github account.</span>
              </div>
            </label>

            <label className="mb-2 text-sm" htmlFor="email">
              <p className="text-[#979797] my-2">or</p>
              Enter email:
              <input
                className="text-base appearance-none border border-gray rounded-lg w-full py-2 px-3 mt-1 font-medium focus:outline-none disabled:text-gray"
                type="text"
                value={formInputs.email}
                onChange={(e) => handleFormChange(e, "email")}
                disabled={isGithubEmailChecked}
              />
            </label>
            {error ? <span className="text-red text-center">{error}</span> : null}
            <input
              className={`transition-colors duration-200 ease-in-out transform outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto
                px-6 py-1 border border-blue bg-blue text-white text-lg ${error ? "mt-2 mb-8" : "my-8"} ${
                isJoinButtonDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:bg-blue-darkest hover:border-blue-darkest"
              }`}
              type="submit"
              value="Join"
              disabled={isJoinButtonDisabled}
            />
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default JoinRoundModal;
