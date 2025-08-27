import { BellIcon, FunnelIcon} from "@phosphor-icons/react";
import { NavLink, useLocation } from "react-router-dom";
import users from "../../dummy/user.json";
import { getFullUrl } from "../../utils/urlHelpers";
import { useEffect, useRef, useState } from "react";
import currentUser from "../../dummy/current_user.json";

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

  const loggedInUser = currentUser?.username && currentUser.username.trim()!== ""?
  users.find((u)=>u.username === currentUser.username):null;


  

  return (
    <header className="bg-[var(--bgc)] p-4 justify-between items-center flex">
      <div className="text-xl font-semibold text-[var(--color)]">{label}</div>

      <div className="flex items-center gap-4 text-[var(--color)]">
        <FunnelIcon size={24} />
        {loggedInUser ? (
          <>
            <BellIcon size={24} />
            <img
              src={getFullUrl(loggedInUser.profile_picture)}
              alt={loggedInUser.full_name}
              className="w-7 h-7 rounded-full object-cover cursor-pointer drop-shadow-md"
              onClick={toggleMenu}
            />
            {menuOpen &&(
              <div className="absolute right-4 top-12 border-3 shadow-lg rounded-md p-2 w-40 z-50 bg-[var(--sbgc)] text-[var(--color)]">
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
          border-3 border-[var(--border)] rounded-md bg-[var(--sbgc)] font-bold cursor-pointer w-[100px]  text-center text-[var(--color)]"
          >
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
}
