import { NavLink } from "react-router-dom";
import {
  ArrowLeftIcon,
  ChatTeardropTextIcon,
  CompassIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  PaintBrushIcon,
  PresentationIcon,
  RankingIcon,
  UserIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";
import { CalendarCheckIcon } from "@phosphor-icons/react/dist/ssr";
import mockUser from "../../dummy/user.json";
export default function SideBar() {
  const navLinks = [
    { name: "Explore", to: "/", icon: <CompassIcon size={32} /> },
    { name: "Likes", to: "/likes", icon: <HeartIcon size={32} /> },
    { name: "Top", to: "/top", icon: <RankingIcon size={32} /> },
    {
      name: "Comments",
      to: "/comments",
      icon: <ChatTeardropTextIcon size={32} />,
    },
    { name: "Weekly", to: "/weekly", icon: <CalendarCheckIcon size={32} /> },
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
    { name: "Portfolio", to: "/potfolio", icon: <UserIcon size={32} /> },
    {
      name: "Collaboration",
      to: "/collaboration",
      icon: <UsersThreeIcon size={32} />,
    },
  ];

  return (
    <aside className="w-1/5 bg-[var(--primary)] text-black p-4 flex flex-col border-r-3 border-black">
      <h2 className="text-5xl font-bold mb-4 drop-shadow-md ">ARITQA</h2>

      {/* searchbar */}
      <div className="relative mb-4">
        <input
          type="search"
          placeholder="Search..."
          className="w-full p-3 pr-10 rounded-full border-3 bg-white border-black drop-shadow-md  transition duration-200 focus:outline-none focus:ring-2 focus:ring-black"
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
                className={`flex gap-x-2  text-2xl items-center group
                    ${isActive ? "font-semibold" : "hover:font-semibold"}
                    `}
              >
                <span className="text-black">{link.icon}</span>
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
      {mockUser.role === "artist" && (
        <>
          <h3 className="mt-40 font-bold text-lg">Artistry</h3>
          <nav className="space-y-2 mt-1">
            {Artistry.map((link) => (
              <NavLink key={link.name} to={link.to}>
                {({ isActive }) => (
                  <div
                    className={`flex gap-x-2  text-2xl items-center group
                    ${isActive ? "font-semibold" : "hover:font-semibold"}
                    `}
                  >
                    <span className="text-black">{link.icon}</span>
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
