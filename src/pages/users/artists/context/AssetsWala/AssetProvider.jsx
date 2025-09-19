import { useCallback, useEffect, useState } from "react";
import {getUrlforAssets } from "../../../../../utils/urlHelpers";
import { getProfileAssets } from "../getter";
import { useAuth } from "../../../../../context/useAuth";
import AssetContext from "./AssetContext";

export function AssetProvider({children}){
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {auth} = useAuth();

  const fetchAssets  = useCallback(async () =>{
    if(!auth?.token){
      return;
    }

    try{
      setLoading(true);
      setError(null);
      const data = await getProfileAssets(auth.token);
      const processed = data.map(a=> ({
        ...a,
        url: getUrlforAssets(a.url)
      }));
      setAssets(processed);
    }catch(err){
      setError(err.message || " failed to load assets");
      setAssets([]);
    }finally{
      setLoading(false);
    }
  }, [auth?.token]);

  useEffect(()=>{
    if (auth?.token && assets.length === 0 && !loading){
      fetchAssets();
    }
  }, [auth?.token, assets.length, loading, fetchAssets]);

  const updateAsset =  useCallback((id, newData) =>{
    setAssets(prev=> prev.map(a => a.id === id ? {
      ...a,
      ...newData,
        url: getUrlforAssets(newData.url || a.url)
    }: a ))
  }, []);

  const refreshAssets  = useCallback(async () => {
    await fetchAssets();
  }, [fetchAssets])

return(
  <AssetContext.Provider value={{
    assets, loading, error, fetchAssets, updateAsset, refreshAssets
  }}
  >
    {children}
  </AssetContext.Provider>
)

}