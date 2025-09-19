import { NavLink } from "react-router-dom";
import Layout from "../../../components/layouts/layout";
import { useTheme } from "../../../theme/useTheme";
import { getFullUrl } from "../../../utils/urlHelpers";
import usePortfolio from "./context/portfolio/userPortfolio";
export default function Portfolio() {
    const {theme} = useTheme();
    const {profile}  = usePortfolio();
   
    if (!profile) return <Layout>No profile found.</Layout>
    const hasBadges = profile.badges && profile.badges.length> 0;

    return(
     <Layout>
        <div className="w-full min-h-screen flex flex-col drop-shadow-md border-3 border-[var(--border)] relative text-[var(--color)]">
            <div className="w-full h-120 drop-shadow-md"
               style = {{
                backgroundImage:`url(${getFullUrl(profile.selected_background)})`,
                backgroundSize: "cover",
                backgroundPosition:"center",
                }}
                />

                {/* //userpfp  */}
                <div className="absolute left-8 top-[22rem] z-10">
                    <img src={getFullUrl(profile?.profile_picture) }
                     alt="pfp" 
                     className="w-69 h-69 rounded-full shadow-xl object-cover border-3 border-[var(--border)]"
                     />
                </div>

                {/* //card  */}
                <div className="absolute right-18 top-[4rem] z-10 transform rotate-12">
                    <img src={getFullUrl(profile.selected_card)}
                     alt="selected card by user" 
                     className="w-90 h-150  shadow-xl object-cover border-3 border-[var(--border)]"
                     />
                </div>
                
                <div className="flex-1 ml-80">





                    <h2 className="text-xl drop-shadow-md">{profile.full_name}{" / "}
                        {profile.nationality}
                    </h2>
                    <h2 className="italic drop-shadow-md">
                        "{profile.biography}"</h2>
                        <h2 className="drop-shadow-md">Contact:{
                             " "} 
                            <span className="text-blue-500">{profile.email}</span></h2>
                        <h2 className="drop-shadow-md">Specialty:{
                             " "} 
                            <span>{profile.speciality}</span></h2>
                        
                        <h2 className="drop-shadow-md">Joined At: {new Date(profile.joined_date).toLocaleDateString()}</h2>
                        

                        <NavLink
                        to="/portfolio/gallery"
                        className="text-sm text-[var(--primary)] mt-1 inline-block hover:underline"
                        style={{
                            color: theme["--color"]
                        }}
                        >View Gallery
                        </NavLink>
                </div>

                <div className="flex-1 bottom-10 absolute">
                    {hasBadges ? (
                         <div className="flex flex-wrap gap-0">{profile.badges.map((badge,i)=>(
                        <img 
                        key={i}
                        src={getFullUrl(badge)}
                        className="w-66 -m-8"
                        />
                    ))}
                    </div>
                    ):(
                          <div className="flex items-center justify-center w-full ">
              <div className="text-center p-8 border-3 border-dashed border-[var(--border)] rounded-lg ml-2">
                <p className="text-xl text-gray-500">No badges yet</p>
                <p className="text-sm text-gray-400 mt-2">
                  Earn badges by completing achievements
                </p>
              </div>
            </div>

             )}
            </div>
       
                    
         {/* top  */}
         <div className="absolute bottom-4 right-4 ">
            Top [x%] 
            {/* //yet to determine, This will be done after over all Leaderboarding but this as a placeholder for now */}
         </div>

         <div className="absolute bottom-10 right-4 font-bold text-[var(--color)]">
                    <NavLink to={`/profile/${profile.username}`}>
        Public View
    </NavLink>

         </div>
         </div>
    </Layout>
    );
}
