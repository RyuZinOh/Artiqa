import { useCallback, useEffect, useState } from "react";
import UserContext from "./UserContext";
import { fetchPfp } from "../getter";
import { useAuth } from "../../../../context/useAuth";

export function UserProvider({ children }) {
  const { auth } = useAuth();
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getProfilePic = useCallback(async () => {
    if (!auth?.token) return;

    try {
      setLoading(true);
      setError(null);
      const pic = await fetchPfp(auth.token);
      setProfilePic(pic);
    } catch (err) {
      setError(err.message || "Failed to load profile picture");
      setProfilePic(null);
    } finally {
      setLoading(false);
    }
  }, [auth?.token]);

  const refreshProfilePic = useCallback(async () => {
    await getProfilePic();
  }, [getProfilePic]);

  useEffect(() => {
    if (auth?.token && !profilePic && !loading) {
      getProfilePic();
    }
  }, [auth?.token, profilePic, loading, getProfilePic]);

  return (
    <UserContext.Provider
      value={{ profilePic, loading, error, refreshProfilePic }}
    >
      {children}
    </UserContext.Provider>
  );
}
