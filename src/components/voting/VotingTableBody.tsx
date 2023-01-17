import Collapse from "@mui/material/Collapse";
import VotingTableLink from "./VotingTableLink";
import VotingTableHeader from "./VotingTableHeader";
import VotingTableItem from "./VotingTableItem";

type VotingTableBodyProps = {
  idx: any;
  project: any;
  submissions: any;
  search: any;
};

const VotingTableBody = ({
  idx,
  project,
  submissions,
  search,
}: VotingTableBodyProps) => {
  return (
    <div
      className={`bg-white px-12 py-6
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
            <VotingTableLink title="Github" link={project.github_link} />
            <VotingTableLink title="Website" link={project.website_link} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingTableBody;
