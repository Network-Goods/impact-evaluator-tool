import { Collapse } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import Delete from "public/images/svg/Delete";
import DownChevron from "public/images/svg/DownChevron";
import LeftArrow from "public/images/svg/LeftArrow";
import { useEffect, useState } from "react";
import LoadingSpinner from "src/components/shared/LoadingSpinner";
import EvaluationLinkButton from "../dashboard/EvaluationLinkButton";
import SmallTitle from "../shared/SmallTitle";
import Button from "../shared/Button";
import Title from "../shared/Title";
import VotingTable from "../voting/VotingTable";
import VotingTableBody from "../voting/VotingTableBody";
import { useRoundDetailsStore } from "./RoundDetailsStore";
import { Submission } from "src/lib";
import { useUserProfileStore } from "src/lib/UserProfileStore";

export default function RoundDetails() {
  const router = useRouter();
  const store = useRoundDetailsStore();
  const userProfileStore = useUserProfileStore();
  const [openArray, setOpenArray] = useState<boolean[]>([]);

  const { evaluation_id } = router.query;

  useEffect(() => {
    if (!evaluation_id || Array.isArray(evaluation_id) || !userProfileStore.profile) {
      return;
    }

    store.load(userProfileStore.profile.id, evaluation_id);
  }, [evaluation_id, store.fetching, userProfileStore.profile]);

  useEffect(() => {
    if (!store.submissions) {
      return;
    }
    const arr: any = [];

    store.submissions.forEach(() => {
      arr.push(false);
    });

    setOpenArray(arr);
  }, [store.submissions]);

  const clickNewSubmission = () => {
    const submission = store.createSubmission();
    if (!submission) {
      return;
    }

    router.push(`/evaluation/${evaluation_id}/submission/${submission.id}`);
  };

  if (store.fetching) return <LoadingSpinner />;

  return (
    <>
      <div className="pb-2">
        <div className="flex items-center pb-10">
          <div className="hidden md:flex mr-6">
            <Link href="/">
              <div className="rounded-lg bg-gray-light h-12 w-12 flex justify-center items-center">
                <LeftArrow />
              </div>
            </Link>
          </div>
          <div className="flex-1">
            <Title text="Big Ole Description Page" />
          </div>
        </div>

        <div className="px-2">
          <div className="pb-14">
            <h3 className="text-2xl text-blue-alt font-bold">Round Description</h3>
            <div className="text-xl pt-4">
              This Impact Evaluator (IE) round is part of the Space Warp program, which leads up to the mainnet launch
              of the Filecoin Virtual Machine (FVM). The recurring IE rounds crowdsource the community’s perspective on
              the most valuable work being done on the FVM, which populates the <b>FVM Builders Leaderboard</b> and
              directs the allocation of a $75,000 prize pool.
              <br />
              <br />
              Impact Evaluators are a type of funding mechanism that Protocol Labs is working to define and grow. By
              transparently measuring, evaluating, and rewarding valuable projects over time, this project aims to
              increase the efficiency of public goods funding for the Filecoin ecosystem.
              <br />
              <br />
              To learn more about Space Warp’s Impact Evaluator Rounds, see: IE Round Overview & FAQ Space Warp Website,
              featuring the FVM Builders Leaderboard
            </div>
          </div>

          <div className="pb-14">
            <h3 className="text-2xl text-blue-alt font-bold">Round Details</h3>
            <div className="text-xl pt-4">
              <b>When will this round be open to evaluation submissions?</b>
              <div className="flex pt-2">
                <div>
                  <b>Start:</b>
                  <br />
                  TODO
                </div>
                <div className="pl-14">
                  <b>End:</b>
                  <br />
                  TODO
                </div>
              </div>
            </div>
            <div className="text-xl pt-4">
              <b>What evaluation method will be used for this round?</b>
              <br />
              TODO
            </div>
          </div>

          <div className="flex justify-between">
            <h3 className="text-2xl text-blue-alt font-bold">Submissions</h3>

            <button
              className="transition-colors px-4 duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold border border-blue bg-blue hover:bg-blue-darkest hover:border-blue-darkest  text-white text-sm md:text-base py-1"
              onClick={clickNewSubmission}
            >
              New Submission
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1">
          <div className="w-full rounded-lg bg-[#f0f0f0] border border-gray">
            <div className="flex py-2 pl-4 md:px-6">
              <div className="w-[45%] md:w-[60%] py-2 border-r border-gray ">
                <SmallTitle text="Name" />
              </div>
            </div>
            <div>
              {store.submissions?.map((submission: Submission, idx: number) => {
                return (
                  <div key={idx}>
                    <div>
                      <div
                        className={`flex items-center pl-4 md:px-6 border border-gray border-x-0 border-b-0 ${
                          idx % 2 === 0 ? "bg-white" : "bg-gray-lighter"
                        }
        ${!openArray[idx] ? "rounded-b-lg" : ""}`}
                      >
                        <div
                          className={`w-[45%] md:w-[60%] flex justify-between ${
                            openArray[idx] ? "" : "border-r border-gray"
                          }`}
                        >
                          <div className="py-6 md:pl-6 md:text-[20px]">{submission.name}</div>
                          <button
                            onClick={() =>
                              setOpenArray((prev: any) => {
                                return prev.map((item: boolean, j: number) => {
                                  if (j === idx) {
                                    return !item;
                                  }
                                  return item;
                                });
                              })
                            }
                            className="p-4"
                          >
                            <DownChevron
                              className={`h-5 w-5 transform transition-all duration-300  ease-in-out
              ${openArray[idx] ? "rotate-180 fill-blue" : "rotate-0"}
              `}
                            />
                          </button>
                        </div>
                        <div className="pl-4 md:pl-10 flex">
                          <EvaluationLinkButton
                            text="Edit"
                            link={`/evaluation/${evaluation_id}/submission/${submission.id}`}
                          />
                          <button
                            className="font-bold py-[10px] px-4 border border-gray border-l-0 rounded-r-lg bg-blue bg-opacity-5"
                            onClick={() => store.deleteSubmission(submission.id)}
                          >
                            <Delete className="w-3 h-5 fill-offblack" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <Collapse in={openArray[idx]} timeout="auto" unmountOnExit>
                      <VotingTableBody idx={idx} project={submission} submissions={store.submissions} search={""} />
                    </Collapse>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
