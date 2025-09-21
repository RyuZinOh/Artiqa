import { useState } from "react";
import Layout from "../../../components/layouts/layout";
import { useAuth } from "../../../context/useAuth";
import { useAssets } from "./context/AssetsWala/useAsset";
import { API_BASE } from "../../../utils/api";
import { toast } from "react-toastify";
import { createPortal } from "react-dom";
import usePortfolio from "./context/portfolio/userPortfolio";

export default function Perks() {
  const { auth } = useAuth();
  const { assets, loading, error} = useAssets();
  const [selectedAsset, setSelectedAsset] = useState(null);
  const {refreshProfile} = usePortfolio();

  const shuffleArray = (array)=>{
   return array.map((value)=> ({value, sort: Math.random()})).sort((a,b)=>a.sort - b.sort).map(({value})=> value);
  }
  const shuffelAssets = shuffleArray(assets || []);


  const handleApplyAsset = async(asset) =>{
    if (!auth?.token || !asset) return;
    const assetType = asset.type;
    try{
      const res = await fetch(`${API_BASE}/artists/profile/select-asset/${asset.id}?asset_type=${assetType}`,{
        method: "POST",
        headers:{
          Authorization: `Bearer ${auth.token}`
        }
      });

      if(!res.ok){
        toast.error("failed to apply asset");
        return;
      }
      toast.success(`${assetType} applied successfully`);
      setSelectedAsset(null);
      refreshProfile();
    }catch(error){
      toast.error(error.message || "failed to apply asset");
    }
  }



  if (!auth)
    return (
      <Layout>
        <p className="text-center mt-10">Please log in to view assets.</p>
      </Layout>
    );
  if (loading)
    return (
      <Layout>
        <p className="text-center mt-10">Loading assets...</p>
      </Layout>
    );
  if (error)
    return (
      <Layout>
        <p className="text-center mt-10 text-red-500">{error}</p>
      </Layout>
    );

  return (
    <Layout>
      <div className="min-h-screen columns-[375px] gap-1 max-w-[1374px] mx-auto box-border p-1">
        {shuffelAssets.map((asset) => (
          <div
            key={asset.id}
            className="relative mb-1 border-3 border-[var(--border)] group overflow-hidden break-inside-avoid cursor-pointer"
            onClick={()=> setSelectedAsset(asset)}
          >
            <img
              src={asset.url}
              alt={asset.name}
              className="w-full h-auto object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              loading="lazy"
            />
            <div
              className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent 
                         flex items-end justify-between px-3 pb-2 opacity-0 group-hover:opacity-100 
                         transition-opacity duration-150 select-none text-white text-sm"
            >
              <span>{asset.name}</span>
              <span className="opacity-70">{asset.type}</span>
            </div>
          </div>
        ))}
      </div>

      
        {selectedAsset && createPortal(
           <div className="fixed top-4  right-4 p-4 bg-[var(--sbgc)] border-2 border-[var(--border)] rounded-lg shadow-lg z-50">
            <p className="text-[var(--color)] font-semibold mb-2">
              Apply {selectedAsset.type}: {selectedAsset.name}?
            </p>
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 bg-[var(--bgc)] text-[var(--color)] rounded hover:bg-[var(--sbgc)]
                border-3 border-[var(--border)] cursor-pointer
                "
                onClick={() => handleApplyAsset(selectedAsset)}
              >
                Apply
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-[var(--bgc)] hover:text-[var(--color)] rounded hover:bg-red-600
                border-3 border-[var(--border)] cursor-pointer 
                "
                onClick={() => setSelectedAsset(null)}
              >
                Cancel
              </button>
            </div>
          </div>, document.body
        )}
    </Layout>
  );
}