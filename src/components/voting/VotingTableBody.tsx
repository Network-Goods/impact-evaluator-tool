import VotingTableLink from "./VotingTableLink";
import { filterSubmissions } from "src/lib/utils";
import { Submission, VotingTableBodySubmission } from "src/lib";

type VotingTableBodyProps = {
  idx: number;
  project: VotingTableBodySubmission;
  submissions: any;
  search: string;
};

export default function VotingTableBody({ idx, project, submissions, search }: VotingTableBodyProps) {
  project.submission_field.sort((a: any, b: any) => a.field_order - b.field_order);

  let linksArray = [];
  try {
    linksArray = typeof project.links === "string" ? JSON.parse(project.links) : project.links;
  } catch (error) {
    console.error("Error parsing project.links:", error);
  }

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
          {project.submission_field.map((field: any) => (
            <div key={field.fields_id}>
              <div className="font-bold">{field.evaluation_field.heading}</div>
              <p className="text-sm mb-3 whitespace-pre-wrap">{field.field_body}</p>
            </div>
          ))}
        </div>
        <div className="md:w-[30%] md:border-l md:border-gray md:pl-6">
          <div className="font-bold">{linksArray.length > 1 ? "Project Links" : "Project Link"}</div>
          <div className="flex flex-col">
            {project.github_link ? <VotingTableLink title="Github" link={project.github_link} /> : null}
            {linksArray.length > 0 && (
              <>
                {linksArray.map((link: any, idx: number) => (
                  <div key={idx}>
                    <VotingTableLink title={link.name} link={link.value} />
                  </div>
                ))}
              </>
            )}
          </div>
          {project.submission_metric_value.length > 0 && (
            <>
              <div className="font-bold mt-6 mb-3">Metrics</div>
              {project.submission_metric_value.map((metric: any) => (
                <div key={metric.id} className="">
                  <div className="font-bold">{metric.evaluation_metric.name}</div>
                  <p className="text-sm mb-3 whitespace-pre-wrap">{metric.value}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
