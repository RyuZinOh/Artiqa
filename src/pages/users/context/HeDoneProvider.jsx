import { useState, useEffect, useCallback } from "react";
import HeDoneContext from "./HeDoneContext";
import { useAuth } from "../../../context/useAuth";
import { fetchCommentedArts, fetchLikedArts } from "./getter";

export const HeDoneProvider = ({ children }) => {
  const { auth } = useAuth();
  const [likedArts, setLikedArts] = useState([]);
  const [commentedArts, setCommentedArts] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshHeDone = useCallback(async () => {
    if (!auth?.token) return;
    setLoading(true);
    const [liked, commented] = await Promise.all([
      fetchLikedArts(auth.token),
      fetchCommentedArts(auth.token),
    ]);
    setLikedArts(liked);
    setCommentedArts(commented);
    setLoading(false);
  }, [auth?.token]);

  useEffect(() => {
    refreshHeDone();
  }, [refreshHeDone]);

  return (
    <HeDoneContext.Provider
      value={{ likedArts, commentedArts, refreshHeDone, loading }}
    >
      {children}
    </HeDoneContext.Provider>
  );
};
