import Add from "public/images/svg/Add";

type VotingHeaderButtonProps = {
  title: string;
  link: string;
};

export default function VotingHeaderButton({ title, link }: VotingHeaderButtonProps) {
  return (
    <a
      className="transition-colors duration-200 ease-in-out transform outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto border border-blue hover:bg-white focus:bg-white text-blue text-lg px-3 py-1 cursor-pointer"
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      <span className="mr-3">
        <Add className=" fill-blue" />
      </span>
      <span>{title}</span>
    </a>
  );
}
