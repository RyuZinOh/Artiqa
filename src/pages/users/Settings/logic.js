import { API_BASE } from "../../../utils/api";
export async function updateAvatar(file, token) {
    if(!file) throw new Error("No file provided");

    const formData = new FormData();
    formData.append("avatar", file);

    const res = await fetch(`${API_BASE}/users/update/avatar`,{
        method:"PUT",
        headers:{
            Authorization: `Bearer ${token}`
        },
        body: formData
    });

    if (!res.ok){
        const errData = await res.json();
        throw new Error(errData ||  "failed to updated avatar")
    }

    return res.json();
}


export async function updateEmail(newEmail, token){
    if (!newEmail) throw new Error("no email provided");
    const res = await fetch(`${API_BASE}/users/update/mail`,{
        method:"PUT",
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({email: newEmail})
    });

    if (!res.ok){
        const errData = await res.json();
        throw new Error(errData ||  "failed to updated email")
    }

    return res.json();
}



export async function updateFullName(newFn, token){
    if (!newFn) throw new Error("no Name provided");
    const res = await fetch(`${API_BASE}/users/update/fullname`,{
        method:"PUT",
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({full_name: newFn})
    });

    if (!res.ok){
        const errData = await res.json();
        throw new Error(errData ||  "failed to updated full name")
    }

    return res.json();
}


export async function updatePassword(oldPassword,newPassword,token){
    if (!oldPassword || !newPassword) throw new Error("provide passwords plz");
    const res = await fetch(`${API_BASE}/users/update/password`,{
        method:"PUT",
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({old_password: oldPassword,
            new_password :newPassword
        })
    });

    if (!res.ok){
        const errData = await res.json();
        throw new Error(errData.detail ||  "failed to updated password")
    }

    return res.json();
}