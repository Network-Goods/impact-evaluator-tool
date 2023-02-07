type VotingTableLinkProps = {
  title: string;
  link: string;
};

const VotingTableLink = ({ title, link }: VotingTableLinkProps) => {
  return (
    <a className="underline mt-3" href={link.includes("//") ? link : `//${link}`} target="_blank" rel="noreferrer">
      {title}
    </a>
  );
};

export default VotingTableLink;
