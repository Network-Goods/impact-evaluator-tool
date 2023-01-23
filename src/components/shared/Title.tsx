type TitleProps = {
  text: string;
};

const Title = ({ text }: TitleProps) => {
  return <h1 className="text-3xl text-offblack font-semibold">{text}</h1>;
};

export default Title;
