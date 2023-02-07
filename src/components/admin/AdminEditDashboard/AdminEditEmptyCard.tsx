type EvaluationEmptyCardProps = {
  text: string;
};
export const AdminEditEmptyCard = ({ text }: EvaluationEmptyCardProps) => {
  return (
    <div className="border border-gray rounded-lg bg-gray-lighter">
      <div className="w-full min-h-[165px] flex justify-center items-center">
        <span className="text-lg text-[#4a4a4a]">{text}</span>
      </div>
    </div>
  );
};
