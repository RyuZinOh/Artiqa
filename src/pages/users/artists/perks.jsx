import Layout from "../../../components/layouts/layout";
import { useAuth } from "../../../context/useAuth";
import { useAssets } from "./context/AssetsWala/useAsset";
export default function Perks() {
  const { auth } = useAuth();
  const { assets, loading, error } = useAssets();

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
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="relative mb-1 border-3 border-[var(--border)] group overflow-hidden break-inside-avoid"
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
    </Layout>
  );
}