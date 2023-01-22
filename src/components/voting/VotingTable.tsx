import Collapse from "@mui/material/Collapse";
import VotingTableHeader from "./VotingTableHeader";
import VotingTableItem from "./VotingTableItem";
import VotingTableBody from "./VotingTableBody";
import { useUserProfileStore } from "src/lib/UserProfileStore";
import { useVotingStore } from "./VotingStore";
import { useEffect } from "react";

type VotingTableProps = {
  search: string;
  submissions: any;
  openArray: boolean[];
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
  const votingStore = useVotingStore();

  useEffect(() => {
    if (!evaluation_id || !userProfileStore.profile || votingStore.loaded) {
      return;
    }

    votingStore.load(evaluation_id);
  }, [evaluation_id, userProfileStore.profile]);

  return (
    <div className="flex-1">
      <div className="w-full rounded-lg bg-[#f0f0f0] border border-gray">
        <VotingTableHeader />
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
                    <VotingTableItem
                      project={project}
                      idx={idx}
                      search={search}
                      submissions={submissions}
                      openArray={openArray}
                      setOpenArray={setOpenArray}
                    />
                  </div>

                  <Collapse in={openArray[idx]} timeout="auto" unmountOnExit>
                    <VotingTableBody
                      idx={idx}
                      project={project}
                      submissions={submissions}
                      search={search}
                    />
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
