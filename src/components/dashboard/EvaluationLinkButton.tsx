import Link from "next/link";

export default function EvaluationLinkButton({
  text,
  link,
  external,
}: {
  text: string;
  link: string;
  external?: boolean;
}) {
  return (
    <>
      {external ? (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto  border border-blue bg-blue hover:bg-blue-darkest hover:border-blue-darkest text-white text-xs md:text-base py-1 w-24 md:w-32"
        >
          {text}
        </a>
      ) : (
        <Link href={link}>
          <div className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto  border border-blue bg-blue hover:bg-blue-darkest hover:border-blue-darkest  text-white text-xs md:text-base py-1 w-24 md:w-32">
            {text}
          </div>
        </Link>
      )}
    </>
  );
}
