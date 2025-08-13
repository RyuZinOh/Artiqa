import Layout from "../../../components/layouts/layout";
import {
  CrownSimpleIcon,
  GreaterThanIcon,
  HashIcon,
  LessThanIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@phosphor-icons/react";
import userData from "../../../dummy/user.json";
import { EyeIcon, PencilIcon, TrashIcon } from "@phosphor-icons/react/dist/ssr";


export default function  UserDashboard(){
const userPosts = userData.overall_posts || [];
const publishedCount  = userPosts.filter(
    (post)=> post.status ==="published"
).length;
const draftCount  = userPosts.filter(
    (post)=> post.status ==="draft"
).length;

  return (
  <Layout>
      <div className="overflow-x-auto min-h-screen  text-[var(--color)]">
        <div className="flex justify-between items-center flex-wrap mb-6 pl-2 gap-4">
            <div>
            <h1 className="pl-2">
            <span className="font-bold text-5xl drop-shadow-md">Hi, {userData.username}</span> 
            </h1>
        <p className="mb-6 p-2 mt-5 italic drop-shadow-md text-2xl">
            You have overall {userPosts.length} arts created so far!
            <br/>
             {publishedCount}-Published & {draftCount}-drafts...
        </p>
        </div>

        {/* creating post  */}
        <div>
            <button className="flex items-center space-x-3 px-6 py-4 border-3 border-[var(--border)] shadow-lg text-4xl cursor-pointer">
                <span><PlusIcon
                size={32}
                weight="bold"
                /></span>
                <span className="drop-shadow-md ">Create Art</span>

            </button>
        </div>


        </div>
      

        <div className="flex justify-between items-center mb-2 drop-shadow-md">
            <div className="relative  p-1 w-full max-w-sm">
        <input
          type="search"
          placeholder="Search ArtWorks..."
          className="w-full p-3 pr-10 rounded-full border-3 text-[var(--color)] border-[var(--border)]  transition duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--border)]"
        />
        <MagnifyingGlassIcon
          size={28}
          weight="regular"
          className="absolute right-5 top-1/2 -translate-y-1/2"
        />
      </div>

          <div className="flex space-x-3 mb-2">
            {/* goback  */}
            <button
              className=" flex items-center space-x-1 px-3 py-1 border-2 border-[var(--border)] bg-[var(--sbgc)]"
              title="go back"
            >
              <LessThanIcon size={24} weight="regular" />{" "}
            </button>{" "}
            {/* custom  */}
            <button
              className=" flex items-center space-x-1 px-3 py-1 border-2 border-[var(--border)] bg-[var(--sbgc)]"
              title="enter your own number"
            >
              <HashIcon size={24} weight="regular" />{" "}
            </button>{" "}
            {/* go front  */}
            <button
              className=" flex items-center space-x-1 px-3 py-1 border-2 border-[var(--border)] bg-[var(--sbgc)]"
              title="go front"
            >
              <GreaterThanIcon size={24} weight="regular" />{" "}
            </button>
          </div>
        </div>

        {/* lower table  */}
        <table className="min-w-full rounded-xl shadow-md overflow-hidden px-0">
          <thead className="bg-[var(--sbgc)] text-2xl uppercase">
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
            {userPosts.map((post) => (
              <tr
                key={post.image_id}
              >
                <td className="px-3 py-3">
                  <div className="flex justify-start">                   
                      <span className="ml-1">{post.image_id}</span>
                  </div>
                </td>
                <td className="py-4 px-4">{post.image_name}</td>
                <td className="px-6 py-3 text-left">{post.status}</td>
                <td className="px-4 py-3 text-right">{post.visibility}</td>
                <td className="px-4 py-3 text-right pr-5">{post.upload_date}</td>
                <td className="px-4 py-3 text-right">
                 <div className="flex justify-end items-center space-x-3">
                    <button>
                        <EyeIcon size={24} weight="regular"/> 
                    </button>
                    <button>
                        <PencilIcon size={24} weight="regular"/> 
                    </button>
                    <button>
                        <TrashIcon size={24} weight="regular"/> 
                    </button>
             
                 </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
