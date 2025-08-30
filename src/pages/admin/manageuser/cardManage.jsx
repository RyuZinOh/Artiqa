import { getFullUrl } from "../../../utils/urlHelpers";
import { BellIcon,  XIcon } from "@phosphor-icons/react";




//user card, for actual user management -> includes:
// account delete = pending
// account notify = done
// account view = done
//its usually user realted to his art and creation wont be counted individually but as an whole we still keep track of them [ps: specific art related stuff will be managed in art management for superuser instead]

export default function CardManage({user, onClose}){
    return(
        <div className="relative bg-[var(--sbgc)] drop-shadow-md border-3 w-96 border-[var(--border)] flex flex-col text-[var(--color)]">

            <div className="h-28  bg-cover bg-center"
            style={{
                backgroundImage: `url(${getFullUrl(user.selected_bg)})`
            }}
            >
            </div>
            <button className="absolute top-2 right-2">
                <XIcon size={24}
                weight="bold"
                className="text-[var(--color)] cursor-pointer hover:bg-[var(--bgc)]  bg-[var(--sbgc)] rounded-full"
                onClick={onClose}
                />
            </button>

            <div className="flex px-4 gap-4 -mt-12">
                <div className="w-1/2">
                <img
                src={getFullUrl(user.profile_picture)}
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
              <h2 className="text-xl font-bold " font-bold>{user.full_name}</h2>
                <h2  font-bold>@{user.username}</h2>
                <p className="text-sm" font-bold>{user.biography}</p>
                </div>

                <div className="ml-20 flex flex-col gap-2 mt-28 text-sm">
                    <p>{user.gender}</p>
                    <p>{user.role}</p>
                    <p>{user.nationality}</p>
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
                className="p-2 bg-[var(--bgc)] border-3 rounded-lg border-[var(--border)]"
                >
                    <BellIcon size={20 } weight="bold"className="text-[var(--color)] cursor-pointer"
                    />
                </button>


            </div>

            
        </div>
    )

}