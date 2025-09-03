import { EyesIcon, GreaterThanIcon, HashIcon, LessThanIcon, MailboxIcon, TrashIcon } from "@phosphor-icons/react";
import users from "../../../dummy/user.json";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Layout from "../../../components/layouts/layout";

export default function ModerateArts(){
  
  const navigate = useNavigate();
    
    const [allArts] = useState(
      users.flatMap(u=>u.overall_posts.map(post=>({
        ...post,
         reports: post.reports || []
        }))
      )
    )


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
          <table className="min-w-full ">
          <thead className="bg-[var(--sbgc)] text-2xl uppercase border-b-3 border-[var(--border)]">
            <tr>
              <th className="px-3 py-3 text-left w-[5%]">#</th>
              <th className="px-4 py-3 text-left w-[20%]">Artwork</th>
              <th className="px-4 py-3 text-left w-[40%]">Description</th>
              <th className="px-4 py-3 text-right w-[15%]">Reports</th>
              <th className="px-4 py-3 text-right w-[20%]">Actions</th>

            </tr>
          </thead>
          <tbody className="text-md">
            {allArts.map((art, index)=>(
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
                <td className="text-[var(--color)] px-4 py-3 text-left pr-5 flex gap-3 justify-end">
                  <MailboxIcon size={24} weight="regular"/>
                  <TrashIcon size={24} weight="regular"/>
                  <EyesIcon size={24} weight="regular"/>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        </div>
        </Layout>
      )
    }