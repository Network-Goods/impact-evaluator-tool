type SmallTitleProps = {
  text: string;
};

export default function SmallTitle({ text }: SmallTitleProps) {
  return <h4 className="text-xs text-offblack tracking-widest">{text}</h4>;
}
