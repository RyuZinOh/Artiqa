import { useAuth } from "../../context/useAuth";
import { getFullUrl } from "../../utils/urlHelpers";
import Layout from "../../components/layouts/layout";
import PleaseRegisterOrLogin from "../PleaseRegisterOrLogin";
import { useState , useEffect} from "react";
import { API_BASE } from "../../utils/api";
import { useParams } from "react-router-dom";

export default function PublicProfile() {
    
    const {auth}  = useAuth();
    const {username}= useParams();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!auth?.token) return;

        const fetchProfile = async () => {
            try {
                const res = await fetch(`${API_BASE}/users/profile/${username}`, {
                    headers: { Authorization: `Bearer ${auth.token}` },
                });
                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.detail || "Failed to fetch profile");
                }
                const data = await res.json();
                setProfile(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [username, auth?.token]);

    if (!auth || !auth.token) return <PleaseRegisterOrLogin />;
    if (loading) return <Layout>Loading...</Layout>;
    if (error) return <Layout>{error}</Layout>;
    if (!profile) return <Layout>No profile found</Layout>;

    const hasBadges = profile.badges && profile.badges.length > 0;



    if(!auth || !auth.token) return <PleaseRegisterOrLogin/>;
    if(!profile) return <Layout>no artists profile found</Layout>
  
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
                    <img src={getFullUrl(profile.profile_picture)}
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

                </div>
              
                {/* Badges */}
                <div className="flex-1 bottom-10 absolute">
                    {hasBadges ? (
                        <div className="flex flex-wrap gap-0">
                            {profile.badges.map((badge, i) => (
                                <img key={i} src={getFullUrl(badge)} className="w-66 -m-8" />
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center w-full">
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

                </div>
    </Layout>

    );
}
