import { useState, useEffect, useRef } from "react";
import Button from "../Button";
import SubmitEvaluationModal from "./SubmitEvaluationModal";
import SmallTitle from "../SmallTitle";
import { useClickOutside } from "../../hooks/useClickOutside";
import Reset from "public/images/svg/Reset";
import { useSubmissionStore } from "./store";
import { useRouter } from "next/router";
import VotingHeader from "./VotingHeader";
import VotingFilter from "./VotingFilter";
import VotingTable from "./VotingTable";
import VotingCreditCounter from "./VotingCreditCounter";
import { useVotingStore } from "./VotingStore";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUserProfileStore } from "src/lib/UserProfileStore";

export default function Voting() {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [openProjectsView, setOpenProjectsView] = useState(false);
  const [openArray, setOpenArray] = useState([]);
  const projectsViewWrapperRef = useRef<HTMLInputElement>(null);
  useClickOutside(projectsViewWrapperRef, () => setOpenProjectsView(false));

  const router = useRouter();
  const { evaluation_id } = router.query;
  const store = useVotingStore();
  {
    console.log("store", store);
  }
  useEffect(() => {
    if (!evaluation_id || Array.isArray(evaluation_id)) {
      return;
    }
  }, [evaluation_id]);

  useEffect(() => {
    let arr: any = [];
    store.submissions.forEach(() => {
      arr.push(false);
    });
    setOpenArray(arr);
  }, [store.submissions]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSetAllProjectsView = (action: boolean) => {
    let arr: any = [];
    setOpenProjectsView(false);
    store.submissions.forEach(() => {
      arr.push(action);
    });
    setOpenArray(arr);
  };

  // const handleVote = (action: string, id: number) => {
  //   const newArr = projects.map((project: any, idx: number) => {
  //     if (idx !== id) {
  //       return project;
  //     } else {
  //       if (action === "increment") {
  //         let updatedVote = project.votes + 1;
  //         updateCredits(action, updatedVote);
  //         return {
  //           ...project,
  //           votes: updatedVote,
  //         };
  //       } else if (action === "decrement") {
  //         updateCredits(action, project.votes);
  //         return {
  //           ...project,
  //           votes: project.votes - 1,
  //         };
  //       } else {
  //         return null;
  //       }
  //     }
  //   });
  //   setProjects(newArr);
  // };

  const handleReset = () => {
    // setCredits(100);
    // setProjects(projectsData);
  };

  if (!store.loaded) return <p>Loading...</p>;
  if (store.error) return <p>Oh no... {store.error.message}</p>;

  return (
    <div>
      <VotingHeader evaluation={store.evaluation} />
      <hr className="my-8 border-gray" />
      <VotingFilter
        setSearch={setSearch}
        projectsViewWrapperRef={projectsViewWrapperRef}
        openProjectsView={openProjectsView}
        setOpenProjectsView={setOpenProjectsView}
        handleSetAllProjectsView={handleSetAllProjectsView}
      />

      <div className="flex">
        <VotingTable
          search={search}
          submissions={store.submissions}
          openArray={openArray}
          setOpenArray={setOpenArray}
          evaluation_id={evaluation_id}
        />
        <div>
          {/* <VotingCreditCounter handleReset={handleReset} credits={credits} /> */}
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
