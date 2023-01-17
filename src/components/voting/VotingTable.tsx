import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUserProfileStore } from "src/lib/UserProfileStore";

import SmallTitle from "../SmallTitle";
import DownChevron from "public/images/svg/DownChevron";
import Collapse from "@mui/material/Collapse";
import { useVotingStore } from "./VotingStore";

type VotingTableProps = {
  search: any;
  submissions: any;
  openArray: any;
  setOpenArray: any;
  evaluation_id: any;
};

const VotingTable = ({
  search,
  submissions,
  openArray,
  setOpenArray,
  evaluation_id,
}: VotingTableProps) => {
  const userProfileStore = useUserProfileStore();
  const supabase = useSupabaseClient();
  const votingStore = useVotingStore();

  useEffect(() => {
    if (!evaluation_id || Array.isArray(evaluation_id)) {
      return;
    }

    if (!userProfileStore.profile) {
      return;
    }

    votingStore.load(supabase, evaluation_id, userProfileStore.profile.id);
  }, [evaluation_id, userProfileStore.profile]);

  return (
    <div className="flex-1">
      <div className="w-full rounded-lg bg-[#f0f0f0] border border-gray">
        <div className="flex py-2 px-6">
          <div className="w-[60%] py-2 border-r border-gray ">
            <SmallTitle text="PROJECTS" />
          </div>
          <div className="w-[23.5%] text-center py-2">
            <SmallTitle text="VOTES" />
          </div>
          <div className="w-[16.5%] text-center py-2 border-l border-gray ">
            <SmallTitle text="CREDITS" />
          </div>
        </div>

        <div>
          {submissions
            .filter((val: any) => {
              if (search === "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return val;
              }
            })
            .map((project: any, idx: number) => {
              return (
                <div key={idx}>
                  <div>
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
                        <div className="py-6 pl-6 text-[20px]">
                          {project.name}
                        </div>
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
                              onClick={() =>
                                votingStore.decrementVote(supabase, project.id)
                              }
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
                                  project.votes === 0
                                    ? "text-[#B5B5B5]"
                                    : "text-blue-darkest"
                                }`}
                              >
                                −
                              </span>
                            </button>
                            <span className="outline-none focus:outline-none text-center text-3xl text-blue-darkest w-9">
                              {votingStore.getVotes(project.id)}
                            </span>

                            <button
                              onClick={() =>
                                votingStore.incrementVote(supabase, project.id)
                              }
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
                              {votingStore.getAllocatedVoiceCredits(project.id)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Collapse in={openArray[idx]} timeout="auto" unmountOnExit>
                    <div
                      className={`bg-white px-12 py-6
                    ${
                      idx ===
                      submissions.filter((val: any) => {
                        if (search === "") {
                          return val;
                        } else if (
                          val.name.toLowerCase().includes(search.toLowerCase())
                        ) {
                          return val;
                        }
                      }).length -
                        1
                        ? "rounded-b-lg"
                        : ""
                    }
                    `}
                    >
                      <div className="border border-gray w-full h-[3px]"></div>
                      <div className="flex pt-5">
                        <div className="w-[70%] pr-12">
                          <div className="font-bold">Project Summary</div>
                          <p className="text-sm mb-3">
                            {JSON.parse(project.description).summary}
                          </p>
                          <div className="font-bold">Project Description</div>
                          <p className="text-sm mb-3">
                            {JSON.parse(project.description).description}
                          </p>
                          <div className="font-bold">FVM Tech Specs</div>
                          <p className="text-sm mb-3">
                            {JSON.parse(project.description).specs}
                          </p>
                        </div>
                        <div className="w-[30%] border-l border-gray pl-6">
                          <div className="font-bold">Project Links</div>
                          <div className="flex flex-col">
                            <a
                              className="underline mt-3"
                              href={project.github_link}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Github
                            </a>
                            <a
                              className="underline mt-3"
                              href={project.website_link}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Website
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Collapse>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default VotingTable;
