import { ChatCircleTextIcon, HeartIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import Layout from "../../components/layouts/layout";
import users from "../../dummy/user.json";
import { getFullUrl } from "../../utils/urlHelpers";

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
export default function Explore() {
  const publishedPosts  = users.flatMap(user=> 
    user.overall_posts.filter(post=> post.status == "published").map(
      post=> ({
        ...post, 
        username: user.username
      })
    )
  )
  return (
    <Layout>
      <div className=" min-h-screen columns-[375px]  gap-1 max-w-[1374px] mx-auto  box-border">
        {publishedPosts.map((post, index) => (
          <Link
            key={index}
            to={`/Explore/${slugify(post.image_name)}`}
            className="relative mb-1 border-3 border-[var(--border)] group
            overflow-hidden block"
          >
            <img
              src={getFullUrl(post.image_url)}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              loading="lazy"
            />

            <div
              className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/80 to-transparent  flex items-end justify-between px-3 
          pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 
          cursor-pointer
          
          select-none"
            >
              <span className="text-white text-sm">{post.username}</span>

              <div className="flex items-center text-white text-sm space-x-2">
                <span className="flex items-center">
                  <HeartIcon size={20} weight="regular" className="mr-1" />
                  {post.hearts}
                </span>
                <span className="flex items-center">
                  <ChatCircleTextIcon
                    size={20}
                    weight="regular"
                    className="mr-1"
                  />
                  {post.critiques.length}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
