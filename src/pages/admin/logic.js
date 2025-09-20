import { toast } from "react-toastify";
import { API_BASE } from "../../utils/api";


// ##getting
export async function getallPendingArtistrequests(token){
    try{
        const res = await fetch(`${API_BASE}/admin/artist-requests`,{
            method:  "GET",
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
        if(!res.ok){
            const err = await res.json();
            throw new Error(err.detail || "Failed to fetch requests");
        }
        const data = await res.json();
        return data;
    }catch(error){
        toast.error(error?.message || "Something went wrong fetching requests");
        return [];
    }
}

// ##deleting
export async function disapprovingArtistReqest(token, request_id){
    try{
     const res = await fetch(`${API_BASE}/admin/disapprove/${request_id}`,{
            method:  "DELETE",
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
        if(!res.ok){
            const err = await res.json();
            throw new Error(err.detail || "Failed to disapprove");
        }
        const data = await res.json();
        toast.success(data.message || "request disapproved")
        return data;
    }catch(error){
        toast.error(error?.message || "Something went wrong");
        return null;
    }
}



// ##deleting
export async function approvingArtistReqest(token, request_id){
    try{
     const res = await fetch(`${API_BASE}/admin/approve/${request_id}`,{
            method:  "POST",
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
        if(!res.ok){
            const err = await res.json();
            throw new Error(err.detail || "Failed to approve");
        }
        const data = await res.json();
        toast.success(data.message || "request approved")
        return data;
    }catch(error){
        toast.error(error?.message || "Something went wrong");
        return null;
    }
}



// ##creating competition
export async function createWeekly(token, name, description){
        try{
     const res = await fetch(`${API_BASE}/admin/create-weekly`,{
            method:  "POST",
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                description
            })
        });
        if(!res.ok){
            const err = await res.json();
            throw new Error(err.detail || "Failed to create competition");
        }
        const data = await res.json();
        toast.success(data.message || "competiton createed")
        return data;
    }catch(error){
        toast.error(error?.message || "Something went wrong");
        return null;
    }

    
}