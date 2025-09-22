import { useCallback, useEffect, useState } from "react";
import { API_BASE } from "../../../utils/api";
import TagContext from "./TagContext";

export function TagProvider({children}){
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getTags = useCallback(async ()=>{
        try{
            setLoading(true);
            setError(null);
            const res = await fetch(`${API_BASE}/users/arts/tags`);
            if (!res.ok) throw new Error("failed to fetch tags");
            const data = await res.json();
            setTags(data || []);
        }catch(e){
            setError(e.message || " failed to load tags");
            setTags([]);
        }finally{
            setLoading(false);
        }
    }, []);

    const refreshTags = useCallback(async()=>{
        await getTags();
    }, [getTags]);

    useEffect(()=>{
        if(!tags.length && !loading){
            getTags();
        }
    }, [tags.length, loading, getTags]);

    return(
        <TagContext.Provider value={{
            tags, loading, error, refreshTags
        }}>
            {children}
        </TagContext.Provider>

    )
}