import { BellIcon, FunnelIcon, UserIcon } from "@phosphor-icons/react";

export default function TopBar(){
    return (
        <header className="bg-white shadow p-4 justify-between items-center flex">
            <div className="text-xl font-semibold">Explore</div>
            <div className="flex items-center gap-4">
                <FunnelIcon size={24}/>
                <BellIcon size={24}/>
                <UserIcon size={24}/>
            </div>
        </header>
    );
}