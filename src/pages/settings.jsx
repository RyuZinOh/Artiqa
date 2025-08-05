import {EyeIcon,HouseIcon, PaletteIcon, PlugsConnectedIcon, UserIcon,WarningIcon,CaretDownIcon,CaretUpIcon} from "@phosphor-icons/react";
import TopBar from "../components/layouts/topbar";
import { NavLink } from "react-router-dom";
import { themes } from "../theme";
import { ThemeContext } from "../theme/Themecontext";
import { useContext, useRef, useState } from "react";

export default function Settings() {
  const { theme, setTheme } = useContext(ThemeContext);
  const themeRef = useRef(null);
  const [showThemes, setShowThemes] = useState(true);

  return (
    <div className="flex flex-col h-screen">
      <TopBar />

      {/* nav Bar */}
      <div className="flex flex-col items-center mt-10 gap-6 ]">
        <div className="flex flex-wrap border-3 bg-[var(--primary)] border-black drop-shadow-md px-6 py-2 gap-6 justify-center ">
          <NavItem icon={<HouseIcon size={24} />} label="Home" to="/" />
          <NavItem icon={<UserIcon size={24} />} label="Account" />
          <NavItem icon={<PaletteIcon size={24} />} label="Themes" />
          <NavItem icon={<EyeIcon size={24} />} label="Appearance" />
          <NavItem icon={<PlugsConnectedIcon size={24} />} label="API" />
          <NavItem icon={<WarningIcon size={24} />} label="Danger-Zone" />
        </div>

        <div className="w-full px-6">
          <div
            onClick={() => setShowThemes(!showThemes)}
            className="flex items-center gap-2 cursor-pointer text-3xl font-bold hover:underline mt-10"
          >
            
            <PaletteIcon size={32} weight="bold" />
            
            <span>Themes</span>
            {showThemes ? 
            <CaretUpIcon size={32} weight="bold"/> :
             <CaretDownIcon size={32} weight="bold"/>
            }
          </div>

        {/* themes selection */}
        <div className="flex justify-center mt-5">

        {showThemes && (
          <div
            ref={themeRef}
            className="grid grid-cols-5 gap-3  items-center"
          >
            {Object.entries(themes).map(([name, colors]) => {
              const isActive = Object.entries(theme).every(
                ([key, val]) => colors[key] === val
              );

              return (
                <div
                  key={name}
                  onClick={() => setTheme(colors)}
                  className={`cursor-pointer border-3 rounded-md px-3 py-3  flex flex-col items-center justify-center 
                    ${
                      isActive
                        ? "border-black font-bold"
                        : " "
                    }`}
                  style={{
                    backgroundColor: colors["--primary"],
                    color: "black",
                    width: "305px",
                    height: "60px",
                  }}
                >
                  <div className="mb-1 text-xl">{name}</div>
                </div>
              );
            })}
          </div>
        )}
        </div>
      </div>
    </div>
    </div>

  );
}

function NavItem({ icon, label, to }) {
  const content = (
    <div className="flex items-center gap-1 hover:font-bold cursor-pointer ">
      {icon}
      <span>{label}</span>
    </div>
  );
  return to ? <NavLink to={to}>{content}</NavLink> : content;
}
