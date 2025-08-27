import { AtIcon, CameraIcon, CaretDownIcon, CaretRightIcon, LockIcon, UserIcon } from "@phosphor-icons/react";
import { useState } from "react";
function SettingRow({icon, title, desc, buttonL}){
    return(

        <div className="flex items-center justify-between py-4 border-b-3 border-[var(--border)]">
            <div className="flex items-start gap-3">
                <span className="mt-1 text-[var(--color)]">{icon}</span>
           <div className="flex flex-col">
            <span className="font-semibold text-[var(--color)]">{title}</span>
            <span className="font-semibold text-[var(--color)] opacity-70">{desc}</span>
           </div>
            </div>
           <button className="px-2 py-2 bg-[var(--sbgc)] border-3 border-[var(--border)] cursor-pointer rounded text-[var(--color)] text-lg font-bold hover:bg-[var(--bgc)]">
            {buttonL}
           </button>
        </div>
    )
}

export default function Account(){
    const [expanded, setExpanded] = useState(true);
    return(
        <div className="w-full px-6 mt-10">
            <div 
            className="flex items-center gap-2 cursor-pointer text-3xl font-bold text-[var(--color)] mb-4"
            onClick={()=>setExpanded(!expanded)}>
            <UserIcon size={32}
            className="text-[var(--color)]"
            weight="bold"
            />
            <span className="text-[var(--color)]">Account Settings</span>
             {expanded ? 
            <CaretDownIcon size={32} weight="bold" className="text-[var(--color)]"/> :
             <CaretRightIcon size={32} weight="bold" className="text-[var(--color)]"/>}
        </div>
        {expanded && (
            <div className="mt-4 flex flex-col gap-4">
            {/* //profile picture  */}
            <SettingRow
            icon={<CameraIcon size={22} weight="bold" className="text-[var(--color)"/>}
            title="profile picture"
            desc="Change or update your avatar"
            buttonL="Update Avatar"
            />
            
            {/* email  */}
            <SettingRow
            icon={<AtIcon size={22} weight="bold" className="text-[var(--color)"/>}
            title="Email"
            desc="Change or update your email"
            buttonL="Update Email"
            />

            {/* name  */}
            <SettingRow
            icon={<UserIcon size={22} weight="bold" className="text-[var(--color)"/>}
            title="Full Name"
            desc="Change or update your name"
            buttonL="Update Name"
            />

            {/* password */}
            <SettingRow
            icon={<LockIcon size={22} weight="bold" className="text-[var(--color)"/>}
            title="Password"
            desc="Change or update your password"
            buttonL="Update password"
            />

            {/* backupfood */}
            </div>
        )}
        </div>
    )
}