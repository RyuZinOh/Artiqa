import { useAuth } from "../../../../../context/useAuth";
import PortfolioContext from "./PortfolioContext";
import { fetchMyProfile } from "../getter";
import { useCallback, useEffect, useState } from "react";

export function PortfolioProvider({children}){
    const {auth} = useAuth();
    const [profile, setProfile]= useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchProfile = useCallback(async()=>{
        if (!auth?.token) return;
        try{
            setLoading(true);
            setError(null);
            const data = await fetchMyProfile(auth.token);
            setProfile(data);
        }catch(err){
            setError(err.message || "failed to load profile");
            setProfile(null);
        }finally{
            setLoading(false);
        }
    }, [auth?.token]);

    const refreshProfile = useCallback(async () =>{
        await fetchProfile();
    }, [fetchProfile]);

    useEffect(()=>{
        if (auth?.token && !profile && !loading){
            fetchProfile();
        }
    }, [auth?.token, profile, loading, fetchProfile]);

return(<PortfolioContext.Provider value={{
    profile, loading, error, fetchProfile, refreshProfile
}}>
    {children}
</PortfolioContext.Provider>)
}