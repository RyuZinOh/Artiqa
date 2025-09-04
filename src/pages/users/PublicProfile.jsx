
import users from "../../dummy/user.json";
import { getFullUrl } from "../../utils/urlHelpers";
import Layout from "../../components/layouts/layout";
import { useParams } from "react-router-dom";
export default function PublicProfile() {
    const {username} = useParams();
    const user = users.find((u)=>u.username === username)
    return(
     <Layout>
        <div className="w-full min-h-screen flex flex-col drop-shadow-md border-3 border-[var(--border)] relative text-[var(--color)]">
            <div className="w-full h-120 drop-shadow-md"
               style = {{
                backgroundImage:`url(${getFullUrl(user.selected_bg)})`,
                backgroundSize: "cover",
                backgroundPosition:"center",
                }}
                />

                {/* //userpfp  */}
                <div className="absolute left-8 top-[22rem] z-10">
                    <img src={getFullUrl(user.profile_picture)}
                     alt="pfp" 
                     className="w-69 h-69 rounded-full shadow-xl object-cover border-3 border-[var(--border)]"
                     />
                </div>

                {/* //card  */}
                <div className="absolute right-18 top-[4rem] z-10 transform rotate-12">
                    <img src={getFullUrl(user.selected_card)}
                     alt="selected card by user" 
                     className="w-90 h-150  shadow-xl object-cover border-3 border-[var(--border)]"
                     />
                </div>
                
                <div className="flex-1 ml-80">
                    <h2 className="text-xl drop-shadow-md">{user.full_name}{" / "}
                        {user.nationality}
                    </h2>
                    <h2 className="italic drop-shadow-md">
                        "{user.biography}"</h2>
                        <h2 className="drop-shadow-md">Speciality: {user.speciality}</h2>
                        <h2 className="drop-shadow-md">Contact:{
                             " "} 
                            <span className="text-blue-500">{user.email}</span></h2>
                        <h2 className="drop-shadow-md">Joined At: {user.joined_date}</h2>
                </div>
                <div className="flex-1 bottom-10 absolute">
                    <h1 className="font-bold text-4xl drop-shadow-md pl-6 mb-4">BADGES</h1>
                    <div className="flex flex-wrap gap-0">{user.badges.map((badge,i)=>(
                        <img 
                        key={i}
                        src={getFullUrl(badge)}
                        className="w-44 -m-8"
                        />

                    ))}
                    </div>
                </div>
         

         {/* top  */}
         <div className="absolute bottom-4 right-4 ">
            Top [x%] 
            {/* //yet to determine, This will be done after over all Leaderboarding but this as a placeholder for now */}
         </div>

                </div>
    </Layout>

    );
}
