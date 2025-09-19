import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../../../context/useAuth";
import StatisticsContext from "./StatisticsContext";
import { fetchMyStats } from "../getter";

export function StatisticsProvider({ children }) {
  const { auth } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    if (!auth?.token) return;

    try {
      setLoading(true);
      setError(null);
      const data = await fetchMyStats(auth.token);
      setStats(data);
    } catch (err) {
      setError(err.message || "Failed to load stats");
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, [auth?.token]);

  const refreshStats = useCallback(async () => {
    await fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    if (auth?.token && !stats && !loading) {
      fetchStats();
    }
  }, [auth?.token, stats, loading, fetchStats]);

  return (
    <StatisticsContext.Provider
      value={{ stats, loading, error, fetchStats, refreshStats }}
    >
      {children}
    </StatisticsContext.Provider>
  );
}
