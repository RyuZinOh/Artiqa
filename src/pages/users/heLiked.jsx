import users from "../../dummy/user.json";
import ccp from "../../dummy/current_user.json";
import { getFullUrl } from "../../utils/urlHelpers";
import Layout from "../../components/layouts/layout";
import { slugify } from "../../utils/slugify";
import { NavLink } from "react-router-dom";

export default function HeLiked() {


    const user = Array.isArray(users) ? users.find((u)=> u.username === ccp.username) : users;

    const likedPosts = user?.liked_arts?.map((like)=>{
        const artist = users.find((u)=> u.username === like.artist);
        const post = artist?.overall_posts.find(
            (p)=> p.image_url.trim() ===  like.art.trim()
        )
        return post ? { ...post, 
            artist: artist.username,
        }: null;
    }).filter(Boolean) || [];

    return (
        <Layout>
              <div className=" min-h-screen columns-[375px]  gap-1 max-w-[1374px] mx-auto  box-border">
        {likedPosts.map((post, index) => (
                  <NavLink to={`/Explore/${slugify(post.image_name)}`}
                  className="relative mb-1 border-3 border-[var(--border)] group
            overflow-hidden block"
                  >
                
            <img
              src={getFullUrl(post.image_url)}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              loading="lazy"
            />
            </NavLink>
        ))}
      </div>
  
            
        </Layout>
    )
}
