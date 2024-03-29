type ButtonProps = {
  text: string;
  onClick: () => void;
  secondary?: boolean;
  alt?: boolean;
  small?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
};

const Button = ({ text, onClick, secondary, alt, small, icon, disabled }: ButtonProps) => {
  return (
    <button
      className={`transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto 
      
      ${
        secondary
          ? "border border-blue hover:bg-white focus:bg-white text-blue text-lg"
          : alt
          ? "border border-[#dbdbdb] bg-[#e7eaf0] hover:bg-[#dbdbdb] hover:border-[#dbdbdb] focus:bg-[#dbdbdb] text-[#898888] text-lg"
          : `border border-blue bg-blue hover:bg-blue-darkest hover:border-blue-darkest focus:bg-blue-darkest text-white text-lg`
      } 
      
      
      ${small ? "px-3 py-1" : "px-4 py-3"}`}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {icon ? <span className="mr-3">{icon}</span> : null}
      <span>{text}</span>
    </button>
  );
};

export default Button;
