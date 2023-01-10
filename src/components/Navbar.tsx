import { supabase } from "src/lib/supabase";

const Navbar = () => {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log({ error });
    }
  };

  return (
    <div className="h-8 bg-[#102d70] w-full flex justify-between">
      <div className="pl-10 text-white pt-1">Impact Evaluator</div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
