import Layout from "../../components/layouts/layout";
import pumpedup from "/assets/mascot_emotes/pumpedup.svg"
import { useAuth } from "../../context/useAuth";
import { useState } from "react";
import { toast } from "react-toastify";
import { createWeekly } from "./logic";

export default function CreateCompeition(){
    const {auth} = useAuth();
    const [name, setName]= useState("");
    const [description, setDescription] = useState("");

    const handleCreateW = async()=>{
        if (!name || !description){
            toast.info("please fill both fields");
            return;
        }
        const result = await createWeekly(auth.token, name, description);
        if (result){
            setName("");
            setDescription("");
        }
    }
    return(
        <Layout>
            <div className="flex items-center justify-center text-[var(--color)] min-h-[70vh]">
                <div className="relative w-full max-w-3xl flex items-center justify-center">

                <div className="relative w-full">
                    <input type="text"
                placeholder="Competition name"
                value={name}
                onChange={(e)=> setName(e.target.value)}
                className="w-full pl-4 text-xl p-4 shadow drop-shadow-md rounded-full border-3 border-[var(--border)] bg-[var(--sbgc)]"
                />
                  <textarea    
                 placeholder="Think of the art theme for this week..."
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
                 className="w-full p-2 mt-2 text-lg shadow drop-shadow-md rounded-xl border-3 border-[var(--border)] bg-[var(--sbgc)]"
                rows={4}
                />  
           
                <button
                onClick={handleCreateW}
                className="bg-[var(--bgc)] hover:bg-[var(--sbgc)] text-[var(--color)] border-3 border-[var(--border)] cursor-pointer rounded-full p-2"
                >
                    Create Competition
                </button>
                          
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



