import { Collapse } from "@mui/material";
import Link from "next/link";
import Delete from "public/images/svg/Delete";
import DownChevron from "public/images/svg/DownChevron";
import LeftArrow from "public/images/svg/LeftArrow";
import { useEffect, useState } from "react";
import EvaluationLinkButton from "../dashboard/EvaluationLinkButton";
import SmallTitle from "../shared/SmallTitle";
import Title from "../shared/Title";
import VotingTableBody from "../voting/VotingTableBody";
import { Submission } from "src/lib";
import Add from "public/images/svg/Add";
import QuadraticVotingModal from "../voting/QuadraticVotingModal";
import parse from "html-react-parser";
import moment from "moment";

type RoundDetailsProps = {
  store: any;
  clickNewSubmission: () => void;
  isNewSubmissionPending: boolean;
  evaluation_id: string | string[] | undefined;
};

export default function RoundDetails({
  store,
  clickNewSubmission,
  isNewSubmissionPending,
  evaluation_id,
}: RoundDetailsProps) {
  const [openArray, setOpenArray] = useState<boolean[]>([]);
  const [openQuadraticModal, setOpenQuadraticModal] = useState(false);

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
            <Title text={store.evaluation.name} />
          </div>
        </div>
        <div className="px-2">
          <div className="pb-14">
            <div className="pb-2">
              <div className="flex justify-between">
                <h3 className="text-2xl text-blue-alt font-bold">Submissions</h3>

                <button
                  className="transition-colors px-4 duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold border border-blue bg-blue hover:bg-blue-darkest hover:border-blue-darkest  text-white text-sm md:text-base py-1"
                  onClick={clickNewSubmission}
                  disabled={isNewSubmissionPending}
                >
                  New Submission
                </button>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1">
                <div className="w-full rounded-lg bg-[#f0f0f0] border border-gray">
                  <div className="flex py-4 pl-4 md:pl-12">
                    <SmallTitle text="Name" />
                  </div>
                  {Array.isArray(store.submissions) && store.submissions.length > 0 ? (
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
                                  className={`w-[60%] md:w-[83%] flex justify-between ${
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
                                  <div className="pr-2 mr-2 md:pr-5 md:mr-5 border-r border-gray">
                                    <EvaluationLinkButton
                                      text="Edit"
                                      link={`/evaluation/${evaluation_id}/submission/${submission.id}`}
                                    />
                                  </div>
                                  <button
                                    onClick={() => store.deleteSubmission(submission.id)}
                                    className="border border-blue px-2 md:px-3 py-1 md:py-[6.5px] rounded-lg mr-2 md:mr-0"
                                  >
                                    <Delete className="w-3 h-5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <Collapse in={openArray[idx]} timeout="auto" unmountOnExit>
                              <VotingTableBody
                                idx={idx}
                                project={submission}
                                submissions={store.submissions}
                                search={""}
                              />
                            </Collapse>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex justify-center py-16 text-lg bg-white rounded-b-lg border-t border-gray">
                      You have not made a submission for this round.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="pb-14">
            <h3 className="text-2xl text-blue-alt font-bold">Round Overview</h3>
            <div className="text-xl pt-4">
              <div className="rich-text-display">{parse(store.evaluation.description)}</div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl text-blue-alt font-bold">Round Details</h3>
            <div className="text-xl pt-4">
              <b>When will voting happen for this round?</b>
              <div className="flex flex-col md:flex-row pt-8">
                <div>
                  <b>Start:</b>
                  <br />

                  <span>{moment(store.evaluation.start_time).utc().format("dddd, MMM. D [at] HH:mm z")}</span>
                </div>
                <div className="pt-4 md:pt-0 md:pl-20">
                  <b>End:</b>
                  <br />
                  <span>{moment(store.evaluation.end_time).utc().format("dddd, MMM. D [at] HH:mm z")}</span>
                </div>
              </div>
            </div>
            <div className="text-xl pt-8">
              <b>What evaluation method will be used for this round?</b>
              <div className="flex pt-4">
                <div>
                  <button
                    className="transition-colors duration-200 ease-in-out transform outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto border border-blue bg-white text-blue text-lg px-3 py-1 cursor-pointer"
                    onClick={() => setOpenQuadraticModal(true)}
                  >
                    <span className="mr-3">
                      <Add className=" fill-blue" />
                    </span>
                    <span>Quadratic voting</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuadraticVotingModal open={openQuadraticModal} handleClose={() => setOpenQuadraticModal(false)} />
    </>
  );
}
