import { useParams } from "react-router-dom";
import Layout from "../../components/layouts/layout";
import { FlagIcon, HeartIcon, PaperPlaneRightIcon } from "@phosphor-icons/react";
import { ChatTeardropTextIcon } from "@phosphor-icons/react/dist/ssr";
import weekly from "/assets/mascot_emotes/artcomptweekly.png"
import { getFullUrl } from "../../utils/urlHelpers";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import { toast } from "react-toastify";


export default function IndividualePost() {
  const [post, setPost] = useState(
    null
  );
  const {auth} = useAuth();
  const [newCritique, setNewCritique] = useState("");
  const {artId} = useParams();


  useEffect(()=>{
      const fetchArt = async() =>{
      try{
                 const res = await fetch(
            `${import.meta.env.VITE_STATIC_FAST_API_URL}/artists/art/${artId}`,{
              headers: auth?.token ?{
              Authorization: `Bearer ${auth?.token}`
              }
                : {}

            });
            if (!res.ok) throw new Error("Failed to fetch arts");
            const data = await res.json();
            setPost(data);
      }catch(erro){
        console.error(erro);
      }
    };
    fetchArt();
  
  },[artId, auth?.token]);
  

//handling the critiques
const handleCritiqueSubmit = async () =>{
  if (!newCritique.trim()) return;
  try{
           const res = await fetch(
           `${import.meta.env.VITE_STATIC_FAST_API_URL}/artists/art/${artId}/critique`,
          {
              method: "POST",
              headers:{"Content-Type": "application/json",
              Authorization: `Bearer ${auth?.token}`
              },
              body: JSON.stringify({text: newCritique})        
            });
             if (!res.ok) throw new Error("Failed to fetch arts");
            const data = await res.json();
            setPost((prev)=>({
              ...prev,
              critiques: [...(prev?.critiques || []), data],
              critiques_count:(prev?.critiques_count || 0)+1      
                }));
                setNewCritique("");
             

              }catch(error){
                console.log(error);
              }
  }

//handlng the hearting
const handleHeartClick = async () =>{
  if(!auth?.token || post.hearted_by_user) return;
  try{       const res = await fetch(
           `${import.meta.env.VITE_STATIC_FAST_API_URL}/artists/art/${artId}/heart`,
          {
              method: "POST",
              headers:{"Content-Type": "application/json",
              Authorization: `Bearer ${auth?.token}`
              },
            });
             if (!res.ok) throw new Error("Failed to heart.");
             

             setPost((prev)=>({
              ...prev,
              hearts_count:prev.hearts_count+1,
              hearted_by_user: true
             }))
  }catch(error){
    console.log(error)
  }
}


//reporting
const handleReport = async () =>{
  if(!auth?.token) return;
  try{       const res = await fetch(
           `${import.meta.env.VITE_STATIC_FAST_API_URL}/artists/art/${artId}/report`,
          {
              method: "POST",
              headers:{"Content-Type": "application/json",
              Authorization: `Bearer ${auth?.token}`
              },
              body: JSON.stringify({
                reason:"Inappropriate content"
              })
            });
             if (!res.ok) throw new Error("Failed to heart.");
             toast.success("reported")

  }catch(error){
    toast.error(`failed to report ${error}`)
  }
  
}

   if (!post) return <Layout><p className="text-center mt-10">Loading...</p></Layout>;

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-4 ">
        {/* critiques  */}
        <div className="md:w-1/2 border-[var(--border)] border-3 p-4 flex flex-col h-225 text-[var(--color)]">
          <div className="flex items-center space-x-2 mb-2">
            <ChatTeardropTextIcon size={24} weight="bold" />
            <span className="text-lg text-[var(--color)]">{post?.critiques_count}</span>
          </div>
          <div className="flex-1 overflow-y-auto border-3 border-[var(--border)] p-2 space-y-2">
            {post.critiques?.length> 0? (
            post.critiques.map((c, i) => (
              <div key={i} className="bg-[var(--sbgc)] p-2 border-3 border-[var(--border)]">
                <div className="flex items-center space-x-2 ">
                  {c.userpfp && (
                  <img
                    src={getFullUrl(c.userpfp)}
                    alt="pfp"
                    className="w-6 h-6 border border-[var(--border)] rounded-2xl"
                  />
                  )}

                  <span>{c.username}</span>
                  <span className="inline-block h-4 border-l"></span>
                  <span className="text-sm ">{c.text}</span>
                </div>
              </div>
            ))
            ):(
             <p className="text-sm text-[var(--color)]"> No critiques yet</p> 
            )}
          </div>
          
          <div className="relative h-28 mt-2 mb-2">
            <textarea
              className="resize-none w-full border-3 p-2 border-[var(--border)] mt-2"
              placeholder="Add your critique..."
              onChange={(e)=>setNewCritique(e.target.value)}
              value={newCritique}
              rows={4}
            />

            <button type="submit" 
            onClick={handleCritiqueSubmit}
            className="absolute right-2 bottom-0 ">
              <PaperPlaneRightIcon size={24} weight="bold" />
            </button>
          </div>
        </div>

        {/* imagepost  */}
        <div className="relative md:w-1/2">
          {post.is_competing && (
            <img
              src={weekly}
              alt="competing this week"
              className="absolute  w-24 h-24 z-10"
            />
          )}
          <img
            src={getFullUrl(post.image_url)}
            alt={post.description}
            className="w-full object-cover border-3 border-[var(--border)]"
            loading="lazy"
          />

          <div className="mt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {post.profile_picture && (

                <img
                  src={getFullUrl(post.profile_picture)}
                  alt="user pfp"
                  className="w-8 h-8 rounded-2xl border-2 border-[var(--border)]"
                  loading="lazy"
                />
                )}
                <span className="text-sm   text-[var(--color)] font-bold">{post.username}</span>
              </div>

              <div className="flex items-center space-x-1 text-sm text-[var(--color)]">
                 <HeartIcon
                  size={24}
                  weight={post.hearted_by_user ? "fill" : "regular"}
                  color={post.hearted_by_user ? "red" : "currentColor"}
                  onClick={handleHeartClick}
                  className="cursor-pointer"
                />

                <span className="font-bold text-xl">{post.hearts_count}</span>
                  <button
                  onClick={handleReport}
                  className="flex items-center space-x-1 px-2 py-1 border rounded text-red-500 hover:bg-red-100"
                >
                  <FlagIcon size={20} weight="bold" />
                </button>
              </div>

            </div>
            <p className="text-[var(--color)] mt-4">{post.description}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
