import Layout from "../../../components/layouts/layout";
import users from "../../../dummy/user.json";
import { getFullUrl } from "../../../utils/urlHelpers";
import ccp from "../../../dummy/current_user.json"
import { useState } from "react";

export default function  Gallery(){  
  const [filter, setFilter] = useState("All");
const user = Array.isArray(users)?users.find(u=>u.username  === ccp.username): users;

    const publishedPosts  = user.overall_posts.filter(
    post => post.status == "published" && (filter === "All" || post.category === filter.toLowerCase())  //filtering cateogy  will be added in db schema [remember note!]
  );
      return(
        <Layout>

          <div className="flex justify-between items-center max-w-[1374px] mx-auto mb-4 px-2">
            <h1 className="text-4xl font-bold text-[var(--color)]">{ccp.username}</h1>
            
            {/* //tags or category something  */}
            <div className="space-x-2">
              {["All", "Myself","Anime"].map((cat)=>(
                <button
                key={cat}
                onClick={()=>setFilter(cat)}
                className={`px-4 py-4 rounded-full border-3 border-[var(--border)]
                  ${filter === cat ? "bg-[var(--sbgc)] drop-shadow-md text-xl font-bold text-[var(--color)]": "bg-[var(--bgc)]  drop-shadow-md text-xl font-bold text-[var(--color)]"}   transition-colors duration-200 cursor-pointer`}
                >
                  {cat}
                </button>
              ))}
            </div>            
          </div>



          {/* gallery  */}
              <div className=" min-h-screen columns-[375px]  gap-1 max-w-[1374px] mx-auto  box-border">
        {publishedPosts.map((post, index) => (
            <div className="relative mb-1 border-3 border-[var(--border)] group
            overflow-hidden block" >
            <img
              src={getFullUrl(post.image_url)}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              loading="lazy"
            />
            </div>
        ))}
      </div>
    </Layout>
    )

}