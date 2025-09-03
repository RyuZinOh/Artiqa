import { LightbulbIcon } from "@phosphor-icons/react";
import Layout from "../../components/layouts/layout";
import pumpedup from "/assets/mascot_emotes/pumpedup.svg"
export default function CreateCompeition(){
    return(
        <Layout>
            <div className="flex items-center justify-center text-[var(--color)] min-h-[70vh]">
                <div className="relative w-full max-w-3xl flex items-center justify-center">

                <div className="relative w-full">
                    <LightbulbIcon size={26} weight="bold" 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color)] z-10"/>

                <input type="text"
                placeholder="Think of the art theme for this week..."
                className="w-full pl-10 text-xl p-4 shadow drop-shadow-md rounded-full border-3 border-[var(--border)] bg-[var(--sbgc)]"
                />
         
                </div>  
                          
          <img
            src={pumpedup}
            alt="Pumped up mascot"
            className="-right-58  w-90 mt-75  absolute pointer-events-none"
          />
             </div>
                
</div>
        </Layout>
    )
}



