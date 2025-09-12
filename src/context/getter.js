export async function getUserData(token){
    const res = await fetch(`${import.meta.env.VITE_STATIC_FAST_API_URL}/users/get_data`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if (!res.ok){
        throw new Error("failed to fetch user data.")
    }

    const data = await res.json();
    return data;
}