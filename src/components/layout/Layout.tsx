type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      className="w-full min-h-screen h-full bg-[#fafafa] flex flex-col relative"
      onDragOver={(evt) => evt.preventDefault()}
      onDrop={(evt) => evt.preventDefault()}
    >
      {children}
    </div>
  );
};

export default Layout;
