import Add from "public/images/svg/Add";
import LeftArrow from "public/images/svg/LeftArrow";
import { useState, useEffect, useRef } from "react";
import SubTitle from "src/components/SubTitle";
import Title from "src/components/Title";
import Button from "../Button";
import Collapse from "@mui/material/Collapse";
import SubmitEvaluationModal from "./SubmitEvaluationModal";
import SmallTitle from "../SmallTitle";
import { useClickOutside } from "../../hooks/useClickOutside";
import DownChevron from "public/images/svg/DownChevron";
import Reset from "public/images/svg/Reset";

const projectsData: any = [
  {
    title: "Outcome 1",
    votes: 0,
    usedCredits: 0,
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
    votes: 1,
    usedCredits: 1,
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
    votes: 2,
    usedCredits: 4,
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
    usedCredits: 0,
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
    votes: 4,
    usedCredits: 16,
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
    votes: 1,
    usedCredits: 1,
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
    title: "Outcome 7",
    votes: 0,
    usedCredits: 0,
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
    title: "Outcome 8",
    votes: 0,
    usedCredits: 0,
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
  const [openProjectsView, setOpenProjectsView] = useState(false);
  const [openArray, setOpenArray] = useState([]);
  const [projects, setProjects] = useState(projectsData);
  const [incrementDisabled, setIncrementDisabled] = useState(false);
  const projectsViewWrapperRef = useRef<HTMLInputElement>(null);
  useClickOutside(projectsViewWrapperRef, () => setOpenProjectsView(false));

  useEffect(() => {
    let arr: any = [];

    projects.forEach(() => {
      arr.push(false);
    });

    setOpenArray(arr);
  }, []);

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

  // const handleVote = (index: number) => {
  //   const newState = projects.map((obj: any, idx: any) => {
  //     if (idx === index) {
  //       return { ...obj, votes: obj.votes + 1 };
  //     }
  //     return obj;
  //   });
  //   setProjects(newState);
  // };

  const handleVote = (action: string, id: number) => {
    const newArr = projects.map((project: any, idx: number) => {
      if (idx !== id) {
        return project;
      } else {
        if (action === "increment") {
          return {
            ...project,
            votes: project.votes + 1,
          };
        } else if (action === "decrement") {
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

  return (
    <div>
      <div className="flex">
        <button className="rounded-lg bg-gray-light h-12 w-12 flex justify-center items-center mr-6">
          <LeftArrow className="" />
        </button>
        <div className="flex-1">
          <div className="flex justify-between pb-2">
            <h1 className="text-4xl text-offblack">Round Title</h1>
            <div>
              <Button
                secondary
                small
                text="Round details"
                icon={<Add className="mb-1 fill-blue" />}
                onClick={() => console.log("hi")}
              />
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
                onClick={() => console.log("hi")}
              />
            </div>
          </div>
          <SmallTitle text="DEADLINE" />
          <div className="mt-2 font-bold tracking-wider">15/03/2022</div>
        </div>
      </div>
      <hr className="my-8 border-gray" />
      <div className="flex">
        <div className="mr-2">
          <input
            className={`z-20 inline-flex  justify-center px-7 py-2 text-lg font-medium bg-white rounded-lg border border-gray 
             
              
          `}
            placeholder=" Future Search Bar"
          />
        </div>
        <div className="h-16">
          <div className="absolute" ref={projectsViewWrapperRef}>
            <div>
              <button
                type="button"
                className={`relative z-20 inline-flex w-full justify-center px-7 py-2 text-lg font-medium rounded-lg border border-gray 
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
                    className="block w-full px-6 py-2 text-left text-lg border-b border-gray"
                    onClick={() => handleSetAllProjectsView(true)}
                  >
                    Expand All
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-left text-lg "
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
        <div className="flex-1 rounded-lg bg-[#f0f0f0] border border-gray">
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
            {projects.map((project: any, idx: number) => {
              return (
                <div key={idx}>
                  <div>
                    <div
                      className={`flex px-6 border border-gray border-x-0 border-b-0 ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-lighter"
                      }
                      ${
                        idx === projects.length - 1
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
                        <div className="py-6 pl-6">{project.title}</div>
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
                              onClick={() => handleVote("decrement", idx)}
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
                            <span className="outline-none focus:outline-none text-center text-3xl text-blue-darkest">
                              {project.votes}
                            </span>

                            <button
                              onClick={() => handleVote("increment", idx)}
                              className={`w-9 h-9 rounded outline-none
                                ${
                                  incrementDisabled
                                    ? "bg-secondaryBg"
                                    : "bg-blue-light"
                                }
                            `}
                              disabled={incrementDisabled}
                            >
                              <span className="m-auto text-2xl font-semibold text-blue">
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
                              {project.usedCredits}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Collapse in={openArray[idx]} timeout="auto" unmountOnExit>
                    <div
                      className={`bg-white px-12 py-6
                    ${idx === projects.length - 1 ? "rounded-b-lg" : ""}
                    `}
                    >
                      <div className="border border-gray w-full h-[3px]"></div>
                      <div className="flex pt-5">
                        <div className="w-[70%] pr-12">
                          <div className="font-bold">Project Summary</div>
                          <p className="text-sm mb-3">{project.summary}</p>
                          <div className="font-bold">Project Description</div>
                          <p className="text-sm mb-3">{project.description}</p>
                          <div className="font-bold">FVM Tech Specs</div>
                          <p className="text-sm mb-3">{project.specs}</p>
                        </div>
                        <div className="w-[30%] border-l border-gray pl-6">
                          <div className="font-bold">Project Links</div>
                          <div className="flex flex-col">
                            <a className="underline mt-3" href={project.github}>
                              Github
                            </a>
                            <a
                              className="underline mt-3"
                              href={project.website}
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
        <div>
          <div className="rounded-lg bg-white border border-gray p-12 ml-6 text-center">
            <SmallTitle text="VOICE CREDITS" />
            <div className="text-4xl mt-2">
              <span className="font-semibold">78</span>/100
            </div>
            <button
              className={`transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-semibold mx-auto border border-blue hover:bg-white focus:bg-white text-blue text-lg px-4 py-2 mt-5`}
              onClick={() => console.log("reset")}
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
