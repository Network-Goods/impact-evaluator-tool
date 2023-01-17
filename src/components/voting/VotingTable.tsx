import Collapse from "@mui/material/Collapse";
import VotingTableHeader from "./VotingTableHeader";
import VotingTableItem from "./VotingTableItem";
import VotingTableBody from "./VotingTableBody";

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
                      evaluation_id={evaluation_id}
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
