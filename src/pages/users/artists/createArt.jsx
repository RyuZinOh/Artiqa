import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../context/useAuth";
import { toast } from "react-toastify";
import { EyeClosedIcon, EyeIcon, ImageIcon, TextboxIcon, TrophyIcon, UploadIcon, XIcon } from "@phosphor-icons/react";
import { useStatistics } from "./context/statisticswala/useStatistics";
import { useMineArts } from "./context/minearts/useMineArts";
import { useExplore } from "../../context/Exploration/useExplore";

export default function CreateArt({ onArtCreated }) {
  const { auth } = useAuth();
  const {refreshMineArts} = useMineArts();
  const {refreshArts} = useExplore();
  const {refreshStats} = useStatistics();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("draft");
  const [visibility, setVisibility] = useState("private");
  const [isCompeting, setIsCompeting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const fileSize = useMemo(() => (file ? (file.size / 1024 / 1024).toFixed(2) : "0"), [file]);

  const handleFileChange = useCallback(
    (e) => {
      const sf = e.target.files[0];
      if (!sf) return;

      if (!sf.type.startsWith("image/")) {
        toast.error("Only image files are allowed");
        return;
      }

      if (sf.size > 10 * 1024 * 1024) {
        toast.error("File exceeds 10MB limit");
        return;
      }

      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setFile(sf);
      setPreviewUrl(URL.createObjectURL(sf));
    },
    [previewUrl]
  );

  const resetForm = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl("");
    setImageName("");
    setDescription("");
    setStatus("draft");
    setVisibility("private");
    setIsCompeting(false);
    setTags([]);
    setTagInput("");
  }, [previewUrl]);

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a file");
    if (!imageName.trim()) return toast.error("Please enter the image name");

    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("image_name", imageName);
    fd.append("description", description);
    fd.append("status_str", status);
    fd.append("visibility", visibility);
    fd.append("is_competing", isCompeting ? "true" : "false");
    tags.forEach((tag) => fd.append("tag_names", tag));

    try {
      const res = await fetch(`${import.meta.env.VITE_STATIC_FAST_API_URL}/artists/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${auth.token}` },
        body: fd,
      });

      if (!res.ok) throw new Error("Failed to upload art.");
      const newArt = await res.json();
      onArtCreated(newArt);
      resetForm();
      refreshStats(); //the uploadig wont refresh because we are using the chron job there so it have to be manually or along with be handled.
      refreshMineArts();
      refreshArts();
      toast.success("Artwork uploaded successfully!");
    } catch (error) {
      toast.error("Upload error: " + error.message);
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => () => previewUrl && URL.revokeObjectURL(previewUrl), [previewUrl]);

  const canSubmit = useMemo(() => !uploading && file && imageName.trim(), [uploading, file, imageName]);

  return (
    <div className="rounded-xl p-8 w-full max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold text-[var(--color)] mb-4">Create New Art</h2>

      {/* Tags */}
      <div className="mb-4">
        <label className="text-sm font-medium text-[var(--color)] mb-1">Tags (comma separated)</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="tag1, tag2, tag3"
            className="flex-1 border-3 border-[var(--border)] rounded-lg p-2 bg-[var(--bgc)]"
            disabled={uploading}
          />
          <button
            type="button"
            onClick={() => {
              const newTags = tagInput.split(",").map((t) => t.trim()).filter(Boolean);
              setTags([...tags, ...newTags]);
              setTagInput("");
            }}
            disabled={uploading || !tagInput.trim()}
            className="px-3 py-1 rounded border-3 border-[var(--border)] bg-[var(--bgc)] cursor-pointer hover:bg-[var(--sbgc)]"
          >
            Add
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((t, i) => (
            <span key={i} className="px-2 py-1 bg-[var(--sbgc)] rounded-full text-sm flex items-center gap-1">
              {t}
              <button type="button" onClick={() => setTags(tags.filter((_, idx) => idx !== i))}>
                <XIcon size={16} weight="regular" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Image Preview */}
        <div className="space-y-4  w-full">
          <div className="border-3 h-80 border-dashed border-[var(--border)] rounded-xl overflow-hidden">
            <input type="file" id="file-upload" accept="image/*" onChange={handleFileChange} className="hidden" disabled={uploading} />
            <label htmlFor="file-upload" className="cursor-pointer block w-full">
              {previewUrl ? (
                <div className="relative w-full aspect-square overflow-hidden">
                  <img src={previewUrl} alt="preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[var(--sbgc)] bg-opacity-0 hover:bg-opacity-60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <div className="text-[var(--color)] text-center">
                      <UploadIcon size={32} weight="bold" className="mx-auto" />
                      <p>Change Image</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <ImageIcon size={48} className="mb-2 text-[var(--color)]" />
                  <p className="text-[var(--color)]">Click to upload an Image</p>
                  <p className="text-[var(--color)] mt-1">PNG, JPG, JPEG up to 10MB</p>
                </div>
              )}
            </label>
          </div>
          {file && (
            <div className="text-sm text-[var(--color)] flex justify-between items-center bg-[var(--sbgc)] p-2 rounded-lg">
              <span className="truncate">{file.name}</span>
              <span>{fileSize} MB</span>
            </div>
          )}
        </div>

        {/* Image Details */}
        <div className="space-y-4">
          <div>
            <label htmlFor="image_name" className="text-sm font-medium text-[var(--color)] mb-1 flex items-center gap-1">
              <TextboxIcon size={16} weight="bold" /> Image Name (alias)
            </label>
            <input
              id="image_name"
              type="text"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
              placeholder="Artistry..."
              className="w-full border-3 border-[var(--border)] bg-[var(--bgc)] rounded-lg p-3"
              disabled={uploading}
            />
          </div>

          <div>
            <label htmlFor="description" className="text-sm font-medium text-[var(--color)] mb-1 flex items-center gap-1">
              <TextboxIcon size={16} weight="bold" /> Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your artwork..."
              className="w-full border-3 border-[var(--border)] rounded-lg bg-[var(--bgc)] p-3 resize-y"
              disabled={uploading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="status" className="text-sm font-medium text-[var(--color)] mb-1 flex items-center gap-1">
                <TextboxIcon size={16} weight="bold" /> Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border-3 bg-[var(--bgc)] border-[var(--border)] rounded-lg p-2.5"
                disabled={uploading}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div>
              <label htmlFor="visibility" className="text-sm font-medium text-[var(--color)] mb-1 flex items-center gap-1">
                {visibility === "public" ? <EyeIcon size={16} weight="bold" /> : <EyeClosedIcon size={16} weight="bold" />} Visibility
              </label>
              <select
                id="visibility"
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                className="w-full border-3 bg-[var(--bgc)] border-[var(--border)] rounded-lg p-2.5"
                disabled={uploading}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>

          {/* Competing Toggle */}
          <div className="flex items-center pt-2">
            <label htmlFor="competing" className="flex items-center gap-2 text-[var(--color)] cursor-pointer">
              <div className="relative">
                <input type="checkbox" id="competing" checked={isCompeting} onChange={(e) => setIsCompeting(e.target.checked)} className="sr-only" disabled={uploading} />
                <div className={`w-10 h-6 rounded-full border-3 border-[var(--border)] transition ${isCompeting ? "bg-[var(--sbgc)]" : "bg-[var(--bgc)]"}`}></div>
                <div className={`absolute left-0.5 top-0.5 bg-[var(--color)] w-5 h-5 rounded-full transition transform ${isCompeting ? "translate-x-4" : ""}`}></div>
              </div>
              <div className="flex items-center gap-1">
                <TrophyIcon size={24} weight={isCompeting ? "bold" : "regular"} />
                <span className="font-medium">Enter in weekly Competition</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex flex-col justify-between items-center gap-4 pt-4 border-t-3 border-[var(--border)]">
        <div className="text-sm text-[var(--color)]">{file ? "Ready to upload your artwork" : "Select an image to get started"}</div>
        <button
          onClick={handleUpload}
          disabled={!canSubmit}
          className={`px-6 py-3 font-medium flex border-3 rounded-full border-[var(--border)] items-center gap-2 transition hover:bg-[var(--bgc)] ${
            uploading ? "opacity-70 cursor-wait" : !canSubmit ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
          }`}
        >
          {uploading ? (
            <>
              <div className="w-5 h-5 border-3 border-[var(--border)] animate-spin rounded-full"></div>
              Uploading...
            </>
          ) : (
            <>
              <UploadIcon size={24} weight="bold" />
              Create Art
            </>
          )}
        </button>
      </div>
    </div>
  );
}
