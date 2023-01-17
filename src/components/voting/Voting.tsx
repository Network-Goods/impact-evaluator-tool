import Add from "public/images/svg/Add";
import LeftArrow from "public/images/svg/LeftArrow";
import { useState, useEffect, useRef } from "react";
import Button from "../Button";
import Collapse from "@mui/material/Collapse";
import SubmitEvaluationModal from "./SubmitEvaluationModal";
import SmallTitle from "../SmallTitle";
import { useClickOutside } from "../../hooks/useClickOutside";
import DownChevron from "public/images/svg/DownChevron";
import Reset from "public/images/svg/Reset";
import Search from "public/images/svg/Search";

import { useSubmissionStore } from "./store";
import { useRouter } from "next/router";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUserProfileStore } from "src/lib/UserProfileStore";

const projectsData: any = [
  {
    title: "Outcome 1",
    votes: 0,
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    specs:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    github: "github.com",
    website: "facebook.com",
  },
  {
    title: "Outcome 2",
    votes: 0,
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    specs:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    github: "github.com",
    website: "facebook.com",
  },
  {
    title: "Outcome 3",
    votes: 0,
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    specs:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    github: "github.com",
    website: "facebook.com",
  },
  {
    title: "Outcome 4",
    votes: 0,
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    specs:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    github: "github.com",
    website: "facebook.com",
  },
  {
    title: "Outcome 5",
    votes: 0,
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    specs:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    github: "github.com",
    website: "facebook.com",
  },
  {
    title: "Outcome 6",
    votes: 0,
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    specs:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    github: "github.com",
    website: "facebook.com",
  },
  {
    title: "Outcome 76",
    votes: 0,
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    specs:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    github: "github.com",
    website: "facebook.com",
  },
];

