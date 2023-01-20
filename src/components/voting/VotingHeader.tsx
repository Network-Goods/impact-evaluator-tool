import Link from "next/link";
import SmallTitle from "../SmallTitle";
import LeftArrow from "public/images/svg/LeftArrow";
import VotingHeaderButton from "./VotingHeaderButton";

type VotingHeaderProps = {
  evaluation: any;
};

const VotingHeader = ({ evaluation }: VotingHeaderProps) => {
  return (
    <div className="flex">
      <div className="mr-6">
        <Link href="/">
          <div className="rounded-lg bg-gray-light h-12 w-12 flex justify-center items-center">
            <LeftArrow />
          </div>
        </Link>
      </div>
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:justify-between pb-6">
          <div className="pb-6 md:pb-0">
            <h1 className="text-4xl text-offblack pb-2">
              {evaluation && evaluation.name}
            </h1>
            <h3 className="text-2xl text-blue-alt font-bold">
              Quadratic voting
            </h3>
          </div>
          <div>
            <div className="md:flex md:justify-end pb-2">
              <div>
                <VotingHeaderButton
                  title="Round details"
                  link="https://network-goods.notion.site/Impact-Evaluators-Builders-Leaderboard-602ea6755b5642e1ad6f9da59a47fa62"
                />
              </div>
            </div>
            <div>
              <VotingHeaderButton
                title="Quadratic voting"
                link="https://www.radicalxchange.org/concepts/plural-voting/"
              />
            </div>
          </div>
        </div>

        <SmallTitle text="DEADLINE" />
        <div className="mt-2 font-bold tracking-wider">
          {evaluation &&
            evaluation.end_time &&
            `${
              evaluation.end_time.slice(8, 10) +
              "/" +
              evaluation.end_time.slice(5, 7) +
              "/" +
              evaluation.end_time.slice(0, 4)
            }`}
        </div>
      </div>
    </div>
  );
};

export default VotingHeader;
