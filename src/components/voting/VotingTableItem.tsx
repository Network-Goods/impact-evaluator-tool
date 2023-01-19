import { useSupabaseClient } from "@supabase/auth-helpers-react";
import DownChevron from "public/images/svg/DownChevron";
import { useVotingStore } from "./VotingStore";

type VotingTableItemProps = {
  project: any;
  idx: any;
  search: any;
  submissions: any;
  openArray: any;
  setOpenArray: any;
};

const VotingTableItem = ({
  project,
  idx,
  search,
  submissions,
  openArray,
  setOpenArray,
}: VotingTableItemProps) => {
  const votingStore = useVotingStore();
  const supabase = useSupabaseClient();

  return (
    <div
      className={`flex items-center pl-4 md:px-6 border border-gray border-x-0 border-b-0 ${
        idx % 2 === 0 ? "bg-white" : "bg-gray-lighter"
      }
        ${
          idx ===
          submissions.filter((val: any) => {
            if (search === "") {
              return val;
            } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
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
        className={`w-[45%] md:w-[60%] flex justify-between ${
          openArray[idx] ? "" : "border-r border-gray"
        }`}
      >
        <div className="py-6 md:pl-6 md:text-[20px]">{project.name}</div>
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
              ${openArray[idx] ? "rotate-180 fill-blue" : "rotate-0"}
              `}
          />
        </button>
      </div>
      <div className="w-[33%] md:w-[23.5%] text-center">
        <div className="py-[22px]">
          <div className="flex flex-row  justify-evenly items-center">
            <button
              onClick={() => votingStore.decrementVote(supabase, project.id)}
              className={`w-6 h-6 md:w-9 md:h-9 rounded  outline-none ${
                votingStore.getVotes(project.id) === 0
                  ? "bg-gray-light"
                  : "bg-blue-darkest bg-opacity-30"
              }`}
              disabled={votingStore.getVotes(project.id) === 0}
            >
              <span
                className={`m-auto md:text-2xl font-semibold ${
                  votingStore.getVotes(project.id) === 0
                    ? "text-[#B5B5B5]"
                    : "text-blue-darkest"
                }`}
              >
                −
              </span>
            </button>
            <span className="outline-none focus:outline-none text-center text-xl md:text-3xl text-blue-darkest md:w-9">
              {votingStore.getVotes(project.id) || 0}
            </span>

            <button
              onClick={() => votingStore.incrementVote(supabase, project.id)}
              className={`w-6 h-6 md:w-9 md:h-9 rounded outline-none
                ${
                  votingStore.canVoteAgain(project.id)
                    ? "bg-blue-light bg-opacity-50"
                    : "bg-blue-light"
                }
            `}
              disabled={votingStore.canVoteAgain(project.id)}
            >
              <span
                className={`m-auto md:text-2xl font-semibold 
                  ${
                    votingStore.canVoteAgain(project.id)
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
      <div className="w-[22%] md:w-[16.5%] text-center">
        <div className="py-4">
          <div className="flex items-center text-sm py-2 border-l border-gray">
            <span className="hidden md:flex ml-5 mr-3">Used credits</span>
            <div className="text-xl text-black mx-auto md:mx-0">
              {votingStore.getAllocatedVoiceCredits(project.id) || 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingTableItem;
