type SubTitleProps = {
  text: string;
};

export default function SubTitle({ text }: SubTitleProps) {
  return <h1 className="text-[22px]">{text}</h1>;
}
