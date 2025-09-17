import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";
import { toast } from "react-toastify";
import Layout from "../../../components/layouts/layout";
import { getFullUrl } from "../../../utils/urlHelpers";

export default function ViewArt() {
  const { artId } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [art, setArt] = useState(null);

  useEffect(() => {
    const fetchArt = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_STATIC_FAST_API_URL}/artists/art/${artId}`,
          { headers: { Authorization: `Bearer ${auth.token}` } }
        );

        if (!res.ok) throw new Error("Failed to fetch art");
        const artData = await res.json();
        setArt(artData);

      } catch (error) {
        console.error("Error fetching art:", error);
        toast.error("Failed to load artwork.");
      }
    };

    if (auth?.token) fetchArt();
  }, [artId, auth?.token]);

  if (!art) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Artwork not found</h2>
          <p className="text-gray-600 mb-4">
            The artwork may have been deleted or you don't have permission to view it.
          </p>
          <button 
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Go Back
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-12">
        <div className="flex-1 rounded-2xl overflow-hidden shadow-2xl border-[var(--border)] border group">
          <img
            src={getFullUrl(art.image_url)}
            alt={art.image_name}
            className="w-full h-full object-cover  transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="p-4 rounded-lg border-[var(--border)] border bg-[var(--sbgc)] shadow-md">
            <h1 className="text-4xl font-bold mb-2 text-[var(--color)]">{art.image_name}</h1>
            <p className="text-lg font-semibold text-gray-700 mb-2">By {art.username || "Unknown Artist"}</p>
            <div className="h-1 w-24 bg-[var(--border)] mb-4"></div>
            <p className="text-gray-800 leading-relaxed">{art.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 border-[var(--border)] border rounded-lg bg-[var(--bgc)]">
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium capitalize">{art.status}</p>
            </div>
            <div className="p-3 border-[var(--border)] border rounded-lg bg-[var(--bgc)]">
              <p className="text-sm text-gray-500">Visibility</p>
              <p className="font-medium capitalize">{art.visibility}</p>
            </div>
            <div className="p-3 border-[var(--border)] border rounded-lg bg-[var(--bgc)]">
              <p className="text-sm text-gray-500">Competing</p>
              <p className="font-medium">{art.is_competing ? "Yes" : "No"}</p>
            </div>
            <div className="p-3 border-[var(--border)] border rounded-lg bg-[var(--bgc)]">
              <p className="text-sm text-gray-500">Upload Date</p>
              <p className="font-medium">{new Date(art.upload_date).toLocaleDateString()}</p>
            </div>
          </div>

          <button className="mt-4 px-6 py-3 border-[var(--border)] border rounded-lg hover:bg-gray-50 transition-colors">
            Add to Gallery (Coming Soon)
          </button>
        </div>
      </div>

    </Layout>
  );
}
