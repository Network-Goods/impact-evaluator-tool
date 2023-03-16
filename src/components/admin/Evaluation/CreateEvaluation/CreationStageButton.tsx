type CreationStageButtonProps = {
  idx: number;
  page: number;
  setPage: (page: number) => void;
  label: string;
};
export default function CreationStageButton({ idx, page, setPage, label }: CreationStageButtonProps) {
  const isActive = page === idx;
  return (
    <button onClick={() => setPage(idx)} className="w-[100px]">
      <div className="flex flex-col items-center mb-4">
        <div
          className={`rounded-full h-8 w-8 flex justify-center items-center text-white font-bold ${
            isActive ? "bg-blue-alt" : "bg-[#D9D9D9]"
          }`}
        >
          {idx + 1}
        </div>
        <h2 className={`text-xl ${isActive ? "text-blue-alt" : "text-[#D9D9D9]"}`}>{label}</h2>
      </div>
    </button>
  );
}
