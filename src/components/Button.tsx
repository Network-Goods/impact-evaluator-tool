type ButtonProps = {
  text: string;
  onClick: () => void;
  secondary?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
};

const Button = ({ text, onClick, secondary, icon, disabled }: ButtonProps) => {
  return (
    <button
      className={` transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto ${
        secondary
          ? "px-3 py-1 border border-[#dbdbdb] bg-[#e7eaf0] hover:bg-[#dbdbdb] hover:border-[#dbdbdb] focus:bg-[#dbdbdb] text-[#898888] text-lg"
          : "px-4 py-[6px] border border-[#156ff7] bg-[#156ff7] hover:bg-[#002256] hover:border-[#002256] focus:bg-[#002256] text-white text-lg"
      }}`}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {icon ? <span className="mr-3">{icon}</span> : null}
      <span>{text}</span>
    </button>
  );
};

export default Button;
