import { API_BASE } from "../../../../utils/api";
export async function getProfileAssets(token) {
    if(!token) throw new Error(" No token provided");

    const res = await fetch(`${API_BASE}/artists/profile/assets`,{
        method: "GET",
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });

    if(!res.ok){
        const errData = await res.json();
        throw new Error(errData.detai || "failed to fetch assets");
    }
    return res.json();

}




export async function fetchMyStats(token) {
    if(!token) throw new Error(" No token provided");

    const res = await fetch(`${API_BASE}/artists/stats/mine`,{
        method: "GET",
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });

    if(!res.ok){
        const errData = await res.json();
        throw new Error(errData.detai || "failed to fetch stats");
    }
    return res.json();

}

export async function fetchMyProfile(token){
                  const res = await fetch(
                            `${API_BASE}/artists/profile/mine`,
                            {
                              headers:{
                                Authorization : `Bearer ${token}`
                            },
                        }        
                      )
                      
                      if(!res.ok) throw new Error("failed to fetch profile");
                      return await res.json();
        };
   
