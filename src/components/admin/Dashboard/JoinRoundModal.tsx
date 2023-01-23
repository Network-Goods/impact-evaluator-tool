import { useState } from "react";
import { SupabaseClient, useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Close from "public/images/svg/Close";
import { useUserProfileStore } from "src/lib/UserProfileStore";
import { useRouter } from "next/router";
import { Evaluator } from "src/lib";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 739,
  bgcolor: "white",
  boxShadow: 24,
  py: 2,
  pl: 8,
  pr: 2,
  borderRadius: "9.31292px",
};

type JoinRoundModalProps = {
  handleClose: () => void;
  open: boolean;
};

const JoinRoundModal = ({ handleClose, open }: JoinRoundModalProps) => {
  const [inputs, setInputs] = useState<any>({});
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const session = useSession();
  const supabase = useSupabaseClient();
  const userProfileStore = useUserProfileStore();
  const router = useRouter();

  const githubEmail = session?.user.email;

  async function joinRoundWithCode(
    supabase: SupabaseClient,
    user_id: string,
    code: string,
    preffered_email: string,
  ): Promise<Evaluator | void> {
    const { data, error } = await supabase.rpc("join_with_code", {
      in_user_id: user_id,
      in_code: code,
      in_preffered_email: preffered_email,
    });

    if (error) {
      console.error("Failed to join round", error);
      if (error.code === "P0001") {
        setError("You have already joined this round");
      }
      return;
    }

    if (!data) {
      console.error("joinRoundWithCode returned no data");
      return;
    }

    return data as any;
  }

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values: any) => ({ ...values, [name]: value }));
  };

  const handleChecked = () => {
    setChecked((prev) => !prev);
    setInputs((values: any) => ({ ...values, email: githubEmail }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userProfileStore.profile) {
      const evaluator = await joinRoundWithCode(supabase, userProfileStore.profile.id!, inputs.code, inputs.email);

      if (!evaluator) {
        return;
      }

      router.push(`/evaluation/${evaluator.evaluation_id}`);
    }
  };

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
        <Box sx={style}>
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
                name="code"
                value={inputs.code || ""}
                onChange={handleChange}
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
                  name="emailCheck"
                  checked={checked}
                  onChange={() => handleChecked()}
                />{" "}
                <span className="ml-2">Use email from Github account.</span>
              </div>
            </label>

            <label className="mb-2 text-sm" htmlFor="email">
              <p className="text-[#979797] my-2">or</p>
              Enter email:
              {checked ? (
                <input
                  className="text-base appearance-none border border-gray rounded-lg w-full py-2 px-3 mt-1 font-medium text-gray focus:outline-none"
                  type="text"
                  name="email"
                  value={githubEmail}
                  disabled={true}
                />
              ) : (
                <input
                  className="text-base appearance-none border border-gray rounded-lg w-full py-2 px-3 mt-1 font-medium  focus:outline-none"
                  type="text"
                  name="email"
                  value={inputs.email || ""}
                  onChange={handleChange}
                />
              )}
            </label>
            {error ? <span className="text-red text-center">{error}</span> : null}
            <input
              className={`transition-colors duration-200 ease-in-out transform outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto
                px-6 py-1 border border-blue bg-blue text-white text-lg ${error ? "mt-2 mb-8" : "my-8"} ${
                inputs.code && inputs.email
                  ? "cursor-pointer hover:bg-blue-darkest hover:border-blue-darkest"
                  : "opacity-50 cursor-not-allowed"
              }`}
              type="submit"
              value="Join"
              disabled={inputs.code && inputs.email ? false : true}
            />
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default JoinRoundModal;
