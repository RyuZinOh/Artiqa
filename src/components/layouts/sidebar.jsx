import { NavLink } from "react-router-dom";
import { getFullUrl } from "../../utils/urlHelpers";
import {
  ArrowLeftIcon,
  BoxingGloveIcon,
  CalendarCheckIcon,
  ChatTeardropTextIcon,
  CompassIcon,
  HeartIcon,
  KanbanIcon,
  ListChecksIcon,
  MagnifyingGlassIcon,
  PaintBrushIcon,
  PresentationIcon,
  RankingIcon,
  SwordIcon,
  UserIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";
import users from "../../dummy/user.json";
import { useTheme } from "../../theme/useTheme";
import currentUser from "../../dummy/current_user.json";

export default function SideBar() {
  const {theme} = useTheme();
  const sbgurl = theme["--sbgurl"];
  const opacity = theme["--opacity"];
  const blur = theme["--blur"];

  const loggedInUser = currentUser?.username && currentUser.username.trim()!== ""?
  users.find((u)=>u.username === currentUser.username):null;


  const navLinks = [
    { name: "Explore", to: "/Explore", icon: <CompassIcon size={32} /> },
    { name: "Likes", to: "/Likes", icon: <HeartIcon size={32} /> },
    { name: "Top", to: "/Top", icon: <RankingIcon size={32} /> },
    {
      name: "Comments",
      to: "/Comments",
      icon: <ChatTeardropTextIcon size={32} />,
    },
    { name: "Weekly", to: "/Weekly", icon: <CalendarCheckIcon size={32} /> },
  ];

  const Artistry = [
    {
      name: "Management",
      to: "/management",
      icon: <PaintBrushIcon size={32} />,
    },
    {
      name: "Statistics",
      to: "/statistics",
      icon: <PresentationIcon size={32} />,
    },
    { name: "Portfolio", to: "/portfolio", icon: <UserIcon size={32} /> },
    {
      name: "Collaboration",
      to: "/collaboration",
      icon: <UsersThreeIcon size={32} />,
    },
  ];


  const superuser = [
    {
      name: "Artist Requests",
      to: "/Review-Artists",
      icon: <ListChecksIcon size={32} />
    },
    {
      name: "Manage Weekly",
      to: "/Manage-Weekly",
      icon: <SwordIcon size={32} />
    },
    {
      name: "Manage Users",
      to: "/Manage-Users",
      icon: <KanbanIcon size={32} />
    },
    {
      name: "Moderate Arts",
      to: "/Moderate-Arts",
      icon: <BoxingGloveIcon size={32} />
    },
  ]
  return (
    
    <aside className="w-1/5 overflow-hidden text-[var(--border)] p-4 flex flex-col border-r-3 relative"
    style={
      {
        backgroundColor: sbgurl && sbgurl!== "none"
        ? "none": `var(--sbgc)`

      }
    }
    >
      {sbgurl && sbgurl!== "none" && ( 
      <div className="absolute inset-0"
      style={{
        backgroundImage: `url(${getFullUrl(sbgurl)})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        filter: `blur(${blur})`,
        opacity: opacity,
        zIndex:-1
      }}
      />
  )}
  
      <h2 className="text-5xl font-bold mb-4 drop-shadow-md  text-[var(--color)]">ARITQA</h2>

      {/* searchbar */}
      <div className="relative mb-4">
        <input
          type="search"
          placeholder="Search..."
          className="w-full p-3 pr-10 rounded-full bg-[var(--bgc)] border-3 text-[var(--color)] border-[var(--border)] drop-shadow-md  transition duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--border)] "
        />
        <MagnifyingGlassIcon
          size={28}
          weight="regular"
          className="absolute right-3 top-1/2 -translate-y-1/2"
        />
      </div>
      <nav className="space-y-2">
        {navLinks.map((link) => (
          <NavLink key={link.name} to={link.to}>
            {({ isActive }) => (
              <div
                className={`flex gap-x-2 text-[var(--color)] text-2xl items-center group
                    ${isActive ? "font-semibold" : "hover:font-semibold"}
                    `}
              >
                <span >{link.icon}</span>
                <span>{link.name}</span>
                <ArrowLeftIcon
                  size={32}
                  className={`transition-opacity duration-150
                ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }
                `}
                />
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* //this one is accessble after becoming artist request is approved but as this frontend defense first so we arent integrating backend for those logics */}
      {loggedInUser?.role === "artist" && (
        <>
          <h3 className="mt-40 font-bold text-lg text-[var(--color)]">Artistry</h3>
          <nav className="space-y-2 mt-1">
            {Artistry.map((link) => (
              <NavLink key={link.name} to={link.to}>
                {({ isActive }) => (
                  <div
                    className={`flex gap-x-2 text-[var(--color)] text-2xl items-center group
                    ${isActive ? "font-semibold" : "hover:font-semibold"}
                    `}
                  >
                    <span>{link.icon}</span>
                    <span>{link.name}</span>
                    <ArrowLeftIcon
                      size={32}
                      className={`transition-opacity duration-150
                ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }
                `}
                    />
                  </div>
                )}
              </NavLink>
            ))}
          </nav>
        </>
      )}
   
   {/* //for superuser or admin  */}
      {loggedInUser?.role === "superuser" && (
        <>
          <h3 className="mt-40 font-bold text-lg text-[var(--color)]">Admin / Superuser</h3>
          <nav className="space-y-2 mt-1">
            {superuser.map((link) => (
              <NavLink key={link.name} to={link.to}>
                {({ isActive }) => (
                  <div
                    className={`flex gap-x-2 text-[var(--color)] text-2xl items-center group
                    ${isActive ? "font-semibold" : "hover:font-semibold"}
                    `}
                  >
                    <span>{link.icon}</span>
                    <span>{link.name}</span>
                    <ArrowLeftIcon
                      size={32}
                      className={`transition-opacity duration-150
                ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }
                `}
                    />
                  </div>
                )}
              </NavLink>
            ))}
          </nav>
        </>
      )}
   
   
    </aside>
  );
}
