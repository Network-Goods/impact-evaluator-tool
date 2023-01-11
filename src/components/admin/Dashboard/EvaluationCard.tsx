type EvaluationCardProps = {
  children?: React.ReactNode;
};

export const EvaluationCard = ({ children }: EvaluationCardProps) => {
  return <div className="border py-4 px-8 rounded-lg bg-white">{children}</div>;
};
