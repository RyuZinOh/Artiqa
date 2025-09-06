import Layout from "../../components/layouts/layout";
import users from "../../dummy/user.json";
import { slugify } from "../../utils/slugify";
import { NavLink } from "react-router-dom";
import ccp from "../../dummy/current_user.json";
import { getFullUrl } from "../../utils/urlHelpers";

export default function HeCommented(){
    const currentuser = Array.isArray(users)? users.find((u)=> u.username === ccp.username): null;

    const commentedPosts = users.flatMap((user)=> 
        user.overall_posts.filter((post)=> post.critiques?.some((c)=> c.user === currentuser.username)
).map((post)=>({
        ...post, artist: user.username
    }))
).filter(Boolean);



return(

<Layout>
                      <div className=" min-h-screen columns-[375px]  gap-1 max-w-[1374px] mx-auto  box-border">
        {commentedPosts.map((post, index) => (
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

)}

