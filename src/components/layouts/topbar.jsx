import { BellIcon, FunnelIcon} from "@phosphor-icons/react";
import { NavLink, useLocation } from "react-router-dom";
import theuser from "../../dummy/user.json";
import { getFullUrl } from "../../utils/urlHelpers";
import { useEffect, useRef, useState } from "react";

export default function TopBar() {
  const location = useLocation();
  const label =
    location.pathname === "/" ? "Explore" : location.pathname.slice(1);

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    
    const toggleMenu = ()=> setMenuOpen((prev)=> !prev);


    useEffect(()=>{
      function handleClickOutside(e){
        if (menuRef.current && !menuRef.current.contains(e.target)){
          setMenuOpen(false);
        }
      }
      document.addEventListener("mousedown",handleClickOutside);
      return ()=> document.removeEventListener("mousedown",handleClickOutside);
    },[]);


  


  return (
    <header className="bg-white p-4 justify-between items-center flex">
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
              onClick={toggleMenu}
            />
            {menuOpen &&(
              <div className="absolute right-4 top-12 border-3 shadow-lg rounded-md p-2 w-40 z-50 bg-[var(--primary)]">
                <NavLink
                to="/settings"
                className="block px-4 py-2 text-s hover:font-bold"
                >
                  Settings
                  </NavLink>
                  <NavLink 
                  to="/login"
                className="block px-4 py-2 text-sm hover:font-bold"
                  >
                    Logout
                  </NavLink>
              </div>
            )}
          </>
        ) : (
          <NavLink
            to="/login"
            className="
          border-3 border-black rounded-md bg-[var(--primary)] font-bold cursor-pointer w-[100px]  text-center
           hover:bg-black hover:text-white 
          "
          >
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
}
