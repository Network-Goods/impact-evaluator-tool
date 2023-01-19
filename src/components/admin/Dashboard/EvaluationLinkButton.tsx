import Link from "next/link";

const EvaluationLinkButton = ({
  text,
  link,
}: {
  text: string;
  link: string;
}) => {
  return (
    <Link href={link}>
      <div className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto  border border-blue bg-blue hover:bg-blue-darkest hover:border-blue-darkest focus:bg-blue-darkest text-white text-sm md:text-lg py-1 w-16 md:w-20">
        {text}
      </div>
    </Link>
  );
};

export default EvaluationLinkButton;
