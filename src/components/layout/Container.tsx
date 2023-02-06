type ContainerProps = {
  children?: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return <div className="container mx-auto px-8 py-12 md:py-24">{children}</div>;
}