export default function Voting() {
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openProjectsView, setOpenProjectsView] = useState(false);
  const [openArray, setOpenArray] = useState([]);
  const [projects, setProjects] = useState(projectsData);
  const [credits, setCredits] = useState(100);
  const [incrementDisabled, setIncrementDisabled] = useState(false);
  const projectsViewWrapperRef = useRef<HTMLInputElement>(null);
  useClickOutside(projectsViewWrapperRef, () => setOpenProjectsView(false));
  const [votes, setVotes] = useState();

  const router = useRouter();
  const { evaluation_id } = router.query;
  const store = useSubmissionStore();
  const userProfileStore = useUserProfileStore();

  const supabase = useSupabaseClient();

  useEffect(() => {
    if (!evaluation_id || Array.isArray(evaluation_id)) {
      return;
    }
    store.load(evaluation_id, { with_submissions: true });
  }, [evaluation_id]);

  useEffect(() => {
    let arr: any = [];
    projects.forEach(() => {
      arr.push(false);
    });
    setOpenArray(arr);
  }, []);

  useEffect(() => {
    fetchVotes();
  }, []);

  useEffect(() => {
    if (credits === 0) {
      setIncrementDisabled(true);
    } else {
      setIncrementDisabled(false);
    }
  }, [credits]);

  async function fetchVotes() {
    let { data, error } = await supabase.rpc("get_user_evaluation_votes", {
      in_evaluation_id: evaluation_id,
      in_user_id: userProfileStore.profile?.id,
    });
    if (error) console.error(error);
    else {
      console.log("rpc", data);
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
      console.log(data);
    fetchVotes()
    } 
      
  }

  async function decrementVotes(submission_id: string) {
    let { data, error } = await supabase.rpc("decrement", {
      in_evaluator_id: "fd9a8f68-babd-4195-81f0-f34326c80fcb",
      in_submission_id: submission_id,
    });

    if (error) console.error(error);
    else {
      console.log(data);
      fetchVotes();
    } 
  }

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSetAllProjectsView = (action: boolean) => {
    let arr: any = [];
    setOpenProjectsView(false);
    projects.forEach(() => {
      arr.push(action);
    });
    setOpenArray(arr);
  };

  const updateCredits = (action: string, vote: number) => {
    if (action === "increment") {
      setCredits(credits + (vote - 1) * (vote - 1) - vote * vote);
    } else if (action === "decrement") {
      setCredits(credits + vote * vote - (vote - 1) * (vote - 1));
    }
  };

  const handleVote = (action: string, id: number) => {
    const newArr = projects.map((project: any, idx: number) => {
      if (idx !== id) {
        return project;
      } else {
        if (action === "increment") {
          let updatedVote = project.votes + 1;
          updateCredits(action, updatedVote);
          return {
            ...project,
            votes: updatedVote,
          };
        } else if (action === "decrement") {
          updateCredits(action, project.votes);
          return {
            ...project,
            votes: project.votes - 1,
          };
        } else {
          return null;
        }
      }
    });
    setProjects(newArr);
  };

  const handleReset = () => {
    setCredits(100);
    setProjects(projectsData);
  };

  if (store.fetching) return <p>Loading...</p>;
  if (store.error) return <p>Oh no... {store.error.message}</p>;
  console.log("store", store);

  return (
    <div>
      <div className="flex">
        <button className="rounded-lg bg-gray-light h-12 w-12 flex justify-center items-center mr-6">
          <LeftArrow className="" />
        </button>
        <div className="flex-1">
          <div className="flex justify-between pb-2">
            <h1 className="text-4xl text-offblack">
              {store.evaluation && store.evaluation.name}
            </h1>
            <div>
              <>
                <Button
                  secondary
                  small
                  text="Round details"
                  icon={<Add className="mb-1 fill-blue" />}
                  onClick={() => fetchVotes()}
                />
              </>
            </div>
          </div>
          <div className="flex justify-between pb-6">
            <h3 className="text-2xl text-blue-alt font-bold">
              Quadratic voting
            </h3>
            <div>
              <Button
                secondary
                small
                text="Quadratic voting"
                icon={<Add className="mb-1 fill-blue" />}
                onClick={() => console.log("quadratic voting")}
              />
            </div>
          </div>
          <SmallTitle text="DEADLINE" />
          <div className="mt-2 font-bold tracking-wider">
            {store.evaluation && store.evaluation.end_time.slice(0, 10)}
          </div>
        </div>
      </div>
      <hr className="my-8 border-gray" />
      <div className="flex">
        <div className="mr-2">
          <div className="absolute pl-6">
            <Search className="mt-[14px]" />
          </div>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            className="w-[550px] z-20 inline-flex justify-center px-14 py-2 text-[20px] font-medium bg-white rounded-lg border border-gray 
          "
          />
        </div>
        <div className="h-16">
          <div className="absolute" ref={projectsViewWrapperRef}>
            <div>
              <button
                type="button"
                className={`relative z-20 inline-flex w-full justify-center px-7 py-2 text-[20px] font-medium rounded-lg border border-gray 
              ${openProjectsView ? "bg-[#f0f0f0]" : "bg-white"}
              
              `}
                onClick={() => setOpenProjectsView((prev) => !prev)}
              >
                Projects View
                <DownChevron
                  className={`h-5 w-5 ml-2 my-auto transform transition-all duration-300  ease-in-out
                ${openProjectsView ? "rotate-180 fill-blue" : "rotate-0"}
                `}
                />
              </button>
            </div>
            <Collapse in={openProjectsView} timeout="auto" unmountOnExit>
              <div className="relative -mt-2 pt-2 px-7 z-10 rounded-b-md bg-white border border-gray focus:outline-none">
                <div className="py-1">
                  <button
                    className="block w-full px-6 py-2 text-center text-lg border-b border-gray"
                    onClick={() => handleSetAllProjectsView(true)}
                  >
                    Expand All
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-center text-lg "
                    onClick={() => handleSetAllProjectsView(false)}
                  >
                    Collapse All
                  </button>
                </div>
              </div>
            </Collapse>
          </div>
        </div>
      </div>
      <div className="flex">
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
              {/* @ts-ignore */}
              {store.submissions
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
                        store.submissions.filter((val: any) => {
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
                              open ? "" : "border-r border-gray"
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
                            ${open ? "rotate-180 fill-blue" : "rotate-0"}
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
                                      project.votes === 0
                                        ? "text-[#B5B5B5]"
                                        : "text-blue-darkest"
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
                                  credits +
                                    (project.votes - 1) * (project.votes - 1) -
                                    project.votes * project.votes <=
                                  1
                                    ? "bg-blue-light bg-opacity-50"
                                    : "bg-blue-light"
                                }
                            `}
                                  disabled={
                                    credits +
                                      (project.votes - 1) *
                                        (project.votes - 1) -
                                      project.votes * project.votes <=
                                    1
                                  }
                                >
                                  <span
                                    className={`m-auto text-2xl font-semibold 
                                    ${
                                      credits +
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
                                  {votes &&
                                    votes[project.id] * votes[project.id]}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Collapse
                        in={openArray[idx]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <div
                          className={`bg-white px-12 py-6
                    ${
                      idx ===
                      projects.filter((val: any) => {
                        if (search === "") {
                          return val;
                        } else if (
                          val.title.toLowerCase().includes(search.toLowerCase())
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
                              <div className="font-bold">
                                Project Description
                              </div>
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
        <div>
          <div className="rounded-lg bg-white border border-gray p-12 ml-6 text-center">
            <SmallTitle text="VOICE CREDITS" />
            <div className="text-4xl mt-2 min-w-[141.08px]">
              <span className="font-semibold">{credits}</span>/100
            </div>
            <button
              className={`transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-semibold mx-auto border border-blue hover:bg-white focus:bg-white text-blue text-lg px-4 py-2 mt-5`}
              onClick={() => handleReset()}
            >
              <span className="mr-3">
                <Reset />
              </span>
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <div>
          <Button alt text="Save and exit" onClick={() => console.log("hi")} />
        </div>
        <div>
          <Button text="Submit" onClick={handleOpenModal} />
        </div>
      </div>
      <SubmitEvaluationModal handleClose={handleCloseModal} open={openModal} />
    </div>
  );
}
