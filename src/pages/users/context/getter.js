
import { API_BASE } from "../../../utils/api";

export const fetchLikedArts = async(token)=>{
            if(!token) return [];
            try{
                const res = await fetch(
                    `${API_BASE}/artists/arts/hearted`,{
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                if (!res.ok) throw new Error("failed to fetch liked arts");
                return await res.json();
            }catch(error){
                console.error(`error fetching ${error}`)
                return [];
        }
}


export const fetchCommentedArts = async(token)=>{
            if(!token) return [];
            try{
                const res = await fetch(
                    `${API_BASE}/artists/arts/critiqued`,{
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                if (!res.ok) throw new Error("failed to fetch liked arts");
                return await res.json();
            }catch(error){
                console.error(`error fetching ${error}`)
                return [];
        }
}


export async function fetchPfp(token){
    if(!token) throw new Error("no auth token");
            const res = await fetch(
                    `${API_BASE}/users/mine_avatar`,{
                        method: "GET",
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (!res.ok){
                        const erd = await res.json();
                        throw new Error(erd.detail || "failed to fetch pfp")
                    }
const data = await res.json();
return data.profile_pic;
        
}