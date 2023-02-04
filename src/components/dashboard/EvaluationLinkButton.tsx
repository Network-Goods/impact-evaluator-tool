import Link from "next/link";

const EvaluationLinkButton = ({ text, link, external }: { text: string; link: string; external?: boolean }) => {
  return (
    <>
      {external ? (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto  border border-blue bg-blue hover:bg-blue-darkest hover:border-blue-darkest text-white text-sm md:text-base py-1 w-16 md:w-20"
        >
          {text}
        </a>
      ) : (
        <Link href={link}>
          <div className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto  border border-blue bg-blue hover:bg-blue-darkest hover:border-blue-darkest  text-white text-sm md:text-base py-1 w-16 md:w-20">
            {text}
          </div>
        </Link>
      )}
    </>
  );
};

export default EvaluationLinkButton;
