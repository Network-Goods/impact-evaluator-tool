type SubTitleProps = {
  text: string;
  small?: boolean;
};

const EvaluationSubTitle = ({ text, small }: SubTitleProps) => {
  return <h1 className={`text-gray-subtitle font-normal ${small ? "text-[15px]" : ""}`}>{text}</h1>;
};

export default EvaluationSubTitle;
