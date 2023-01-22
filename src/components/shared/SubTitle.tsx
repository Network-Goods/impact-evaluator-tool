type SubTitleProps = {
  text: string;
};

const SubTitle = ({ text }: SubTitleProps) => {
  return <h1 className="text-[22px]">{text}</h1>;
};

export default SubTitle;
