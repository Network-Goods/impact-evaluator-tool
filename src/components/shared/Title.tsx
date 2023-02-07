type TitleProps = {
  text: string;
};

export default function Title({ text }: TitleProps) {
  return <h1 className="text-3xl text-offblack font-semibold">{text}</h1>;
}
