import SmallTitle from "src/components/SmallTitle";
type EvaluationCardProps = {
  children?: React.ReactNode;
};

export const EvaluationCard = ({ children }: EvaluationCardProps) => {
  return (
    <div className="">
      <div className="flex py-2 px-9 bg-[#f0f0f0] border border-gray rounded-t-lg">
        <div className="flex justify-between w-[80%] py-2">
          <SmallTitle text="ROUND" />
          <div className="pr-7">
            <div className="w-16 text-center">
              <SmallTitle text="STATUS" />
            </div>
          </div>
        </div>
        <div className="w-[8%] text-center py-2 border-l border-gray ">
          <SmallTitle text="ROLE" />
        </div>
        <div className="w-[12%] text-center py-2 border-l border-gray pl-9">
          <SmallTitle text="ACTION" />
        </div>
      </div>
      {children}
    </div>
  );
};
