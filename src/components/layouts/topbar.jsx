import { BellIcon, FunnelIcon} from "@phosphor-icons/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { getFullUrl } from "../../utils/urlHelpers";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/useAuth";

export default function TopBar() {
  const {auth, userData, logout} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const label =
    location.pathname === "/" ? "Explore" : location.pathname.slice(1);

    const [menuOpen, setMenuOpen] = useState(false);
    const [notiOpen, setNotiOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    

    const menuRef = useRef(null);
    const notiRef = useRef(null);


    useEffect(()=>{
      if(userData){
        setNotifications([
          {username:"system", message:"welcome to artiqa!", pfp:"/something"}
        ]);
      }else{
        setNotifications([]);
      }
    },[userData]);
      
      useEffect(()=>{
        const handleClickOutside = (e) =>{
          if(
            menuRef.current && !menuRef.current.contains(e.target) &&
            notiRef.current && !notiRef.current.contains(e.target) 
          ){
            setMenuOpen(false);
            setNotiOpen(false);
          }
        };
          document.addEventListener("mousedown", handleClickOutside);
          return() => document.removeEventListener("mousedown", handleClickOutside);
        }, []);

        const toggleMenu =  ()=> setMenuOpen((prev)=>!prev);
        const toggleNoti =  ()=> setNotiOpen((prev)=>!prev);
        
          const handleLogout =()=>{
            logout();
            setMenuOpen(false);
            navigate("/login");
          }

          const profileImg = userData?.user?.profile_pic;
          const fullname = userData?.user?.full_name;
  

  return (
    <header className="bg-[var(--bgc)] p-4 justify-between items-center flex">
      <div className="text-xl font-semibold text-[var(--color)]">{label}</div>

      <div className="flex items-center gap-4 text-[var(--color)]">
        <FunnelIcon size={24} />
        {auth?.token && userData ? (
          <>
          {/* the notifications  */}
          <div className="relative"
          ref={notiRef}
          >
            <BellIcon size={24}
            onClick={toggleNoti}
            className="cursor-pointer"
            />
            {notifications.length>0 && (
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-0 border border-[var(--border)]  bg-[var(--sbgc)]"></span>
            )}
          {notiOpen && (
            <div className="absolute -mr-10 right-2 top-10 w-72 max-h-80 overflow-y-auto shadow-lg rounded-xl p-3 bg-[var(--sbgc)] text-[var(--color)] z-50">
              {notifications.length > 0 ? (
                notifications.map((n,i)=>(
                  <div
                   key={i} 
                  className="flex items-start gap-3 p-2">
                    <img src={getFullUrl(n.pfp || " ")}
                     alt={n.username} 
                    className="w-8 h-8 rounded-full object-cover border border-[var(--border)]" />
                    <div className="flex-1">
                      <p className="text-sm">{n.username}</p>
                      <p className="text-sm">{n.message}</p>
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
          </div>

          <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={toggleMenu}
          ref={menuRef}
          >
             <img
              src={getFullUrl(profileImg || " ")}
              alt={fullname}
              className="w-7 h-7 rounded-full object-cover cursor-pointer drop-shadow-md"
            />
           

            {menuOpen &&(
              <div className="absolute right-4 top-12  shadow-lg rounded-xl p-2 w-40 z-50 bg-[var(--sbgc)] text-[var(--color)]">
                <NavLink
                to="/settings"
                className="block px-4 py-2 text-s hover:font-bold"
                onClick={()=>setMenuOpen(false)}
                >
                  Settings
                  </NavLink>
                  <button 
                  onClick={handleLogout}
                className="block px-4 py-2 text-sm hover:font-bold cursor-pointer"
                  >
                    Logout
                  </button>
              </div>
            )}
            </div>
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
