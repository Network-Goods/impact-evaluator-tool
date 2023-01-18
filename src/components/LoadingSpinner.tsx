const LoadingSpinner = () => {
  return (
    <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 ">
      <div className="border-2 border-y-0 animate-spin  rounded-full border-blue  h-12 w-12"></div>
    </div>
  );
};

export default LoadingSpinner;
