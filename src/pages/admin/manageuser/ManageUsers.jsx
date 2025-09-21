import Layout from "../../../components/layouts/layout";
import { getFullUrl } from "../../../utils/urlHelpers";
import {
  GreaterThanIcon,
  HashIcon,
  LessThanIcon,
} from "@phosphor-icons/react";
import CardManage from "./cardManage";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/useAuth";
import { API_BASE } from "../../../utils/api";

export default function ManageUsers(){

  const {auth} = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);


  useEffect(()=>{
    if (!auth?.token) return;

    const fetchUsers = async()=>{
      try{
      setLoading(true);
      const res = await fetch( `${API_BASE}/admin/users`,{
        headers:{
          Authorization: `Bearer ${auth.token}`
        }
      });
      if (!res.ok) throw new Error("failed to fetch users");
      const data = await res.json();
      setUsers(data);
    }catch(e){
      console.error(e);
    }finally{
      setLoading(false);
    }
  };
   fetchUsers();
}, [auth?.token]);
  
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
            <div className="p-4 text-center">Loading users...</div>):(           
        <table className="min-w-full ">

          <thead className="bg-[var(--sbgc)] text-2xl uppercase border-b-3 border-[var(--border)]">
            <tr>
              <th className="px-3 py-3 text-left w-[5%]">#</th>
              <th className="px-4 py-3 text-left w-[15%]">Artist</th>
              <th className="px-4 py-3 text-left w-[20%]">Email</th>
              <th className="px-4 py-3 text-right w-[15%]">Speciality</th>
              <th className="px-4 py-3 text-left w-[25%]">Role</th>
              <th className="px-4 py-3 pr-5 text-right w-[20%]">Joined In</th>
            </tr>
          </thead>


{/* //mapping of the user json to get each array keys */}
          <tbody className="text-md">
            {users.map((user, index)=>(
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
                        src={getFullUrl(user.profile_pic)}
                        alt={user.username}
                        className="w-10 h-10 rounded-full object-cover cursor-pointer"

                        onClick={()=> setSelectedUser(user)}
                        
                        />
                        <span
                        onClick={()=> setSelectedUser(user)}
                        className="hover:underline cursor-pointer"
                        >{user.username}</span>
                    </div>
                </td>
                <td className="py-4 px-4">{user.email}</td>
                <td className="px-4 py-3 text-right">{user.speciality}</td>
                <td className="px-4 py-3 text-left pr-5">{user.role_name}</td>
                <td className="px-4 py-3 text-right ">{new Date(user.joined_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
          )}
        </div>

        {selectedUser && (
          <div className="fixed flex items-center">
<CardManage user={selectedUser} 
onClose={()=> setSelectedUser(null)}
/>
          </div>
        )}

    </Layout>
    );

}



