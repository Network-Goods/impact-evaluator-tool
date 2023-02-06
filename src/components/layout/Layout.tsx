type LayoutProps = {
  children?: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div
      className="w-full min-h-screen h-full bg-[#fafafa] text-offblack flex flex-col relative"
      onDragOver={(evt) => evt.preventDefault()}
      onDrop={(evt) => evt.preventDefault()}
    >
      {children}
    </div>
  );
}
