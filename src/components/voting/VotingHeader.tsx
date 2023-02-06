import { useState } from "react";
import Link from "next/link";
import SmallTitle from "../shared/SmallTitle";
import LeftArrow from "public/images/svg/LeftArrow";
import Add from "public/images/svg/Add";
import VotingHeaderButton from "./VotingHeaderButton";
import { returnLocalDate, returnLocalTime } from "src/lib/utils";
import QuadraticVotingModal from "./QuadraticVotingModal";
import RoundDetailsModal from "./RoundDetailsModal";

type VotingHeaderProps = {
  evaluation: any;
};

export default function VotingHeader({ evaluation }: VotingHeaderProps) {
  const [openQuadraticModal, setOpenQuadraticModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);

  const handleOpenQuadraticModal = () => setOpenQuadraticModal(true);
  const handleCloseQuadraticModal = () => setOpenQuadraticModal(false);

  const handleOpenDetailsModal = () => setOpenDetailsModal(true);
  const handleCloseDetailsModal = () => setOpenDetailsModal(false);
  return (
    <div className="flex">
      <div className="hidden md:flex mr-6">
        <Link href="/">
          <div className="rounded-lg bg-gray-light h-12 w-12 flex justify-center items-center">
            <LeftArrow />
          </div>
        </Link>
      </div>
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:justify-between pb-6">
          <div className="pb-6 md:pb-0">
            <h1 className="text-4xl text-offblack pb-2">{evaluation && evaluation.name}</h1>
            <h3 className="text-2xl text-blue-alt font-bold">Quadratic voting</h3>
          </div>
          <div>
            <div className="md:flex md:justify-end pb-2">
              <div>
                <button
                  className="transition-colors duration-200 ease-in-out transform outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto border border-blue hover:bg-white focus:bg-white text-blue text-lg px-3 py-1 cursor-pointer"
                  onClick={handleOpenDetailsModal}
                >
                  <span className="mr-3">
                    <Add className=" fill-blue" />
                  </span>
                  <span>Round Details</span>
                </button>
              </div>
            </div>
            <div>
              <button
                className="transition-colors duration-200 ease-in-out transform outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto border border-blue hover:bg-white focus:bg-white text-blue text-lg px-3 py-1 cursor-pointer"
                onClick={handleOpenQuadraticModal}
              >
                <span className="mr-3">
                  <Add className=" fill-blue" />
                </span>
                <span>Quadratic voting</span>
              </button>
            </div>
          </div>
        </div>

        <SmallTitle text="DEADLINE" />
        <div className="mt-2 font-bold tracking-wider">
          {evaluation && evaluation.end_time && returnLocalDate(evaluation.end_time)}{" "}
          {evaluation && evaluation.end_time && returnLocalTime(evaluation.end_time)}
        </div>
      </div>
      <QuadraticVotingModal open={openQuadraticModal} handleClose={handleCloseQuadraticModal} />
      <RoundDetailsModal open={openDetailsModal} handleClose={handleCloseDetailsModal} />
    </div>
  );
}
