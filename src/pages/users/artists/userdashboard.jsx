import Layout from "../../../components/layouts/layout";
import {
  EyeIcon,
  GreaterThanIcon,
  HashIcon,
  LessThanIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  TrashIcon,
  XIcon,
} from "@phosphor-icons/react";
import { useAuth } from "../../../context/useAuth";
import { useEffect, useState } from "react";
import CreateArt from "./createArt";
import erzalearning from "/assets/mascot_emotes/erzalearning.svg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();
  const { auth, userData } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDescription, setEditingDescription] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const truncateText = (text, length = 15) =>
    text?.length > length ? text.slice(0, length) + "..." : text;

  const handleSaveDescription = async (artId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_STATIC_FAST_API_URL}/artists/update/${artId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({ description: editedDescription }),
        }
      );
      if (!res.ok) throw new Error("Failed to update description");
      const updatedArt = await res.json();
      setUserPosts((prev) =>
        prev.map((p) => (p.art_id === artId ? updatedArt : p))
      );
      setEditingDescription(null);
      toast.success("Description updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update description");
    }
  };

  const handleStatusChange = async (artId, newStatus) => {
    let payload = { status: newStatus };
    
    // brain
    if (newStatus === "published") {
      payload.visibility = "public";
    } else if (newStatus === "draft") {
      payload.visibility = "private";
    }
    
    try {
      const res = await fetch(
        `${import.meta.env.VITE_STATIC_FAST_API_URL}/artists/update/${artId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error("Failed to update status");
      const updatedArt = await res.json();
      setUserPosts((prev) =>
        prev.map((p) => (p.art_id === artId ? updatedArt : p))
      );
      toast.success("Status updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  const handleVisibilityChange = async (artId, newVisibility) => {
    let payload = { visibility: newVisibility };
    
    // brain
    if (newVisibility === "public") {
      payload.status = "published";
    } else if (newVisibility === "private") {
      payload.status = "draft";
    }
    
    try {
      const res = await fetch(
        `${import.meta.env.VITE_STATIC_FAST_API_URL}/artists/update/${artId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error("Failed to update visibility");
      const updatedArt = await res.json();
      setUserPosts((prev) =>
        prev.map((p) => (p.art_id === artId ? updatedArt : p))
      );
      toast.success("Visibility updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update visibility");
    }
  };

  const handleCompetingChange = async (artId, isCompeting) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_STATIC_FAST_API_URL}/artists/update/${artId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({ is_competing: isCompeting }),
        }
      );
      if (!res.ok) throw new Error("Failed to update competing status");
      const updatedArt = await res.json();
      setUserPosts((prev) =>
        prev.map((p) => (p.art_id === artId ? updatedArt : p))
      );
      toast.success("Competing status updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update competing status");
    }
  };

  const handleDelete = async (artId, artName) => {
    if (!window.confirm(`Are you sure you want to delete "${artName}"?`)) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_STATIC_FAST_API_URL}/artists/delete/${artId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to delete art");
      setUserPosts((prev) => prev.filter((p) => p.art_id !== artId));
      toast.success(`"${artName}" deleted`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete art");
    }
  };

  useEffect(() => {
    if (!auth?.token) return;
    const fetchMineArts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_STATIC_FAST_API_URL}/artists/arts/mine`,
          { headers: { Authorization: `Bearer ${auth.token}` } }
        );
        if (!res.ok) throw new Error("Failed to fetch arts");
        const data = await res.json();
        setUserPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMineArts();
  }, [auth?.token]);

  const publishedCount = userPosts.filter((p) => p.status === "published").length;
  const draftCount = userPosts.filter((p) => p.status === "draft").length;
  
  const filteredPosts = userPosts.filter(post => 
    post.image_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleArtCreated = (newArt) => {
    setUserPosts((prev) => [newArt, ...prev]);
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <div className="overflow-x-auto min-h-screen text-[var(--color)]">
        <div className="flex justify-between items-center flex-wrap mb-6 gap-4">
          <div>
            <h1>
              <span className="font-bold text-5xl drop-shadow-md">
                Hi, {userData?.user?.username}
              </span>
            </h1>
            <p className="mb-6 mt-5 italic drop-shadow-md text-2xl">
              You have overall {userPosts.length} arts created so far!
              <br />
              {publishedCount}-Published & {draftCount}-drafts...
            </p>
          </div>
          <button
            className="flex rounded-full items-center space-x-3 px-6 border-3 border-[var(--border)] text-xl shadow-lg cursor-pointer bg-[var(--sbgc)] hover:bg-[var(--bgc)]"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusIcon size={24} weight="bold" className="mr-1" /> create Art
          </button>
          <Modal isOpen={isModalOpen} onclose={() => setIsModalOpen(false)}>
            <CreateArt onArtCreated={handleArtCreated} />
          </Modal>
        </div>

        <div className="flex justify-between items-center mb-2 drop-shadow-md">
          <div className="relative mb-2 w-full max-w-sm">
            <input
              type="search"
              placeholder="Search ArtWorks..."
              className="w-full p-3 pr-10 rounded-md border-3 text-[var(--color)] border-[var(--border)]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <MagnifyingGlassIcon
              size={28}
              weight="regular"
              className="absolute right-5 top-1/2 -translate-y-1/2"
            />
          </div>
          <div className="flex space-x-3 mb-2">
            {[LessThanIcon, HashIcon, GreaterThanIcon].map((Icon, i) => (
              <button
                key={i}
                className="p-2 border-3 border-[var(--border)] bg-[var(--sbgc)] rounded-lg"
              >
                <Icon size={22} weight="bold" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-2 rounded-md overflow-hidden border-3 border-[var(--border)] ">
          <table className="min-w-full  shadow-md overflow-hidden px-0">
            <thead className=" text-2xl bg-[var(--sbgc)] uppercase border-b-3 border-[var(--border)]">
              <tr>
                <th className="px-3 py-3 text-left w-[5%]">#</th>
                <th className="px-4 py-3 text-left w-[20%]">Art</th>
                <th className="px-6 py-3 text-left w-[25%]">Description</th>
                <th className="px-6 py-3 text-left w-[10%]">Status</th>
                <th className="px-4 py-3 text-right w-[10%]">Visibility</th>
                <th className="px-4 py-3 text-right w-[10%]">Competing</th>
                <th className="px-4 py-3 pr-5 text-right w-[10%]">Date</th>
                <th className="px-4 py-3 pr-5 text-right w-[10%]">Action</th>
              </tr>
            </thead>

            <tbody className="text-md">
              {filteredPosts.map((post, index) => (
                <tr key={post.image_id || index}>
                  <td className="px-3 py-3">{index + 1}</td>
                  <td className="py-4 px-4">{post.image_name}</td>
                  <td
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => {
                      setEditingDescription(post.art_id);
                      setEditedDescription(post.description);
                    }}
                  >
                    {editingDescription === post.art_id ? (
                      <input
                        type="text"
                        autoFocus
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        onBlur={() => handleSaveDescription(post.art_id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter")
                            handleSaveDescription(post.art_id);
                        }}
                        className="w-full border rounded px-2 py-1"
                      />
                    ) : (
                      truncateText(post.description, 15)
                    )}
                  </td>

                  <td className="px-6 py-3 text-left">
                    <select
                      value={post.status}
                      onChange={(e) => handleStatusChange(post.art_id, e.target.value)}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <select
                      value={post.visibility}
                      onChange={(e) => handleVisibilityChange(post.art_id, e.target.value)}
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </select>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <input
                      type="checkbox"
                      checked={post.is_competing}
                      onChange={(e) => handleCompetingChange(post.art_id, e.target.checked)}
                    />
                  </td>

                  <td className="px-4 py-3 text-right pr-5">
                    {new Date(post.upload_date).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end items-center space-x-3">
                      <button
                      className="cursor-pointer"
                      onClick={()=> navigate(`/management/art/${post.art_id}`) }
                      >
                        <EyeIcon size={24} weight="regular" />
                      </button>
                      <button
                        title="Delete"
                        onClick={() => handleDelete(post.art_id, post.image_name)}
                        className="cursor-pointer"
                      >
                        <TrashIcon size={24} weight="regular" />
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
    <div className="overflow-hidden fixed inset-0 z-50 flex items-center justify-center bg-[var(--bgc)]">
      <div className="relative w-full max-w-4xl">
        <img
          src={erzalearning}
          alt="Learning Mascot"
          className="absolute top-60 left-170 w-140 h-140 object-contain pointer-events-none z-100"
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