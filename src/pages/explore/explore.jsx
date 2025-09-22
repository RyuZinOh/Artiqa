import { ChatCircleTextIcon, HeartIcon } from "@phosphor-icons/react";
import Layout from "../../components/layouts/layout";
import { getFullUrl } from "../../utils/urlHelpers";
import { useExplore } from "../context/Exploration/useExplore";
import { NavLink } from "react-router-dom";
import { useTags } from "../context/Tags/useTag";

export default function Explore() {
  const {arts, loading, error} = useExplore();
  const {tags, loading: lt, error: le} = useTags();

 if (loading || lt) return <p className="text-center mt-8">Loading arts...</p>;
  if (error || le) return <p className="text-center mt-8 text-red-500">{error}</p>;

  const uniqueTags = Array.from(new Set(tags.map(tag=>tag.name)));

 

  return (
    <Layout>

      {/* tags listing for some reason, but doenst exactly filter yet. */}
       <div className="overflow-hidden border-b-2 border-[var(--border)] mb-4 relative h-10">
        <div className="inline-block whitespace-nowrap animate-scroll">
          {uniqueTags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-block mr-3 px-4 py-1 rounded-full border-2 border-[var(--border)] bg-[var(--sbgc)] text-[var(--color)] font-medium cursor-pointer hover:bg-[var(--color)] hover:text-white transition"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className=" min-h-screen columns-[375px]  gap-1 max-w-[1374px] mx-auto  box-border">
        {arts.map((art) => (
          <NavLink
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
          </NavLink>
        ))}
      </div>

            <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-scroll {
            display: inline-block;
            animation: scroll 10s linear infinite;
          }
        `}
      </style>
    </Layout>
  );
}
