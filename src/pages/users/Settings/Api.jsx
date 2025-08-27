import { CaretDownIcon, CaretRightIcon, KeyIcon } from "@phosphor-icons/react";
import { useState } from "react";

export default function Api() {
    const [expanded, setExpanded] = useState(true);

  return (
     <div className="w-full px-6 mt-10">
            <div 
            className="flex items-center gap-2 cursor-pointer text-3xl font-bold text-[var(--color)] mb-4"
            onClick={()=>setExpanded(!expanded)}>
            <KeyIcon size={32}
            className="text-[var(--color)]"
            weight="bold"
            />
            <span className="text-[var(--color)]">Api Keys</span>
             {expanded ? 
            <CaretDownIcon size={32} weight="bold" className="text-[var(--color)]"/> :
             <CaretRightIcon size={32} weight="bold" className="text-[var(--color)]"/>}
        </div>
        {expanded && (
             <div className="flex items-start justify-between py-4 ">
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-[var(--color)]">Generate Your API Key</span>
          <span className="font-semibold text-[var(--color)] opacity-70">
            Create a secure API key to access our services.
          </span>
        </div>

        <button
          className="px-4 py-2 border-3 rounded border-[var(--border)] font-semibold text-sm cursor-pointer hover:bg-[var(--bgc)] bg-[var(--sbgc)]
          text-[var(--color)]
          "
        >
          Generate API Key
        </button>
      </div>
       
       )}
        </div>
       
  );
  
}
