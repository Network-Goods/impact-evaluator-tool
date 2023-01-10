type TitleProps = {
  text: string;
};

const Title = ({ text }: TitleProps) => {
  return <h1 className="text-3xl font-semibold">{text}</h1>;
};

export default Title;
