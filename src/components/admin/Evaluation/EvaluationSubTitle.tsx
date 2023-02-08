type SubTitleProps = {
  text: string;
  small?: boolean;
};

export default function EvaluationSubTitle({ text, small }: SubTitleProps) {
  return <h1 className={`text-gray-subtitle font-normal ${small ? "text-[15px]" : ""}`}>{text}</h1>;
}
