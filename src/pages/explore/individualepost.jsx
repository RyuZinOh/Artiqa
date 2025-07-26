import { useParams } from "react-router-dom";
import posts from "../../../public/dummy/posts.json";
import Layout from "../../components/layouts/layout";

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export default function IndividualePost() {
  const { slug } = useParams();

  const post = posts.find((postItem) => slugify(postItem.title) === slug);

  return (
    <Layout>
      <div>
        <img
          src={post.image}
          alt={post.title}
          className="w-90 object-cover"
          loading="lazy"
        />
        <h1>{post.title}</h1>
        <h1>{post.description}</h1>
        <h1>{post.artist}</h1>
        <h1>{post.hearts}</h1>
        <h1>{post.critiques.length}</h1>
        <div>
          <ul>
            {post.critiques.map((c, i) => (
              <li key={i}>
                {c.user}:{c.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
