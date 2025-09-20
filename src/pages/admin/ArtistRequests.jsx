import Layout from "../../components/layouts/layout";
import { getFullUrl } from "../../utils/urlHelpers";
import { getallPendingArtistrequests , disapprovingArtistReqest, approvingArtistReqest} from "./logic";
import {CheckIcon, GreaterThanIcon, HashIcon, LessThanIcon, XIcon } from "@phosphor-icons/react";
import { useAuth } from "../../context/useAuth";
import { useEffect, useState } from "react";
export default function AritstRequests(){
  const {auth} = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    const getRequests = async() =>{
      setLoading(true);
      const data = await getallPendingArtistrequests(auth.token);
      setRequests(data);
      setLoading(false);
    };
    getRequests();
  }, [auth?.token]);



  // ##aprove 
  const handleApprove = async (request_id)=>{
    const result = await approvingArtistReqest(auth.token, request_id);
    if (result){
      setRequests(requests.filter((r)=>r.request_id != request_id));
    }
  }
  // ##d-aprove 
  const handleDisapprove = async (request_id)=>{
    const result = await disapprovingArtistReqest(auth.token, request_id);
    if (result){
      setRequests(requests.filter((r)=>r.request_id != request_id));
    }
  }

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
              className="p-2 border-3 border-[var(--border)]  bg-[var(--sbgc)] rounded-lg"
              title={title}
              >
                <IconComponenet size={22} weight="bold"/>
              </button>
             );
            })}
          </div>

               <div className="mt-2 rounded-md overflow-hidden border-3 border-[var(--border)]">
     {loading? (
      <div className="p-4 text-center text-lg"> loading al requests </div>
     ): (

        <table className="min-w-full ">

          <thead className="text-2xl uppercase border-b-3 border-[var(--border)] bg-[var(--sbgc)]">
            <tr>
              <th className="px-3 py-3 text-left w-[10%]">#</th>
              <th className="px-4 py-3 text-left w-[25%]">Requests</th>
              <th className="px-4 py-3 text-left w-[40%]">Message</th>
              <th className="px-4 py-3 text-right w-[25%]">Actions</th>
            </tr>
          </thead>


          <tbody className="text-md">
            {requests.map((req, index)=>(
              <tr
                key={index}
              >
                <td className="px-3 py-3">
                    <span className="ml-1">
                    {index+1}
                    </span>
                </td>
                <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                        <img
                        src={getFullUrl(req.profile_pic)}
                        alt={req.username}
                        className="w-10 h-10 rounded-full object-cover cursor-pointer"                        
                        />
                        <span
                        className="hover:underline cursor-pointer"
                        >{req.username}</span>
                    </div>
                </td>
                <td className="px-4 py-3">{req.message}</td>
                <td className="px-4 py-3 text-right flex justify-end gap-3">
                   <CheckIcon size={28} weight="regular" className="cursor-pointer hover:text-green-500" onClick={() => handleApprove(req.request_id)} />
                    <XIcon size={28} weight="regular" className="cursor-pointer hover:text-red-500" onClick={() => handleDisapprove(req.request_id)} />
              
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