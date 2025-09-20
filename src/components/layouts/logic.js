import { toast } from "react-toastify";
import { API_BASE } from "../../utils/api";

export async function requestRoleChange(token, message="") {
    try{
        const res = await fetch(`${API_BASE}/users/requestrolechange`,{
            method: "POST",
            headers:{
                "Authorization": `Bearer ${token}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify({message})
        });
        if (!res.ok){
            const err = await res.json();
            const msg = err.detail || "failed to rquest change";
            toast.error(msg);
            return null;
            
        }
        const data = await res.json();
        toast.success(data.message || "role change request sent!");
        return data;
    }catch(error){
        const msg = error?.message | "Something went wrong";
        toast.error(msg);
        throw new Error(msg);
    }
    
}