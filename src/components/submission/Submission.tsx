import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import LoadingSpinner from "src/components/shared/LoadingSpinner";
import { useSubmissionStore } from "./SubmissionStore";
import Title from "src/components/shared/Title";
import Link from "next/link";
import LeftArrow from "public/images/svg/LeftArrow";
import SmallTitle from "src/components/shared/SmallTitle";
import Add from "public/images/svg/Add";
import Button from "../shared/Button";
import Delete from "public/images/svg/Delete";

export default function Submission() {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const summaryRef = useRef<HTMLTextAreaElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const specsRef = useRef<HTMLTextAreaElement | null>(null);
  const githubLinkRef = useRef<HTMLInputElement | null>(null);
  const githubHandleRef = useRef<HTMLInputElement | null>(null);
  const [checked, setChecked] = useState(true);
  const [inputs, setInputs] = useState<any>({});
  const [index, setIndex] = useState(0);
  const [newLinks, setNewLinks] = useState<any>([]);
  const router = useRouter();
  const { submission_id } = router.query;
  const store = useSubmissionStore();

  const [titleState, setTitleState] = useState(store.submission?.name);
  const [links, setLinks] = useState<any>(store.submission?.links || []);
  const [githubLink, setGithubLink] = useState<any>(store.submission?.github_link);
  const [githubHandle, setGithubHandle] = useState<any>(store.submission?.github_link);
  const [summary, setSummary] = useState<any>(store.submission?.description.summary);
  const [description, setDescription] = useState<any>(store.submission?.description.description);
  const [specs, setSpecs] = useState<any>(store.submission?.description.specs);

  // useEffect(() => {
  //   if (!submission_id || Array.isArray(submission_id)) {
  //     return;
  //   }
  //   store.load(submission_id);
  // }, [submission_id, store.fetching]);

  const handleChecked = () => {
    setChecked((prev) => !prev);
    // setInputs((values: any) => ({ ...values, email: githubEmail }));
  };

  useEffect(() => {
    setTitleState(store.submission?.name);
    setLinks(store.submission?.links);
    setGithubLink(store.submission?.github_link);
    setGithubHandle(store.submission?.github_handle);
    setSummary(store.submission?.description.summary);
    setDescription(store.submission?.description.description);
    setSpecs(store.submission?.description.specs);
  }, [store.submission]);

  // if (store.fetching) return <LoadingSpinner />;
  // if (store.error) return <p>Oh no... {store.error.message}</p>;

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
              ref={nameRef}
              type="text"
              name="name"
              className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
              placeholder="Example Title"
              value={titleState || ""}
              onChange={(e) => setTitleState(e.target.value)}
              onBlur={(e) => store.setSubmissionTitle(e.target.value)}
            />
          </div>
          <div className="mb-9">
            <p className="text-xl font-bold">Project Description</p>
            <div className="text-[17px] text-[#898888] py-1">
              Using <b>280 characters</b> or less, describe your project.
            </div>
            <textarea
              ref={descriptionRef}
              className="w-full min-h-[112px] px-4 py-2 rounded-lg border border-gray focus:outline-none"
              placeholder="XYZ is..."
              name="description"
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={(e) => store.setSubmissionDescription("description", e.target.value)}
            />
          </div>
          <div className="mb-9">
            <p className="text-xl font-bold">Progress Summary</p>
            <div className="text-[17px] text-[#898888] py-1">
              Using <b>280 characters</b> or less, describe what your project has accomplished{" "}
              <span className="font-bold italic">in the past 1 month</span>.
            </div>

            <textarea
              ref={summaryRef}
              className="w-full min-h-[112px] px-4 py-2 rounded-lg border border-gray focus:outline-none"
              placeholder="So far we have..."
              name="summary"
              value={summary || ""}
              onChange={(e) => setSummary(e.target.value)}
              onBlur={(e) => store.setSubmissionDescription("summary", e.target.value)}
            />
          </div>
          <div className="mb-9">
            <p className="text-xl font-bold">FVM Tech Specs</p>
            <div className="text-[17px] text-[#898888] py-1">
              Using <b>360 characters</b> or less, describe your F(E)VM smart contract designs as well as the unique
              value your contracts bring to Filecoin.
            </div>
            <textarea
              ref={specsRef}
              className="w-full min-h-[112px] px-4 py-2 rounded-lg border border-gray focus:outline-none"
              placeholder="XYZ utilizes..."
              name="specs"
              value={specs || ""}
              onChange={(e) => setSpecs(e.target.value)}
              onBlur={(e) => store.setSubmissionDescription("specs", e.target.value)}
            />
          </div>
          <p className="text-xl font-bold pb-3">Links</p>
          <div className="pb-3">
            <p className="text-[17px] text-blue-alt font-bold pb-1">Github Repo</p>
            <input
              ref={githubLinkRef}
              type="text"
              name="github_link"
              className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
              placeholder="https://github.com/protocol/research"
              value={githubLink || ""}
              onChange={(e) => setGithubLink(e.target.value)}
              onBlur={(e) => store.setGithubLink(e.target.value)}
            />
          </div>
          {links.map((link: any, index: number) => {
            return (
              <div key={index} className="pb-3">
                <input
                  ref={githubLinkRef}
                  type="text"
                  name="github_link"
                  className="appearance-none text-[17px] text-blue-alt font-bold pb-1 focus:outline-none"
                  placeholder="https://protocol.ai/"
                  value={link.name || ""}
                  onChange={(e) => setGithubLink(e.target.value)}
                  onBlur={(e) => store.setGithubLink(e.target.value)}
                />
                <div className="flex items-center">
                  <input
                    ref={githubLinkRef}
                    type="text"
                    name="github_link"
                    className="appearance-none w-full px-4 py-2 border border-gray rounded-l-lg focus:outline-none"
                    placeholder="https://protocol.ai/"
                    value={link.value || ""}
                    onChange={(e) => setGithubLink(e.target.value)}
                    onBlur={(e) => store.setGithubLink(e.target.value)}
                  />
                  <button
                    className="font-bold py-[10px] px-4 border border-gray border-l-0 rounded-r-lg bg-blue bg-opacity-5"
                    onClick={() => console.log("delete")}
                  >
                    <Delete className="w-3 h-5 fill-offblack" />
                  </button>
                </div>
              </div>
            );
          })}
          <div className="pt-4 pb-9">
            <button
              className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold border border-blue hover:bg-white focus:bg-white text-blue text-lg px-4 py-1"
              onClick={() => setLinks([...links, { name: "", value: "" }])}
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
              ref={githubHandleRef}
              className="text-base appearance-none border border-gray rounded-lg w-full py-2 px-3 mt-1 font-medium text-gray focus:outline-none"
              type="text"
              name="githubHandle"
              value={githubHandle || ""}
              disabled={true}
            />
          ) : (
            <input
              className="text-base appearance-none border border-gray rounded-lg w-full py-2 px-3 mt-1 font-medium  focus:outline-none"
              type="text"
              name="githubHandle"
              value={githubHandle || ""}
              onChange={(e) => setGithubHandle(e.target.value)}
              onBlur={(e) => store.setGithubHandle(e.target.value)}
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
