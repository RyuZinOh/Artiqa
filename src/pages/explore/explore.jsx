import { ChatCircleTextIcon, HeartIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import Layout from "../../components/layouts/layout";
import { getFullUrl } from "../../utils/urlHelpers";
import { useEffect, useState } from "react";

export default function Explore() {
  const [arts, setArts] = useState([]);

  useEffect(()=>{
    const fetchArts  = async() =>{
      try{
                 const res = await fetch(
            `${import.meta.env.VITE_STATIC_FAST_API_URL}/artists/all-arts`,);
            if (!res.ok) throw new Error("Failed to fetch arts");
            const data = await res.json();
            setArts(data);

      }catch(erro){
        console.error(erro);
      }
    };
    fetchArts();
  },[]);

  return (
    <Layout>
      <div className=" min-h-screen columns-[375px]  gap-1 max-w-[1374px] mx-auto  box-border">
        {arts.map((art) => (
          <Link
            key={art.art_id}
            to={`/Explore/${art.art_id}`}
            className="relative mb-1 border-3 border-[var(--border)] group
            overflow-hidden block"
          >
            <img
              src={getFullUrl(art.image_url)}
              alt={art.description}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              loading="lazy"
            />

            <div
              className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/80 to-transparent  flex items-end justify-between px-3 
          pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 
          cursor-pointer
          
          select-none"
            >
              <span className="text-white text-sm">{art.username}</span>

              <div className="flex items-center text-white text-sm space-x-2">
                <span className="flex items-center">
                  <HeartIcon size={20} weight="regular" className="mr-1" />
                  {art.hearts_count}
                </span>
                <span className="flex items-center">
                  <ChatCircleTextIcon
                    size={20}
                    weight="regular"
                    className="mr-1"
                  />
                  {art.critiques_count}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
