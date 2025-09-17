import Layout from "../../../components/layouts/layout";
import {
  EyeIcon,
  GreaterThanIcon,
  HashIcon,
  LessThanIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  XIcon,
} from "@phosphor-icons/react";
import { useAuth } from "../../../context/useAuth";
import { useEffect, useState } from "react";
import CreateArt from "./createArt";
import erzalearning from "/assets/mascot_emotes/erzalearning.svg";
import { toast } from "react-toastify";

export default function UserDashboard(){
    const {auth, userData} = useAuth();
    const [userPosts, setUserPosts] = useState([]);
    const [isModalOpen, setIsModelOpen] = useState(false);

    const handleDelete = async(artId, artName)=>{
      const confirmDelete = window.confirm(
        `Are you sure you want to delete "${artName}" ?`
      );
      if (!confirmDelete) return;

      try{
             const res = await fetch(
                            `${import.meta.env.VITE_STATIC_FAST_API_URL}/artists/delete/${artId}`,{
                              method:"DELETE",
                                headers:{
                                    Authorization: `Bearer ${auth.token}`
                                }
                            }
                        );
                        if (!res.ok) throw new Error("failed to delete arts");
                        setUserPosts((prev) => prev.filter((p)=>p.art_id !== artId));
                   toast.success(`"${artName}" deleted successfully`);

                      }catch(error){
                        console.error(`error fetching ${error}`)
                        toast.error("failed to delete art");
          }
           
      }
  


      useEffect(()=>{
      if (!auth?.token) return;
      const fetchMineArts = async () =>{
         try{
                        const res = await fetch(
                            `${import.meta.env.VITE_STATIC_FAST_API_URL}/artists/arts/mine`,{
                                headers:{
                                    Authorization: `Bearer ${auth.token}`
                                }
                            }
                        );
                        if (!res.ok) throw new Error("failed to fetch arts");
        
                        const data = await res.json();
                        setUserPosts(data);
                    }catch(error){
                        console.error(`error fetching ${error}`)
                    }
                
      };
       fetchMineArts();
    }, [auth?.token]);

    const publishedCount =userPosts.filter((p)=>p.status === "published").length;
    const draftCount = userPosts.filter((p)=>p.status === "draft").length;
    
    const handleArtCreated = (newArt) =>{
      setUserPosts((prev)=>[newArt, ...prev]);
      setIsModelOpen(false);
    }

  return (
  <Layout>
      <div className="overflow-x-auto min-h-screen  text-[var(--color)]">
        <div className="flex justify-between items-center flex-wrap mb-6 gap-4">
            <div>
            <h1>
            <span className="font-bold text-5xl drop-shadow-md">Hi, {userData?.user?.username}</span> 
            </h1>
        <p className="mb-6 mt-5 italic drop-shadow-md text-2xl">
            You have overall {userPosts.length} arts created so far!
            <br/>
             {publishedCount}-Published & {draftCount}-drafts...
        </p>
        </div>

        <button className="flex rounded-full items-center space-x-3 px-6 border-3 border-[var(--border)] text-xl shadow-lg cursor-pointer bg-[var(--sbgc)] hover:bg-[var(--bgc)]"
        onClick={()=>setIsModelOpen(true)}
        ><PlusIcon size={24} weight="bold" className="mr-1 "/> create Art
        </button>
        <Modal isOpen={isModalOpen} onclose={()=>setIsModelOpen(false)}>
          <CreateArt onArtCreated={handleArtCreated}/>
        </Modal>

        </div>
      

        <div className="flex justify-between items-center mb-2 drop-shadow-md">
            <div className="relative  mb-2 w-full max-w-sm">
        <input
          type="search"
          placeholder="Search ArtWorks..."
          className="w-full p-3 pr-10 rounded-md border-3 text-[var(--color)] border-[var(--border)]  "
        />
        <MagnifyingGlassIcon
          size={28}
          weight="regular"
          className="absolute right-5 top-1/2 -translate-y-1/2"
        />
      </div>

          <div className="flex space-x-3 mb-2">
            {[
              {icon: LessThanIcon, title: "go back",},
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
        </div>

        {/* lower table  */}
        <div className="mt-2 rounded-md  overflow-hidden border-3 border-[var(--border)]">
        <table className="min-w-full rounded-xl shadow-md overflow-hidden px-0">
          <thead className="bg-[var(--sbgc)] text-2xl uppercase  border-b-3 border-[var(--border)]">
            <tr>
              <th className="px-3 py-3 text-left w-[5%]">#</th>
              <th className="px-4 py-3 text-left w-[25%]">Art</th>
              <th className="px-6 py-3 text-left w-[10%]">Status</th>
              <th className="px-4 py-3 text-right w-[10%]">Visbility</th>
              <th className="px-4 py-3 pr-5 text-right w-[10%]">Date</th>
              <th className="px-4 py-3 pr-5 text-right w-[20%]">Action</th>
            </tr>
          </thead>

          <tbody className="text-md">
            {userPosts.map((post, index) => (
              <tr
                key={post.image_id || index}
              >
                <td className="px-3 py-3">
           {index+1}
                </td>
                <td className="py-4 px-4">{post.image_name}</td>
                <td className="px-6 py-3 text-left">{post.status}</td>
                <td className="px-4 py-3 text-right">{post.visibility}</td>
                <td className="px-4 py-3 text-right pr-5">{new Date(post.upload_date).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-right">
                 <div className="flex justify-end items-center space-x-3">
                    <button>
                        <EyeIcon size={24} weight="regular"/> 
                    </button>
                    <button>
                        <PencilIcon size={24} weight="regular"/> 
                    </button>

                    <button title="Delete"
                    onClick={()=> handleDelete(post.art_id, post.image_name)}
                    className="cursor-pointer"
                    >
                        <TrashIcon size={24} weight="regular"/> 
                    </button>
             
                 </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </Layout>
  );
}


function Modal({ children, isOpen, onclose }) {
  if (!isOpen) return null;
  return (
    <div className=" overflow-hidden  fixed inset-0 z-50 flex items-center justify-center bg-[var(--bgc)]">
      <div className="relative w-full max-w-4xl">
        <img
          src={erzalearning}
          alt="Learning Mascot"
          className="absolute top-60 left-170  w-140 h-140 object-contain pointer-events-none z-100"
        />

        <div className="rounded-xl bg-[var(--sbgc)] shadow-lg p-10 relative z-10">
          <button
            className="absolute top-3 right-3 text-xl font-bold text-[var(--color)] cursor-pointer"
            onClick={onclose}
          >
            <XIcon size={24} weight="bold" />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
