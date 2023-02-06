type NavBarProps = {
  children?: React.ReactNode;
};

export default function Navbar({ children }: NavBarProps) {
  return <header className="sticky top-0 w-full h-[73.45px] z-40">{children}</header>;
}
