import {EyeIcon,HouseIcon, PaletteIcon, PlugsConnectedIcon, UserIcon,WarningIcon,} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";


function NavItem({ icon, label, to }) {

  const navigate = useNavigate();

  const handleClick = () =>{
    if (!to) return;
    if (to == "xxx"){
      navigate("/");
      return;
    }

    const element = document.getElementById(to);
    if (element){
      element.scrollIntoView({behavior:"smooth"});
    }
  }

  return (
    <div className="flex items-center gap-1 cursor-pointer"
    onClick={handleClick}
    >{icon}
    <span>{label}</span>
    </div>
  )
}

export default function Locator(){
    return (
      <div className="flex flex-col  items-center mt-10 gap-6 text-[var(--color)]">
        <div className="flex flex-wrap border-3 border-[var(--border)] drop-shadow-md px-6 py-2 gap-6 justify-center ">
          <NavItem icon={<HouseIcon size={24} />} label="Home" to="xxx" />
          <NavItem icon={<UserIcon size={24} />} label="Account"  to="Account"/>
          <NavItem icon={<PaletteIcon size={24} />} label="Themes" to="Theme"/>
          <NavItem icon={<EyeIcon size={24} />} label="Appearance" to="Appearance"/>
          <NavItem icon={<PlugsConnectedIcon size={24} />} label="API" to="API"/>
          <NavItem icon={<WarningIcon size={24} />} label="Danger-Zone" to="Danger-Zone" />
        </div>
        </div>
    );
}
