type EvaluationEmptyCardProps = {
  text: string;
};
export const EvaluationEmptyCard = ({ text }: EvaluationEmptyCardProps) => {
  return (
    <div className="border rounded-lg bg-[#f5f5f5]">
      <div className="w-full min-h-[165px] flex justify-center items-center">
        <span className="text-lg text-[#4a4a4a]">{text}</span>
      </div>
    </div>
  );
};
