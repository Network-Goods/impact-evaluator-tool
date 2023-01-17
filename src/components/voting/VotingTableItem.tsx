import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUserProfileStore } from "src/lib/UserProfileStore";
import DownChevron from "public/images/svg/DownChevron";

type VotingTableItemProps = {
  project: any;
  idx: any;
  search: any;
  submissions: any;
  openArray: any;
  setOpenArray: any;
  evaluation_id: any;
};

const VotingTableItem = ({
  project,
  idx,
  search,
  submissions,
  openArray,
  setOpenArray,
  evaluation_id,
}: VotingTableItemProps) => {
  const [votes, setVotes] = useState();
  const supabase = useSupabaseClient();
  const userProfileStore = useUserProfileStore();

  useEffect(() => {
    fetchVotes();
  }, []);

  async function fetchVotes() {
    let { data, error } = await supabase.rpc("get_user_evaluation_votes", {
      in_evaluation_id: evaluation_id,
      in_user_id: userProfileStore.profile?.id,
    });
    if (error) console.error(error);
    else {
      setVotes(data);
    }
  }

  async function incrementVotes(submission_id: string) {
    let { data, error } = await supabase.rpc("increment", {
      in_evaluator_id: "fd9a8f68-babd-4195-81f0-f34326c80fcb",
      in_submission_id: submission_id,
    });

    if (error) console.error(error);
    else {
      fetchVotes();
    }
  }

  async function decrementVotes(submission_id: string) {
    let { data, error } = await supabase.rpc("decrement", {
      in_evaluator_id: "fd9a8f68-babd-4195-81f0-f34326c80fcb",
      in_submission_id: submission_id,
    });

    if (error) console.error(error);
    else {
      fetchVotes();
    }
  }

  return (
    <div
      className={`flex px-6 border border-gray border-x-0 border-b-0 ${
        idx % 2 === 0 ? "bg-white" : "bg-gray-lighter"
      }
                      ${
                        idx ===
                        submissions.filter((val: any) => {
                          if (search === "") {
                            return val;
                          } else if (
                            val.name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          ) {
                            return val;
                          }
                        }).length -
                          1
                          ? !openArray[idx]
                            ? "rounded-b-lg"
                            : ""
                          : ""
                      }
                      `}
    >
      <div
        className={`w-[60%] flex justify-between ${
          openArray[idx] ? "" : "border-r border-gray"
        }`}
      >
        <div className="py-6 pl-6 text-[20px]">{project.name}</div>
        <button
          onClick={() =>
            setOpenArray((prev: any) => {
              return prev.map((item: any, j: any) => {
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
                            ${
                              openArray[idx]
                                ? "rotate-180 fill-blue"
                                : "rotate-0"
                            }
                            `}
          />
        </button>
      </div>
      <div className="w-[23.5%] text-center">
        <div className="py-[22px]">
          <div className="flex flex-row  justify-evenly items-center">
            <button
              onClick={() => decrementVotes(project.id)}
              // onClick={() => handleVote("decrement", idx)}
              className={`w-9 h-9 rounded  outline-none ${
                project.votes === 0
                  ? "bg-gray-light"
                  : "bg-blue-darkest bg-opacity-30"
              }`}
              disabled={project.votes === 0}
            >
              <span
                className={`m-auto text-2xl font-semibold ${
                  project.votes === 0 ? "text-[#B5B5B5]" : "text-blue-darkest"
                }`}
              >
                −
              </span>
            </button>
            <span className="outline-none focus:outline-none text-center text-3xl text-blue-darkest w-9">
              {/* {project.votes} */}
              {votes && votes[project.id]}
            </span>

            <button
              onClick={() => incrementVotes(project.id)}
              // onClick={() => handleVote("increment", idx)}
              className={`w-9 h-9 rounded outline-none
                                ${
                                  // credits +
                                  (project.votes - 1) * (project.votes - 1) -
                                    project.votes * project.votes <=
                                  1
                                    ? "bg-blue-light bg-opacity-50"
                                    : "bg-blue-light"
                                }
                            `}
              disabled={
                // credits +
                (project.votes - 1) * (project.votes - 1) -
                  project.votes * project.votes <=
                1
              }
            >
              <span
                className={`m-auto text-2xl font-semibold 
                                    ${
                                      // credits +
                                      (project.votes - 1) *
                                        (project.votes - 1) -
                                        project.votes * project.votes <=
                                      1
                                        ? "text-blue text-opacity-30"
                                        : "text-blue"
                                    }
                                    `}
              >
                +
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="w-[16.5%] text-center">
        <div className="py-4">
          <div className="flex items-center text-sm py-2 border-l border-gray">
            <span className="ml-5 mr-3">Used credits</span>
            <div className="text-xl text-black">
              {/* {project.votes * project.votes} */}
              {votes && votes[project.id] * votes[project.id]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingTableItem;
