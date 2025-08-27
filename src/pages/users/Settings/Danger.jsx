import { CaretDownIcon, CaretRightIcon, CookieIcon, FileArrowDownIcon, TrashIcon, WarningIcon } from "@phosphor-icons/react";
import { useState } from "react";



function DangerRow({icon, title, desc, buttons}){
    return(
        <div className="flex items-center justify-between py-4 border-b-3 border-[var(--border)]">
            <div className="flex items-start gap-3">
                <span className="mt-1 text-[var(--color)]">{icon}</span>
            <div className="flex flex-col">
                 <span className="font-semibold text-[var(--color)]">{title}</span>
            <span className="font-semibold text-[var(--color)] opacity-70">{desc}</span>
            </div>
            </div>
            <div className="flex gap-2">
                {buttons.map((btn, idx)=>(
                    <button
                key={idx}
                className={`px-4 py-2 border-3 rounded border-[var(--border)] font-semibold text-sm cursor-pointer hover:bg-[var(--bgc)] bg-[var(--sbgc)]
          text-[var(--color)] ${
                    btn.color === "red" ?
                    "bg-red-800 text-[var(--color)] border-red-800"
                    : "bg-[var(--sbgc)] border-[var(--border)] text-[var(--color)]"
                }`}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default function Danger(){
    const [expanded, setExpanded] = useState(true);
    return(
    <div className="w-full px-6 mt-10">
        <div 
            className="flex items-center gap-2 cursor-pointer text-3xl font-bold text-[var(--color)] mb-4"
            onClick={()=>setExpanded(!expanded)}>
            <WarningIcon size={32}
            className="text-[var(--color)]"
            weight="bold"
            />
            <span className="text-[var(--color)]">Danger Zone</span>
             {expanded ? 
            <CaretDownIcon size={32} weight="bold" className="text-[var(--color)]"/> :
             <CaretRightIcon size={32} weight="bold" className="text-[var(--color)]"/>}
        </div>

        {expanded && (
            <div className="mt-2 flex flex-col gap-4">
                <DangerRow
                icon={<FileArrowDownIcon  size={32} weight="bold" className="text-[var(--color)]"/>}
                title="Import/Export Settings"
                desc="Import or export the settings as JSON"
                buttons={
                    [
                        {label: "Import"},
                        {label: "Export"}
                    ]
                }
                />
                
                {/* //deletion  */}
                 <DangerRow
                icon={<TrashIcon  size={32} weight="bold" className="text-[var(--color)]"/>}
                title="Delete Account"
                desc="Permanently delete your account and all data"
                buttons={
                    [
                        {
                            label: "Delete Account",
                            color: "red"
                        }
                    ]
                }
                />

                {/* cookies  */}
                 <DangerRow
                icon={<CookieIcon  size={32} weight="bold" className="text-[var(--color)]"/>}
                title="UPdate Cookie Preference"
                desc="Change how we handle cookies for your account."
                buttons={
                    [
                        {
                            label: "Update Preferences"
                        }
                    ]
                }
                />
            </div>

        )}


    </div>

)}
