import SmallTitle from "../SmallTitle";

const VotingTableHeader = () => {
  return (
    <div className="flex py-2 pl-4 md:px-6">
      <div className="w-[45%] md:w-[60%] py-2 border-r border-gray ">
        <SmallTitle text="PROJECTS" />
      </div>
      <div className="w-[33%] md:w-[23.5%] text-center py-2">
        <SmallTitle text="VOTES" />
      </div>
      <div className="w-[22%] md:w-[16.5%] text-center py-2 border-l border-gray ">
        <SmallTitle text="CREDITS" />
      </div>
    </div>
  );
};

export default VotingTableHeader;
