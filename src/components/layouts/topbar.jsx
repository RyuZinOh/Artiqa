import { BellIcon, FunnelIcon} from "@phosphor-icons/react";
import { NavLink, useLocation } from "react-router-dom";
import theuser from "../../dummy/user.json";
import { getFullUrl } from "../../utils/urlHelpers";

export default function TopBar() {
  const location = useLocation();
  const label =
    location.pathname === "/" ? "Explore" : location.pathname.slice(1);

  return (
    <header className="bg-white shadow p-4 justify-between items-center flex">
      <div className="text-xl font-semibold">{label}</div>

      <div className="flex items-center gap-4">
        <FunnelIcon size={24} />
        {theuser.is_login ? (
          <>
            <BellIcon size={24} />
            <img
              src={getFullUrl(theuser.profile_picture)}
              alt={theuser.full_name}
              className="w-7 h-7 rounded-full object-cover cursor-pointer drop-shadow-md"
            />
          </>
        ) : (
          <NavLink
            to="/login"
            className="
          border-3 border-black rounded-md bg-[var(--primary)] font-bold cursor-pointer w-[100px]  text-center
           hover:bg-black hover:text-white 
          "
          >
            LOGIN
          </NavLink>
        )}
      </div>
    </header>
  );
}
