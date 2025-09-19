import { getFullUrl } from "../../utils/urlHelpers";
import Layout from "../../components/layouts/layout";
import { NavLink } from "react-router-dom";
import { useHeDone } from "./context/useHeDone";

export default function HeLiked() {

    const {likedArts} = useHeDone();

    if (likedArts.length === 0){
        return(
        <Layout>
            <p className="text-center text-[var(--color)] mt-10">
            u dont have liked anything yet.
            </p>
        </Layout>
        )

    }

    return (
        <Layout>
              <div className=" min-h-screen columns-[375px]  gap-1 max-w-[1374px] mx-auto  box-border">
        {likedArts.map((post) => (
                  <NavLink 
                  key={post.art_id}
                  to={`/Explore/${post.art_id}`}
                  className="relative mb-1 border-3 border-[var(--border)] group
            overflow-hidden block"
                  >
                
            <img
              src={getFullUrl(post.image_url)}
              alt={`Image ${post.art_id}`}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              loading="lazy"
            />
            </NavLink>
        ))}
      </div>
  
            
        </Layout>
    )
}
