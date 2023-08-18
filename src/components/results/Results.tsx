import { useState, useEffect } from "react";
import LoadingSpinner from "src/components/shared/LoadingSpinner";
import { useResultsStore } from "./ResultsStore";
import Title from "src/components/shared/Title";
import SmallTitle from "src/components/shared/SmallTitle";

enum RoundStatus {
  "draft" = "Draft",
  "staging" = "Staging",
  "started" = "In Progress",
  "closed" = "Closed",
}

export default function Results() {
  const store = useResultsStore();

  useEffect(() => {
    store.load();
  }, [store.fetching]);

  if (store.fetching) return <LoadingSpinner />;
  if (store.error) return <p>Oh no... {store.error.message}</p>;

  return (
    <>
      <div className="pb-20">
        <Title text="Evaluation Results" />
      </div>
      {store.evaluations.length !== 0 ? (
        <>
          <div className="hidden md:flex justify-between items-center py-2 px-9 bg-[#f0f0f0] border border-gray rounded-t-lg">
            <div className="py-2">
              <SmallTitle text="ROUND" />
            </div>
            <div className="flex">
              <div className="pr-7 py-2 text-center min-w-[109px]">
                <SmallTitle text="STATUS" />
              </div>

              <div className="text-center py-2 border-l border-gray pl-9 min-w-[121px]">
                <SmallTitle text="ACTION" />
              </div>
            </div>
          </div>
          {store.evaluations.map((evaluation: any, idx: number) => (
            <div key={evaluation.id}>
              <div
                className={`flex flex-col md:flex-row justify-between items-center px-9 bg-white border border-gray py-4 md:py-0 ${
                  idx === store.evaluations.length - 1 ? "rounded-b-lg" : ""
                }
                ${idx === 0 ? "rounded-t-lg md:rounded-t-none border-t md:border-t-0" : "border-t-0"}
                
                `}
              >
                <div className="">
                  <div className="text-[20px] text-charcoal pb-4 md:py-[21.5px] text-center">{evaluation.name}</div>
                </div>
                <div className="flex items-center">
                  <div className="pr-4 md:pr-7 text-center min-w-[109px]">
                    <div className="text-blue text-xs italic">
                      {RoundStatus[evaluation.status as keyof typeof RoundStatus]}
                    </div>
                  </div>
                  <div className="pl-4 md:pl-10 border-l border-gray">
                    <button onClick={() => store.getEvaluationResult(evaluation.id)}>
                      <div className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto  border border-blue bg-blue hover:bg-blue-darkest hover:border-blue-darkest  text-white text-sm md:text-base py-1 w-16 md:w-20">
                        Export
                      </div>
                    </button>
                    <button onClick={() => store.getEvaluationSubmissions(evaluation.id)}>
                      <div className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto  border border-blue bg-blue hover:bg-blue-darkest hover:border-blue-darkest  text-white text-sm md:text-base py-1 w-16 md:w-20">
                        Submissions
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="border border-gray rounded-lg bg-gray-lighter">
          <div className="w-full min-h-[165px] flex justify-center items-center">
            <span className="text-lg text-[#4a4a4a]">No evaluations found</span>
          </div>
        </div>
      )}
    </>
  );
}
