import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Layout from "./layouts/layout";
import { getFullUrl } from "../utils/urlHelpers";
import { API_BASE } from "../utils/api";

export default function SearchData() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword") || "";

  const [searchResults, setSearchResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!keyword) {
        setSearchResults([]);
        return;
      }

      setLoadingSearch(true);
      try {
        const res = await fetch(`${API_BASE}/users/search/artists?keyword=${encodeURIComponent(keyword)}`);
        const data = await res.json();
        setSearchResults(data?.message ? [] : data);
      } catch (err) {
        console.error(err);
        setSearchResults([]);
      } finally {
        setLoadingSearch(false);
      }
    };

    fetchResults();
  }, [keyword]);

  return (
    <Layout>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-[var(--color)]">
          Search results for "{keyword}"
        </h2>

        {loadingSearch && <p className="text-gray-500">Loading...</p>}

        {!loadingSearch && searchResults.length === 0 && (
          <p className="text-sm text-gray-500">No artists found.</p>
        )}

        <div className="mt-2 space-y-2 max-h-96 overflow-y-auto">
          {searchResults.map((artist) => (
            <NavLink
              key={artist.id}
              to={`/profile/${artist.username}`}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--sbgc)] transition"
            >
              <img
                src={getFullUrl(artist.profile_pic || "/default-avatar.png")}
                alt={artist.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-[var(--color)]">{artist.username}</span>
                <span className="text-sm text-gray-400">{artist.full_name}</span>
                {artist.biography && (
                  <span className="text-xs text-gray-500 truncate max-w-xs">{artist.biography}</span>
                )}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </Layout>
  );
}
