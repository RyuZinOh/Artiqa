import Layout from "../../components/layouts/layout";
import { NavLink } from "react-router-dom";
import { getFullUrl } from "../../utils/urlHelpers";
import { useAuth } from "../../context/useAuth";
import { useEffect, useState } from "react";

export default function HeCommented(){
  const {auth} = useAuth();
  const [commentedArts, setCommentedArts] = useState([]);
   
  useEffect(()=>{
    const fetchCommentedArts = async () =>{
      if (!auth?.token)  return;
          try{
                      const res = await fetch(
                          `${import.meta.env.VITE_STATIC_FAST_API_URL}/artists/arts/critiqued`,{
                              headers:{
                                  Authorization: `Bearer ${auth.token}`
                              }
                          }
                      );
                      if (!res.ok) throw new Error("failed to fetch commented arts");
      
                      const data = await res.json();
                      setCommentedArts(data);
                  }catch(error){
                      console.error(`error fetching ${error}`)
                  }
    };
    fetchCommentedArts();
  }, [auth?.token]);


  if(commentedArts.length == 0){
    return(
      <Layout>
        <p className="text-center text-[var(--color)] mt-10"> You haven't critiqued on anything yet.</p>
      </Layout>
    )
  }


return(

<Layout>
                      <div className=" min-h-screen columns-[375px]  gap-1 max-w-[1374px] mx-auto  box-border">
        {commentedArts.map((post) => (
                  <NavLink to={`/Explore/${post.art_id}`}
                  className="relative mb-1 border-3 border-[var(--border)] group
            overflow-hidden block"
                  >
                
            <img
              src={getFullUrl(post.image_url)}
              alt={`Image ${post.art_id}`}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              loading="lazy"
            />

            {post.critiques?.length > 0 && (
              <div className="absolute inset-0 bg-[var(--sbgc)] text-[var(--color)] p-3 opacity-0 group-hover:opacity-60 transition-opacity duration-200 flex-col justify-center space-y-1 overflow-auto">
                {post.critiques.map((c, i)=>(
                  <p className="text-sm border-b-3 border-[var(--color)] pb-1" key={i}>
                    "{c}"
                  </p>
                ))}
              </div>
            )}
            </NavLink>
        ))}
      </div>
    </Layout>

)}

