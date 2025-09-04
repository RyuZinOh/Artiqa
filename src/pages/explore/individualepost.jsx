import { useParams } from "react-router-dom";
import Layout from "../../components/layouts/layout";
import { HeartIcon, PaperPlaneRightIcon } from "@phosphor-icons/react";
import { ChatTeardropTextIcon } from "@phosphor-icons/react/dist/ssr";
import weekly from "/assets/mascot_emotes/artcomptweekly.png"
import { getFullUrl } from "../../utils/urlHelpers";
import users from "../../dummy/user.json";
import { slugify } from "../../utils/slugify";


export default function IndividualePost() {
  const { slug } = useParams();
  let post, postUser;
  for (const user of users){
    const found = user.overall_posts.find(p=>slugify(p.image_name) === slug);
    if (found){
      post = found;
      postUser = user;
      break;
    }
  }


  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-4 ">
        {/* critiques  */}
        <div className="md:w-1/2 border-[var(--border)] border-3 p-4 flex flex-col h-225 text-[var(--color)]">
          <div className="flex items-center space-x-2 mb-2">
            <ChatTeardropTextIcon size={24} weight="bold" />
            <span className="text-lg text-[var(--color)]">{post.critiques.length}</span>
          </div>
          <div className="flex-1 overflow-y-auto border-3 border-[var(--border)] p-2 space-y-2">
            {post.critiques.map((c, i) => (
              <div key={i} className="bg-[var(--sbgc)] p-2 border-3 border-[var(--border)]">
                <div className="flex items-center space-x-2 ">
                  <img
                    src={getFullUrl(c.userpfp)}
                    alt="pfp"
                    className="w-6 h-6 border border-[var(--border)] rounded-2xl"
                  />
                  <span>{c.user}</span>
                  <span className="inline-block h-4 border-l"></span>
                  <span className="text-sm ">{c.text}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="relative h-28 mt-2 mb-2">
            <textarea
              className="resize-none w-full border-3 p-2 border-[var(--border)] mt-2"
              placeholder="Add your critique..."
              rows={4}
            />

            <button type="submit" className="absolute right-2 bottom-0 ">
              <PaperPlaneRightIcon size={24} weight="bold" />
            </button>
          </div>
        </div>

        {/* imagepost  */}
        <div className="relative md:w-1/2">
          {post.isCompeting && (
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
                <img
                  src={getFullUrl(postUser.profile_picture)}
                  alt="user pfp"
                  className="w-8 h-8 rounded-2xl border-2 border-[var(--border)]"
                  loading="lazy"
                />
                <span className="text-sm   text-[var(--color)] font-bold">{postUser.username}</span>
              </div>

              <div className="flex items-center space-x-1 text-sm text-[var(--color)]">
                <HeartIcon size={24} weight="bold" />
                <span className="font-bold text-xl">{post.hearts}</span>
              </div>
            </div>
            <p className="text-[var(--color)] mt-4">{post.description}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
