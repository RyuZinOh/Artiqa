import { useCallback, useEffect, useState } from "react";
import ExploreContext from "./ExploreContext";
import { fetchAllArts } from "../getter";
export function ExploreProvider({ children }) {
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getArts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllArts();
      setArts(data);
    } catch (err) {
      setError(err.message || "Failed to load arts");
      setArts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshArts = useCallback(async () => {
    await getArts();
  }, [getArts]);

  useEffect(() => {
    if (!arts.length && !loading) {
      getArts();
    }
  }, [arts.length, loading, getArts]);

  return (
    <ExploreContext.Provider value={{ arts, loading, error, refreshArts }}>
      {children}
    </ExploreContext.Provider>
  );
}
