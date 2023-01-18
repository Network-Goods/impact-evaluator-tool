import { useState, useEffect, useRef } from "react";
import Button from "../Button";
import SubmitEvaluationModal from "./SubmitEvaluationModal";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useRouter } from "next/router";
import VotingHeader from "./VotingHeader";
import VotingFilter from "./VotingFilter";
import VotingTable from "./VotingTable";
import VotingCreditCounter from "./VotingCreditCounter";
import { useVotingStore } from "./VotingStore";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUserProfileStore } from "src/lib/UserProfileStore";
import Link from "next/link";

export default function Voting() {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [openProjectsView, setOpenProjectsView] = useState(false);
  const [openArray, setOpenArray] = useState([]);
  const projectsViewWrapperRef = useRef<HTMLInputElement>(null);
  useClickOutside(projectsViewWrapperRef, () => setOpenProjectsView(false));
  const userProfileStore = useUserProfileStore();
  const router = useRouter();
  const { evaluation_id } = router.query;
  const store = useVotingStore();
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (
      !evaluation_id ||
      Array.isArray(evaluation_id) ||
      !userProfileStore.profile ||
      store.loaded
    ) {
      return;
    }
    store.load(supabase, evaluation_id, userProfileStore.profile.id);
  }, [evaluation_id, userProfileStore.profile]);

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

  if (!store.loaded) return <p>Loading...</p>;
  // if (store.error) return <p>Oh no... {store.error.message}</p>;

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

      <div className="flex flex-col lg:flex-row">
        <VotingTable
          search={search}
          submissions={store.submissions}
          openArray={openArray}
          setOpenArray={setOpenArray}
          evaluation_id={evaluation_id}
        />
        <div>
          <VotingCreditCounter
            supabase={supabase}
            handleReset={store.reset}
            credits={store.availableCredits}
          />
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <div>
          <Link href="/">
            <div className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto border border-[#dbdbdb] bg-[#e7eaf0] hover:bg-[#dbdbdb] hover:border-[#dbdbdb] focus:bg-[#dbdbdb] text-[#898888] text-lg px-4 py-3">
              Save and exit
            </div>
          </Link>
        </div>
        <div>
          <Button text="Submit" onClick={handleOpenModal} />
        </div>
      </div>
      <SubmitEvaluationModal handleClose={handleCloseModal} open={openModal} />
    </div>
  );
}