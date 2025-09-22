import { useEffect, useState } from "react";
import Layout from "../../../components/layouts/layout";
import { getFullUrl } from "../../../utils/urlHelpers";
import { useAuth } from "../../../context/useAuth";
import { toast } from "react-toastify";
import { PlusIcon, XIcon } from "@phosphor-icons/react";
import { API_BASE } from "../../../utils/api";

export default function Gallery() {
  const { auth } = useAuth();
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [arts, setArts] = useState([]);
  const [loadingArts, setLoadingArts] = useState(false);
  const [loadingGalleries, setLoadingGalleries] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGalleryName, setNewGalleryName] = useState("");

  useEffect(() => {
    const fetchGalleries = async () => {
      setLoadingGalleries(true);
      try {
        const res = await fetch(
          `${API_BASE}/artists/gallery/mine`,
          { headers: { Authorization: `Bearer ${auth.token}` } }
        );
        if (!res.ok) throw new Error("Failed to fetch galleries");
        const data = await res.json();
        setGalleries(data);
        if (data.length > 0) setSelectedGallery(data[0].id);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load galleries");
      } finally {
        setLoadingGalleries(false);
      }
    };
    fetchGalleries();
  }, [auth.token]);

  useEffect(() => {
    if (!selectedGallery) return;

    const fetchArts = async () => {
      setLoadingArts(true);
      try {
        const res = await fetch(
          `${API_BASE}/artists/gallery/${selectedGallery}/arts`,
          { headers: { Authorization: `Bearer ${auth.token}` } }
        );
        if (!res.ok) throw new Error("Failed to fetch arts");
        const data = await res.json();
        setArts(data.arts || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load artworks");
      } finally {
        setLoadingArts(false);
      }
    };
    fetchArts();
  }, [auth.token, selectedGallery]);

 const handleCreateGallery = async () => {
  if (!newGalleryName.trim()) return toast.error("Gallery name cannot be empty");
  try {
    const res = await fetch(`${API_BASE}/artists/gallery/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({ tag_name: newGalleryName }), 
    });
    if (!res.ok) throw new Error("Failed to create gallery");
    const createdGallery = await res.json();
    setGalleries((prev) => [...prev, createdGallery]);
    setSelectedGallery(createdGallery.id);
    setIsModalOpen(false);
    setNewGalleryName("");
    toast.success(`Gallery '${createdGallery.name}' created`);
  } catch (err) {
    console.error(err);
    toast.error("Failed to create gallery");
  }
};


  if (loadingGalleries) return <Layout>Loading galleries...</Layout>;

  return (
    <Layout>
      <div className="max-w-[1374px] mx-auto py-4 px-2">
        <h1 className="text-4xl font-bold text-[var(--color)] mb-4 flex items-center justify-between">
          My Galleries
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-3 py-1 bg-[var(--sbgc)] border-2 border-[var(--border)] rounded-full hover:bg-[var(--bgc)] transition"
          >
            <PlusIcon size={20} weight="bold" />
            <span>Create Gallery</span>
          </button>
        </h1>

        {/* Gallery pills */}
        <div className="flex flex-wrap gap-3 mb-6">
          {galleries.map((g) => (
            <span
              key={g.id}
              onClick={() => setSelectedGallery(g.id)}
              className={`px-4 py-2 rounded-full border-2 border-[var(--border)] cursor-pointer transition
                ${selectedGallery === g.id ? "bg-[var(--sbgc)] font-bold" : "bg-[var(--bgc)] hover:bg-[var(--sbgc)]"}`}
            >
              {g.name} ({g.arts_count})
            </span>
          ))}
        </div>

        {/* Arts grid */}
        {loadingArts ? (
          <p className="text-center mt-20 text-gray-500">Loading artworks...</p>
        ) : arts.length === 0 ? (
          <p className="text-gray-500 text-center mt-20">No artworks in this gallery yet.</p>
        ) : (
          <div className="min-h-screen columns-[375px] gap-1 box-border transition-all duration-300">
            {arts.map((art, idx) => (
              <div
                key={art.art_id || idx}
                className="relative mb-1 border-3 border-[var(--border)] group overflow-hidden block"
              >
                <img
                  src={getFullUrl(art.image_url)}
                  alt={art.description}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-[var(--sbgc)] p-6 rounded-xl shadow-lg w-96 relative">
            <button
              className="absolute top-3 right-3 text-[var(--color)]"
              onClick={() => setIsModalOpen(false)}
            >
              <XIcon size={24} weight="bold" />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-[var(--color)]">Create New Gallery</h2>
            <input
              type="text"
              placeholder="Gallery Name"
              className="w-full p-2 border-3 border-[var(--border)] rounded mb-4 text-[var(--color)]"
              value={newGalleryName}
              onChange={(e) => setNewGalleryName(e.target.value)}
            />
            <button
              onClick={handleCreateGallery}
              className="bg-[var(--bgc)] hover:bg-[var(--sbgc)] text-[var(--color)] border-3 border-[var(--border)] cursor-pointer rounded-md p-2"
            >
              Create
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
