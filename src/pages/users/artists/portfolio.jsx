import Layout from "../../../components/layouts/layout";
import mockUser from "../../../dummy/user.json";
import { useTheme } from "../../../theme/useTheme";
import { getFullUrl } from "../../../utils/urlHelpers";

export default function Portfolio() {
    const {theme} = useTheme();
    return(
     <Layout>
        <div className="w-full min-h-screen flex flex-col drop-shadow-md border-3 border-[var(--border)] relative text-[var(--color)]">
            <div className="w-full h-120 drop-shadow-md"
               style = {{
                backgroundImage:`url(${getFullUrl(mockUser.selected_bg)})`,
                backgroundSize: "cover",
                backgroundPosition:"center",
                }}
                />

                {/* //userpfp  */}
                <div className="absolute left-8 top-[22rem] z-10">
                    <img src={getFullUrl(mockUser.profile_picture)}
                     alt="pfp" 
                     className="w-69 h-69 rounded-full shadow-xl object-cover border-3 border-[var(--border)]"
                     />
                </div>

                {/* //card  */}
                <div className="absolute right-18 top-[4rem] z-10 transform rotate-12">
                    <img src={getFullUrl(mockUser.selected_card)}
                     alt="selected card by user" 
                     className="w-90 h-150  shadow-xl object-cover border-3 border-[var(--border)]"
                     />
                </div>
                
                <div className="flex-1 ml-80">
                    <h2 className="text-xl drop-shadow-md">{mockUser.full_name}{" / "}
                        {mockUser.nationality}
                    </h2>
                    <h2 className="italic drop-shadow-md">
                        "{mockUser.biography}"</h2>
                        <h2 className="drop-shadow-md">Speciality: {mockUser.speciality}</h2>
                        <h2 className="drop-shadow-md">Contact:{
                             " "} 
                            <span className="text-blue-500">{mockUser.email}</span></h2>
                        <h2 className="drop-shadow-md">Joined At: {mockUser.joined_date}</h2>
                </div>
                <div className="flex-1 bottom-10 absolute">
                    <h1 className="font-bold text-4xl drop-shadow-md pl-6 mb-4">BADGES</h1>
                    <div className="flex flex-wrap gap-0">{mockUser.badges.map((badge,i)=>(
                        <img 
                        key={i}
                        src={getFullUrl(badge)}
                        className="w-44 -m-8"
                        />

                    ))}

       
                    <h2 className=" mt-8 font-bold text-5xl drop-shadow-md"
                    style={{
                        color: theme["--primary"]
                    }}
                    >   
                      <div className="absolute left-0 -top-15 h-40 border-l-4 border-black" />
                      <div className="absolute left-4 -top-15 h-40 border-l-4 border-black" />

                      {/* //label for now but it will be link to user gallary */}
                        <span className="ml-10">Gallery</span></h2>
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
