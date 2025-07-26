import { BellIcon, FunnelIcon, UserIcon } from "@phosphor-icons/react";
import { NavLink, useLocation } from "react-router-dom";

export default function TopBar() {
  const location = useLocation();
  const label =
    location.pathname === "/" ? "Explore" : location.pathname.slice(1);

  return (
    <header className="bg-white shadow p-4 justify-between items-center flex">
      <div className="text-xl font-semibold">{label}</div>

      <div className="flex items-center gap-4">
        <FunnelIcon size={24} />
        {/* <BellIcon size={24}/>
                <UserIcon size={24}/> */}

        <NavLink
          to="/login"
          className="
          border-3 border-black rounded-md bg-[var(--primary)] font-bold cursor-pointer w-[100px]  text-center
           hover:bg-black hover:text-white 
          "
        >
          LOGIN
        </NavLink>
      </div>
    </header>
  );
}
