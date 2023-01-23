type SmallTitleProps = {
  text: string;
};

const SmallTitle = ({ text }: SmallTitleProps) => {
  return <h4 className="text-xs text-offblack tracking-widest">{text}</h4>;
};

export default SmallTitle;