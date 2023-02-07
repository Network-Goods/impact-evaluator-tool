import { useState, useEffect } from "react";
import LoadingSpinner from "src/components/shared/LoadingSpinner";
import { useAdminStore } from "../admin/AdminEditDashboard/AdminStore";
import Title from "src/components/shared/Title";
import Link from "next/link";
import LeftArrow from "public/images/svg/LeftArrow";
import SmallTitle from "src/components/shared/SmallTitle";
import Add from "public/images/svg/Add";
import Button from "../shared/Button";

export default function Submission() {
  const [checked, setChecked] = useState(false);
  const [inputs, setInputs] = useState<any>({});
  const [index, setIndex] = useState(0);
  const [newLinks, setNewLinks] = useState<any>([]);

  const store = useAdminStore();

  useEffect(() => {
    store.load();
  }, [store.fetching]);

  const handleChecked = () => {
    setChecked((prev) => !prev);
    // setInputs((values: any) => ({ ...values, email: githubEmail }));
  };

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    if (event.target.name === "summary" || event.target.name === "description" || event.target.name === "specs") {
      setInputs((values: any) => ({ ...values, description: { ...values.description, [name]: value } }));
    } else {
      setInputs((values: any) => ({ ...values, [name]: value }));
    }
  };

  if (store.fetching) return <LoadingSpinner />;
  if (store.error) return <p>Oh no... {store.error.message}</p>;

  return (
    <>
      <div className="pb-14">
        <div className="flex items-center pb-10">
          <div className="hidden md:flex mr-6">
            <Link href="/">
              <div className="rounded-lg bg-gray-light h-12 w-12 flex justify-center items-center">
                <LeftArrow />
              </div>
            </Link>
          </div>
          <div className="flex-1">
            <Title text="Space Warp Round 1" />
          </div>
        </div>

        <h3 className="text-2xl text-blue-alt font-bold">Round Description</h3>
        <div className="text-xl pt-7">
          As part of Space Warp, Community Impact Evaluator rounds will give FVM subject matter experts and builders an
          opportunity to vote on top projects in the community. These Impact Evaluator rounds will empower builders to
          weigh in on the most valuable projects on the FVM and to direct the allocation of a total prize pool up to
          $75k. Results will populate the Builders Leaderboard on the Space Warp website.
        </div>
        <p className="text-xl pt-7">The Impact Evaluator Round 1 will open voting on Wednesday, January 25th.</p>
        <div className="text-xl pt-7">
          To be eligible to receive funds, each submitted project must have the team member vote who submitted this form
          in the Impact Evaluator round and must follow each step in these instructions:
          <ol className="list-decimal ml-6">
            <li>
              Submit project to Impact Evaluator (IE) round using this form before end of day on Monday, January 23rd.{" "}
            </li>
            <li> Register for Protocol Labs' IE voting tool (invitation will be sent as the IE round approaches) </li>
            <li>Vote on projects using Quadratic Voting evaluation method</li>
          </ol>
        </div>
        <p className="text-xl pt-7">With any questions or issues, please email impact-evaluator@protocol.ai.</p>
      </div>
      <div className="hidden md:flex justify-between items-center py-2 px-9 bg-[#f0f0f0] border border-gray rounded-t-lg">
        <div className="py-2">
          <SmallTitle text="SUBMISSION FORM" />
        </div>
      </div>
      <div
        className="flex flex-col md:flex-row justify-between items-center px-24 bg-white border border-gray py-4 md:py-10 rounded-b-lg      
        border-t-0"
      >
        <div className="w-full">
          <div className="mb-9">
            <p className="text-xl font-bold pb-3">Project or Team Title</p>

            <input
              type="text"
              name="name"
              className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
              placeholder="Example Title"
              value={inputs.name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-9">
            <p className="text-xl font-bold">Project Description</p>
            <div className="text-[17px] text-[#898888] py-1">
              Using <b>280 characters</b> or less, describe your project.
            </div>
            <textarea
              className="w-full min-h-[112px] px-4 py-2 rounded-lg border border-gray focus:outline-none"
              placeholder="XYZ is..."
              name="description"
              value={inputs.description?.description || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-9">
            <p className="text-xl font-bold">Progress Summary</p>
            <div className="text-[17px] text-[#898888] py-1">
              Using <b>280 characters</b> or less, describe what your project has accomplished{" "}
              <span className="font-bold italic">in the past 1 month</span>.
            </div>

            <textarea
              className="w-full min-h-[112px] px-4 py-2 rounded-lg border border-gray focus:outline-none"
              placeholder="So far we have..."
              name="summary"
              value={inputs.description?.summary || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-9">
            <p className="text-xl font-bold">FVM Tech Specs</p>
            <div className="text-[17px] text-[#898888] py-1">
              Using <b>360 characters</b> or less, describe your F(E)VM smart contract designs as well as the unique
              value your contracts bring to Filecoin.
            </div>
            <textarea
              className="w-full min-h-[112px] px-4 py-2 rounded-lg border border-gray focus:outline-none"
              placeholder="XYZ utilizes..."
              name="specs"
              value={inputs.description?.specs || ""}
              onChange={handleChange}
            />
          </div>
          <p className="text-xl font-bold pb-3">Links</p>
          <p className="text-[17px] text-blue-alt font-bold pb-1">Github Repo</p>
          <input
            type="text"
            name="github_link"
            className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
            placeholder="https://github.com/protocol/research"
            value={inputs.github_link || ""}
          />
          <div className="pt-7 pb-9">
            <button
              className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold border border-blue hover:bg-white focus:bg-white text-blue text-lg px-4 py-1"
              onClick={() => console.log("add link")}
            >
              <span className="mr-3">
                <Add className="fill-current" />
              </span>

              <span>Add Link</span>
            </button>
          </div>
          <p className="text-xl font-bold pb-3">Evaluator Representation</p>

          <div className="flex mt-2 mb-7">
            <input
              className=" text-[#E5E7EB] border-[#E5E7EB] rounded-lg"
              type="checkbox"
              name="emailCheck"
              checked={checked}
              onChange={() => handleChecked()}
            />{" "}
            <span className="ml-2">I will be evaluating on behalf of this project for the Impact Evaluator round.</span>
          </div>
          <p className="text-[17px] font-bold">GitHub handle for representative:</p>

          {checked ? (
            <input
              className="text-base appearance-none border border-gray rounded-lg w-full py-2 px-3 mt-1 font-medium text-gray focus:outline-none"
              type="text"
              name="email"
              value={"csjohn"}
              // value={githubEmail}
              disabled={true}
            />
          ) : (
            <input
              className="text-base appearance-none border border-gray rounded-lg w-full py-2 px-3 mt-1 font-medium  focus:outline-none"
              type="text"
              name="email"
              value={"csjohn"}
              // value={inputs.email || ""}
              // onChange={handleChange}
            />
          )}

          <div className="flex justify-between mt-14">
            <div>
              <Button small alt text="Cancel" onClick={() => console.log("cancel")} />
            </div>
            <div>
              <button
                onClick={() => console.log("submit")}
                className={`transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto border border-blue bg-blue  text-white text-lg px-3 py-1
                ${
                  false
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:bg-blue-darkest hover:border-blue-darkest"
                }
                `}
                disabled={false}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
