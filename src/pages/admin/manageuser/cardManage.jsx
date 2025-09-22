import { getFullUrl } from "../../../utils/urlHelpers";
import { BellIcon,  HammerIcon,  XIcon } from "@phosphor-icons/react";
import { API_BASE } from "../../../utils/api";
import { useAuth } from "../../../context/useAuth";
import { useEffect, useState } from "react";



export default function CardManage({user, onClose, oUPd}){
    const {auth} = useAuth();
    const [isBanned, setIsBanned] = useState(user.is_banned || false);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setIsBanned(user.is_banned || false);
    }, [user]);

    const handleBanToggle = async()=>{
        if(!auth?.token ) return;
        setLoading(true);
        const start = Date.now();
        try{
            const endpoint = isBanned ? 
            `${API_BASE}/admin/unban/${user.id}` : `${API_BASE}/admin/ban/${user.id}`;
            const payload = isBanned? null: {duration_hours: 24, reason: "fuck around and find  out"};

            const res = await fetch(endpoint,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.token}`,
                },
                body: payload? JSON.stringify(payload):null,  
            });
            if(!res.ok){
                const err = await res.json();
                throw new Error(err.detail || "faild to update the state");
            }
            const elapsed = Date.now() - start;
            if (elapsed < 300) await new Promise(r=> setTimeout(r, 300-elapsed));
            setIsBanned(!isBanned);
            if(oUPd) oUPd(user.id, !isBanned);

        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    };

    return( 
        <div className="mt-2 relative bg-[var(--sbgc)] drop-shadow-md  w-81 rounded-xl shadow flex flex-col text-[var(--color)]">

            <div className="h-28  bg-cover bg-center rounded-t-xl"
            style={{
                backgroundImage: `url(${getFullUrl(user.selected_bg)})`
            }}
            >
            </div>
            <button className="absolute top-2 right-2 shadow drop-shadow-md">
                <XIcon size={24}
                weight="bold"
                className="text-[var(--color)] cursor-pointer hover:bg-[var(--bgc)]  bg-[var(--sbgc)] rounded-full"
                onClick={onClose}
                />
            </button>

            <div className="flex px-4 gap-4 -mt-12">
                <div className="w-1/2">
                <img
                src={getFullUrl(user.profile_pic)}
                alt={user.username}
                className="w-24 h-24 rounded-full border-3 border-[var(--sbgc)] object-cover"
                />
                {user.badges.length >0 && (
                    <div className="flex gap-2 mb-2">
                        {user.badges.map((badge, idx)=> (
                   <img
                src={getFullUrl(badge)}
                alt={`Badge ${idx}`}
                className="w-10 h-10 rounded-full border-2 border-[var(--border)]"
                />
                ))}
                </div>
            )}
              <h2 className="text-[16px] font-bold " font-bold>{user.full_name}</h2>
                <h2 className="text-[14px]">@{user.username}</h2>
                <p className="italic text-[12px]">{user.biography}</p>
                </div>

                <div className="flex flex-col mt-28 text-sm">
                <HammerIcon
              size={48}
              className={`top-0 -mt-10 border-3 rounded-full ml-26 mb-8 p-2 cursor-pointer transition-all duration-300 ease-in-out
                ${isBanned ? "bg-red-500 text-white border-red-700" : "bg-[var(--bgc)] border-[var(--border)] text-[var(--color)]"}
                ${loading ? "animate-spin" : ""}`}
              onClick={!loading ? handleBanToggle : undefined}
            />
               <p className="ml-20 font-bold text-sm">{isBanned ? "Banned" : "Active"}</p>
       
                    <p className="ml-20">{user.gender}</p>
                    <p className="ml-20">{user.role}</p>
                    <p className="ml-20">{user.nationality}</p>
                </div>
            </div>
            <div className="grid grid-cols-3 mb-2 gap-2 text-center text-sm px-8 pt-6">
                <div>
                    <p className="font-bold">{user.total_arts}</p>
                    <p>Arts</p>
                </div>   <div>
                    <p className="font-bold">{user.total_wins}</p>
                    <p>Wins</p>
                </div>   <div>
                    <p className="font-bold">{user.level}</p>
                    <p>Level</p>
                </div>
            </div>
{/* we will send notification through here to the user  */}

            <div className="mt-auto flex items-center px-4 py-3 border-t-2 border-[var(--border)] gap-2">
                <input type="text"
                placeholder="Send notification..."
                className="flex-1 px-3 py-2 rounded-lg border-3 border-[var(--border)]"

/>
                <button
                className="p-2 bg-[var(--bgc)] border-3 rounded-lg border-[var(--border)] cursor-pointer"
                >
                    <BellIcon size={20 } weight="bold"className="text-[var(--color)] "
                    />
                </button>


            </div>

            
        </div>
    )

}