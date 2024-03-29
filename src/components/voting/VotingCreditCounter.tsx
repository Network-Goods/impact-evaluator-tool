import SmallTitle from "../shared/SmallTitle";
import Reset from "public/images/svg/Reset";
type VotingCreditCounterProps = {
  handleReset: () => void;
  credits: number;
  allocatedCredits: number;
};

export default function VotingCreditCounter({ handleReset, credits, allocatedCredits }: VotingCreditCounterProps) {
  return (
    <div className="rounded-lg bg-white border border-gray p-12 mt-4 lg:mt-0 lg:ml-6 text-center">
      <SmallTitle text="VOICE CREDITS" />
      <div className="text-4xl mt-2 min-w-[141.08px]">
        <span className="font-semibold">{credits}</span>/{allocatedCredits}
      </div>
      <button
        className={`transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-semibold mx-auto border border-blue hover:bg-white focus:bg-white text-blue text-lg px-4 py-2 mt-5`}
        onClick={() => handleReset()}
      >
        <span className="mr-3">
          <Reset className="fill-blue w-4 h-4" />
        </span>
        <span>Reset</span>
      </button>
    </div>
  );
}
