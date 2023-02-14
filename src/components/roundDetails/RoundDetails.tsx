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
            <Title text="Big Ole Description Page" />
          </div>
        </div>

        <h3 className="text-2xl text-blue-alt font-bold">Round Description</h3>
        <div className="text-xl pt-7">This description is far too graphic to be public</div>
        <button onClick={() => clickNewSubmission()}>New submission</button>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1">
          <div className="w-full rounded-lg bg-[#f0f0f0] border border-gray">
            <div className="flex py-2 pl-4 md:px-6">
              <div className="w-[45%] md:w-[60%] py-2 border-r border-gray ">
                <SmallTitle text="Submitted Projects" />
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
