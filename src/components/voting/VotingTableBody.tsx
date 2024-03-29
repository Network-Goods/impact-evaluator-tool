import VotingTableLink from "./VotingTableLink";
import { filterSubmissions } from "src/lib/utils";
import { Submission } from "src/lib";

type VotingTableBodyProps = {
  idx: number;
  project: Submission;
  submissions: any;
  search: string;
};

export default function VotingTableBody({ idx, project, submissions, search }: VotingTableBodyProps) {
  return (
    <div
      className={`px-4 md:px-12 pb-4 md:pb-6
      ${idx % 2 === 0 ? "bg-white" : "bg-gray-lighter"}
        ${idx === filterSubmissions(search, submissions).length - 1 ? "rounded-b-lg" : ""}
        `}
    >
      <div className="border border-gray w-full h-[3px]"></div>
      <div className="flex flex-col md:flex-row pt-5">
        <div className="md:w-[70%] pr-12">
          <div className="font-bold">Project Description</div>
          <p className="text-sm mb-3">{project.description.description}</p>
          <div className="font-bold">Progress Summary</div>
          <p className="text-sm mb-3">{project.description.summary}</p>
          <div className="font-bold">FVM Tech Specs</div>
          <p className="text-sm mb-3">{project.description.specs}</p>
        </div>
        <div className="md:w-[30%] md:border-l md:border-gray md:pl-6">
          <div className="font-bold">{`Project Link${project.links.length > 1 ? "s" : ""}`}</div>
          <div className="flex flex-col">
            <VotingTableLink title="Github" link={project.github_link} />
            {project.links
              ? project.links.map((link: any, idx: any) => (
                  <div key={idx}>
                    <VotingTableLink title={link.name} link={link.value} />
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
