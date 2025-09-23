import { BellIcon} from "@phosphor-icons/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { getFullUrl } from "../../utils/urlHelpers";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/useAuth";
import { useUser } from "../../pages/users/context/UserHoni/useUser";
import { API_BASE } from "../../utils/api";

export default function TopBar() {
  const {auth,userData, logout} = useAuth();
  const {profilePic} = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const label =
    location.pathname === "/" ? "Explore" : location.pathname.slice(1);

    const [menuOpen, setMenuOpen] = useState(false);
    const [notiOpen, setNotiOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    

    const menuRef = useRef(null);
    const notiRef = useRef(null);
    const wsRef = useRef(null);

    
      
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
        const toggleNoti =  ()=> {setNotiOpen(prev=>{
          const newState = !prev;
          if (newState) markAllAsRead();
          return newState;
        });
      };
        
          const handleLogout =()=>{
            logout();
            setMenuOpen(false);
            navigate("/login");
          }

          const fullname = userData?.user?.full_name;


          //notification 
          useEffect(()=>{
            if (!auth?.token){
              setNotifications([]);
              return;
            }
            const fetchNotifications = async()=>{
              try{
                const res = await fetch(`${API_BASE}/notifications/`,{
                  headers: {
                    Authorization: `Bearer ${auth.token}`
                  }
                });
                if(!res.ok) throw new Error("failed to fetch notifications");
                const data = await res.json();
                setNotifications(data);
              }catch(err){
                console.error(err);
              }
            };
            fetchNotifications();
          }, [auth?.token]);

  

          // Connect WebSocket for live notifications
  useEffect(() => {
    if (!auth?.token) return;

    const wsUrl = `${API_BASE.replace(/^http/, 'ws')}/notifications/ws?token=${auth.token}`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => console.log("Connected to notifications WebSocket");
    ws.onmessage = event => {
      const notif = JSON.parse(event.data);
      setNotifications(prev => [notif, ...prev]);
    };
    ws.onclose = () => console.log("Notifications WebSocket closed");

    return () => ws.close();
  }, [auth?.token]);

const markAllAsRead = async () => {
  try {
    await fetch(`${API_BASE}/notifications/read-all`, {
      method: "POST",
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  } catch (err) {
    console.error(err);
  }
};


  return (
    <header className="bg-[var(--bgc)] p-4 justify-between items-center flex">
      <div className="text-xl font-semibold text-[var(--color)]">{label}</div>

      <div className="flex items-center gap-4 text-[var(--color)]">
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
            {notifications.some(n => !n.is_read) && (
  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-0 border border-[var(--border)] bg-[var(--sbgc)]"></span>
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
            {profilePic ?(
              <img
              src={getFullUrl(profilePic)}
              alt={fullname}
              className="w-7 h-7 rounded-full object-cover cursor-pointer drop-shadow-md"
              />
            ): (
              <div className="w-7 h-7 rounded-full flex items-center justify-center">
                {fullname?.[0] || "U"}
              </div>
            )}
           

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
