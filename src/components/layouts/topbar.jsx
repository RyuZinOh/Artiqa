import { BellIcon, FunnelIcon} from "@phosphor-icons/react";
import { NavLink, useLocation } from "react-router-dom";
import users from "../../dummy/user.json";
import notifications from "../../dummy/noti_samp.json";
import { getFullUrl } from "../../utils/urlHelpers";
import { useEffect, useRef, useState } from "react";
import currentUser from "../../dummy/current_user.json";

export default function TopBar() {
  const location = useLocation();
  const label =
    location.pathname === "/" ? "Explore" : location.pathname.slice(1);

    const [menuOpen, setMenuOpen] = useState(false);
    const [notiOpen, setNotiOpen] = useState(false);

    const menuRef = useRef(null);
    const notiRef = useRef(null);
    
    const toggleMenu = ()=> {
      setMenuOpen((prev)=> !prev);
      setNotiOpen(false);
    }

    //notification toggle
    const toggleNoti =()=>{
      setNotiOpen((prev) => !prev);
      setMenuOpen(false);
    }


    useEffect(()=>{
      function handleClickOutside(e){
        if (menuRef.current && !menuRef.current.contains(e.target)
        && notiRef.current && !notiRef.current.contains(e.target)
        ){
          setMenuOpen(false);
          setNotiOpen(false);
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
          {/* the notifications  */}
          <div className="relative cursor-pointer"
          onClick={toggleNoti}
          >
            <BellIcon size={24} />
            {notifications.length>0 && (
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-0 border border-[var(--border)]  bg-[var(--sbgc)]"></span>
            )}
          </div>
          {notiOpen && (
            <div className="absolute right-4 top-12 w-72 max-h-80 overflow-y-auto shadow-lg rounded-xl p-3 bg-[var(--sbgc)] text-[var(--color)] z-50">
              {notifications.length > 0 ? (
                notifications.map((n,i)=>(
                  <div
                   key={i} 
                  className="flex items-start gap-3 p-2">
                    <img src={getFullUrl(n.pfp)} alt={n.username} 
                    className="w-8 h-8 rounded-full object-cover border border-[var(--border)]" />
                    <div className="flex-1">
                      <p className="text-sm">{n.username}</p>
                      <p className="text-sm">{n.Stuff}</p>
                    </div>

                  </div>
                ))
              ):(
                <p className="text-sm text-center text-[var(--color)]">
                  No notifications
                </p>
              )}


            </div>
          )}
            <img
              src={getFullUrl(loggedInUser.profile_picture)}
              alt={loggedInUser.full_name}
              className="w-7 h-7 rounded-full object-cover cursor-pointer drop-shadow-md"
              onClick={toggleMenu}
            />
            {menuOpen &&(
              <div className="absolute right-4 top-12  shadow-lg rounded-xl p-2 w-40 z-50 bg-[var(--sbgc)] text-[var(--color)]">
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
