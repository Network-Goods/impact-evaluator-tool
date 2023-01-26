import Search from "public/images/svg/Search";
import DownChevron from "public/images/svg/DownChevron";
import Collapse from "@mui/material/Collapse";

type VotingFilter = {
  setSearch: any;
  projectsViewWrapperRef: any;
  openProjectsView: any;
  setOpenProjectsView: any;
  handleSetAllProjectsView: any;
};

const VotingFilter = ({
  setSearch,
  projectsViewWrapperRef,
  openProjectsView,
  setOpenProjectsView,
  handleSetAllProjectsView,
}: VotingFilter) => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="mb-1 md:mr-2">
        <div className="absolute pl-6">
          <Search className="mt-[14px]" />
        </div>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          className="w-full lg:w-[550px] z-20 inline-flex justify-center px-14 py-2 text-[20px] font-medium bg-white rounded-lg border border-gray focus:outline-none
          "
        />
      </div>
      <div className="h-16 flex justify-center md:block">
        <div className="absolute" ref={projectsViewWrapperRef}>
          <div>
            <button
              type="button"
              className={`relative z-20 inline-flex w-full justify-center pl-4 pr-3 py-2 text-[20px] font-medium rounded-lg border border-gray 
              ${openProjectsView ? "bg-[#f0f0f0]" : "bg-white"}
              
              `}
              onClick={() => setOpenProjectsView((prev: any) => !prev)}
            >
              Projects View
              <DownChevron
                className={`h-5 w-5 ml-[10px] my-auto transform transition-all duration-300  ease-in-out
                ${openProjectsView ? "rotate-180 fill-blue" : "rotate-0"}
                `}
              />
            </button>
          </div>
          <Collapse in={openProjectsView} timeout="auto" unmountOnExit>
            <div className="relative -mt-2 pt-2 px-3 z-10 rounded-b-md bg-white border border-gray focus:outline-none">
              <div className="py-1">
                <button
                  className="block w-full px-6 py-2 text-center text-lg border-b border-gray"
                  onClick={() => handleSetAllProjectsView(true)}
                >
                  Expand All
                </button>
                <button
                  className="block w-full px-4 py-2 text-center text-lg "
                  onClick={() => handleSetAllProjectsView(false)}
                >
                  Collapse All
                </button>
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default VotingFilter;
