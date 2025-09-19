import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../../../../context/useAuth";
import { toast } from "react-toastify";
import MineArtsContext from "./MineArtsContext";

export default function MineArtsProvider({ children }) {
  const { auth } = useAuth();
  const [mineArts, setMineArts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMineArts = useCallback(async () => {
    if (!auth?.token) return;
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_STATIC_FAST_API_URL}/artists/arts/mine`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch your arts");
      const data = await res.json();
      setMineArts(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [auth?.token]);

  const refreshMineArts = useCallback(() => fetchMineArts(), [fetchMineArts]);

  useEffect(() => {
    fetchMineArts();
  }, [fetchMineArts]);

  return (
    <MineArtsContext.Provider
      value={{ mineArts, setMineArts, loading, error, refreshMineArts }}
    >
      {children}
    </MineArtsContext.Provider>
  );
}
