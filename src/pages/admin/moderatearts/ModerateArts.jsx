import { EyesIcon, GreaterThanIcon, HashIcon, LessThanIcon, MailboxIcon, TrashIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import Layout from "../../../components/layouts/layout";
import { useAuth } from "../../../context/useAuth";
import { API_BASE } from "../../../utils/api";
import { toast } from "react-toastify";

export default function ModerateArts(){
  
  const navigate = useNavigate();
  const {auth} = useAuth();

  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    if (!auth?.token) return;
    const fetchArts = async () =>{
      try{
        setLoading(true);
        const res = await fetch(`${API_BASE}/admin/arts`,{
          headers:{
            Authorization: `Bearer ${auth.token}`,
          }
        });
        if (!res.ok) throw new Error("failed to fetch arts");
        const data = await res.json();
        setArts(data.arts || []);
      }catch(e){
        console.error(e)
      }finally{
        setLoading(false);
      }
    }
    fetchArts();
  },[auth?.token]);

  const handleDelete = async(art_id) =>{
    if (!confirm("Are you sure you want to delete this artwork?")) return;
    try{
        const res = await fetch(`${API_BASE}/admin/arts/${art_id}`,{
          method: "DELETE",
          headers:{
            Authorization: `Bearer ${auth.token}`,
          }
        });
        if (!res.ok) throw new Error("failed to delete art");
        const data = await res.json();
        toast.info(data.message);
        setArts(prev=> prev.filter(a=> a.art_id !== art_id))
      }catch(e){
        console.error(e)
      }
  }
    
      const truncateText = (text, maxLength = 50) => text.length > maxLength ? text.slice(0, maxLength) + "...": text;

      

      return(
        <Layout>
           <div className="flex space-x-3 mb-2">
            {[
              {icon: LessThanIcon, title: "go back"},
              {icon: HashIcon, title: "Enter your own number"},
              {icon: GreaterThanIcon, title: "go front"}
            ].map(({icon, title},i)=>{
              const IconComponenet = icon;
             return( <button
              key={i}
              className="p-2 border-3 border-[var(--border)] bg-[var(--sbgc)] rounded-lg"
              title={title}
              >
                <IconComponenet size={22} weight="bold"/>
              </button>
             );
            })}
          </div>
           
        <div className="mt-2 rounded-md  overflow-hidden border-3 border-[var(--border)]">
          {loading ? (
          <div className="p-4 text-center">Loading Artworks...</div>
          ):(
          <table className="min-w-full ">
          <thead className="bg-[var(--sbgc)] text-2xl uppercase border-b-3 border-[var(--border)]">
            <tr>
              <th className="px-3 py-3 text-left w-[5%]">#</th>
              <th className="px-4 py-3 text-left w-[10%]">Artwork</th>
              <th className="px-4 py-3 text-left w-[40%]">Description</th>
              <th className="px-4 py-3 text-right w-[15%]">Reports</th>
              <th className="px-4 py-3 text-right w-[15%]">is_Competing</th>
              <th className="px-4 py-3 text-right w-[15%]">Actions</th>

            </tr>
          </thead>
          <tbody className="text-md">
            {arts.map((art, index)=>(
              <tr
                key={index}
              >
                <td className="px-3 py-3">
                     <span className="ml-1">
                    {index+1}
                    </span>
                </td>
                <td className="px-4 py-3">
                    {art.image_name}
                </td>
                <td className="px-4 py-3">{truncateText(art.description)}</td>
                <td className="px-4 py-3 text-right">
                  {art.reports.length >0 ? (
                    <button
                    className="cursor-pointer text-sm  underline "
                    onClick={()=> (navigate(`/moderate-arts/art-report/${encodeURIComponent(art.image_name)}`,{
                      state: {art}
                    }
                  )
                  )}
                    >
                      view ({art.reports.length})

                    </button>
                  ):(
                    "none"
                  )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {art.is_competing ? "yes": "No"}
                  </td>
                <td className="text-[var(--color)] px-4 py-3 text-left pr-5 flex gap-3 justify-end">
                  <MailboxIcon size={24} weight="regular"/>
                  <TrashIcon size={24} weight="regular" className="cursor-pointer" onClick={()=>handleDelete(art.art_id)}/>
                  <NavLink
            to={`/Explore/${art.art_id}`}
          >
                  <EyesIcon size={24} weight="regular"/>
          </NavLink>

                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          )}

        </div>
        </Layout>
      )
    }