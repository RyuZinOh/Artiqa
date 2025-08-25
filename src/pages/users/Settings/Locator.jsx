import {EyeIcon,HouseIcon, PaletteIcon, PlugsConnectedIcon, UserIcon,WarningIcon,} from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";


function NavItem({ icon, label, to }) {
  const content = (
    <div className="flex items-center gap-1 cursor-pointer ">
      {icon}
      <span>{label}</span>
    </div>
  );
  return to ? <NavLink to={to}>{content}</NavLink> : content;
}

export default function Locator(){
    return (
      <div className="flex flex-col  items-center mt-10 gap-6 text-[var(--color)]">

        <div className="flex flex-wrap border-3 border-[var(--border)] drop-shadow-md px-6 py-2 gap-6 justify-center ">
          <NavItem icon={<HouseIcon size={24} />} label="Home" to="/" />
          <NavItem icon={<UserIcon size={24} />} label="Account" />
          <NavItem icon={<PaletteIcon size={24} />} label="Themes" />
          <NavItem icon={<EyeIcon size={24} />} label="Appearance" />
          <NavItem icon={<PlugsConnectedIcon size={24} />} label="API" />
          <NavItem icon={<WarningIcon size={24} />} label="Danger-Zone" />
        </div>
        </div>
    );
}
