import { NavLink } from "react-router-dom";
import Layout from "../../../components/layouts/layout";
import betaerza from "/assets/mascot_emotes/betacreateorjoin.png"
import { useTheme } from "../../../theme/useTheme";

export default function Collaboration() {
    const {theme} = useTheme();
    return(
     <Layout>
       

        <div className="relative flex items-center justify-center min-h-screen text-[var(--color)]">
       <div className="absolute left-10 top-1/2 z-10">
               <img
                src={betaerza}
                width={425}
                />
        </div>

        <div className="flex relative space-x-4">
            <NavLink
            to="/collaboration/join"
            className="border-4 border-[var(--border)] p-10 h-40 drop-shadow-md  flex flex-col justify-center font-bold text-4xl rounded-2xl"
            style={{backgroundColor: theme["--sbgc"]}}
            >
          JOIN GROUP
            </NavLink>
       
            <NavLink
            to="/collaboration/create"
            className="border-4 border-[var(--border)] p-10 h-40 drop-shadow-md  flex flex-col justify-center font-bold text-4xl rounded-2xl"
            >
          CREATE GROUP
            </NavLink>
        </div>
        {/* beta / */}
        <div className="absolute top-1/2  right-0 transform -translate-y-1/2">
            <div className="border-4 border-[var(--border)] p-6 font-bold tracking-widest flex flex-col items-center text-4xl leading-15">
                {Array.from("BETA STAGE").map((char, i)=>{
                    if (i == 5) {
                       return (<span key={i} className="mt-8" >{char}</span>
                )
            }
            return(<span key={i}>{char}</span>)
            })}
            </div>
        </div>
        </div>
    </Layout>
    );
}
