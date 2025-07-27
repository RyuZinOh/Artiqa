import { useParams } from "react-router-dom";
import posts from "../../dummy/posts.json";
import Layout from "../../components/layouts/layout";
import { HeartIcon, PaperPlaneRightIcon } from "@phosphor-icons/react";
import { ChatTeardropTextIcon } from "@phosphor-icons/react/dist/ssr";
import weekly from "/assets/mascot_emotes/artcomptweekly.png"

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export default function IndividualePost() {
  const { slug } = useParams();

  const post = posts.find((postItem) => slugify(postItem.title) === slug);

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-4 ">
        {/* critiques  */}
        <div className="md:w-1/2 border-black border-3 p-4">
          <div className="flex items-center space-x-2 mb-2">
            <ChatTeardropTextIcon size={24} weight="bold" />
            <span className="text-lg font-black">{post.critiques.length}</span>
          </div>
          <ul className="space-y-2 border-3 border-black p-2">
            {post.critiques.map((c, i) => (
              <li key={i} className="bg-[var(--primary)] p-2">
                <div className="flex items-center space-x-2">
                  <img
                    src={c.userpfp}
                    alt="pfp"
                    className="w-6 h-6 border border-black rounded-2xl"
                  />
                  <span>{c.user}</span>
                  <span className="inline-block h-4 border-l"></span>
                  <span className="text-sm">{c.text}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="relative w-full mt-2">
            <textarea
              className="resize-none w-full border-3 p-2 border-black mt-2"
              placeholder="Add your critique..."
              rows={4}
            />

            <button type="submit" className="absolute right-1 bottom-3 text-black">
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
            src={post.image}
            alt={post.description}
            className="w-full object-cover border-3 border-black"
            loading="lazy"
          />

          <div className="mt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img
                  src={post.artistpfp}
                  alt="user pfp"
                  className="w-8 h-8 rounded-2xl"
                  loading="lazy"
                />
                <span className="text-sm  font-bold">{post.artist}</span>
              </div>

              <div className="flex items-center space-x-1 text-sm text-gray-800">
                <HeartIcon size={24} weight="bold" />
                <span className="font-bold text-xl">{post.hearts}</span>
              </div>
            </div>
            <p className="text-gray-800 mt-4">{post.description}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
