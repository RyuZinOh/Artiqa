
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