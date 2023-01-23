import SmallTitle from "src/components/shared/SmallTitle";
type EvaluationCardProps = {
  children?: React.ReactNode;
};

export const AdminEditCard = ({ children }: EvaluationCardProps) => {
  return (
    <>
      <div className="hidden md:flex justify-between items-center py-2 px-9 bg-[#f0f0f0] border border-gray rounded-t-lg">
        <div className="py-2">
          <SmallTitle text="ROUND" />
        </div>
        <div className="flex">
          <div className="pr-7 py-2 text-center min-w-[109px]">
            <SmallTitle text="STATUS" />
          </div>
          <div className="text-center py-2 border-l border-gray min-w-[100px]">
            <SmallTitle text="ROLE" />
          </div>
          <div className="text-center py-2 border-l border-gray pl-9 min-w-[121px]">
            <SmallTitle text="ACTION" />
          </div>
        </div>
      </div>
      {children}
    </>
  );
};
