import Layout from "../components/layouts/layout";
import {
  CrownSimpleIcon,
  GreaterThanIcon,
  HashIcon,
  LessThanIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { getFullUrl } from "../utils/urlHelpers";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { API_BASE } from "../utils/api";
import { toast } from "react-toastify";

export default function Weekly() {
  const {userData} = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 15;

  
  useEffect(() =>{
    async function fetchLeaderboard() {
      try{
        const res = await fetch(`${API_BASE}/users/leaderboard`);
        const data = await res.json();
        data.sort((a,b)=> b.weekly_wins - a.weekly_wins || b.engagement_points - a.engagement_points);
        setLeaderboard(data);
      }catch(err){
        toast.error(`failed to fetch leaderboard ${err}`)
      }
    }
    fetchLeaderboard();
  }, []);

  const totalPages = Math.ceil(leaderboard.length / perPage);
  const paginatedData = leaderboard.slice((currentPage -1) * perPage, currentPage * perPage);

  const currentUser = userData?.user?.username ? leaderboard.find(u => u.username === userData.user.username) : null;

  const currentRank = currentUser ? leaderboard.findIndex(u=> u.username === currentUser.username) +1 : null;






  return (
    <Layout>
      {/* upper table  userSpecific */}
     {currentUser &&(
      <div className="mb-10">
        <table className="min-w-full drop-shadow-md text-gray-500">
          <tbody className="text-md border-3  border-[var(--border)] overflow-hidden">
            <tr className="bg-[var(--bgc)]">
              <td className="px-3 py-3 text-left w-[5%]">
                {currentRank}
              </td>
              <td className="px-4 py-3 text-left w-[20%]">{currentUser.username}</td>
              <td className="px-6 py-3 text-left w-[30%]">
                {currentUser.engagement_points}
              </td>

              <td className="px-6 py-3 text-left w-[25%]">
                {currentUser.weekly_wins}
              </td>
              <td className="px-4 py-3 pr-5 text-right w-[20%]">{new Date(currentUser.joined_at).toLocaleDateString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
     )}

  {/* Pagination & Controls */}
      <div className="overflow-x-auto text-[var(--color)] mb-2 flex justify-between items-center">
        <div className="flex space-x-3">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            className="p-2 cursor-pointer border-3 border-[var(--border)] bg-[var(--sbgc)] rounded-lg"
            title="Previous page"
          >
            <LessThanIcon size={22} weight="bold" />
          </button>

          <button
            onClick={() => {
              const page = prompt(`Enter page number (1-${totalPages})`);
              if (page && !isNaN(page)) {
                const pageNum = Math.min(Math.max(parseInt(page), 1), totalPages);
                setCurrentPage(pageNum);
              }
            }}
            className="p-2 border-3 cursor-pointer border-[var(--border)] bg-[var(--sbgc)] rounded-lg"
            title="Go to page"
          >
            <HashIcon size={22} weight="bold" />
          </button>

          <button
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            className="p-2 border-3 border-[var(--border)] cursor-pointer bg-[var(--sbgc)] rounded-lg"
            title="Next page"
          >
            <GreaterThanIcon size={22} weight="bold" />
          </button>
        </div>
      </div>

        {/* lower table  */}
        <div className="mt-2 rounded-md  overflow-hidden border-3 border-[var(--border)]">

        <table className="min-w-full ">

          <thead className="bg-[var(--sbgc)] text-2xl uppercase border-b-3 border-[var(--border)]">
            <tr>
              <th className="px-3 py-3 text-left w-[5%]">#</th>
              <th className="px-4 py-3 text-left w-[20%]">Artist</th>
              <th className="px-6 py-3 text-left w-[30%]">Engagement Points</th>
              <th className="px-6 py-3 text-left w-[25%]">Wins</th>
              <th className="px-4 py-3 pr-5 text-right w-[20%]">Joined At</th>
            </tr>
          </thead>

          <tbody className="text-md">
            {paginatedData.map((entry, index) => (
              <tr
                key={index}
              >
                <td className="px-3 py-3">
                  <div className="flex justify-start">
                    {(currentPage -1) * perPage + index+1 === 1 ? (
                      <CrownSimpleIcon
                        size={20}
                        weight="bold"
                        className="text-[var(--color)]"
                      />
                    ) : (
                      <span className="ml-1">{
                        (currentPage-1) * perPage +index+1
                      }</span>
                    )}
                  </div>
                </td>
                <td className="py-4 px-4">

                        <NavLink
                        to={`/profile/${entry.username}`}
                        className="flex items-center gap-3 hover:underline"
                        >
                                          <img
                                          src={getFullUrl(entry.profile_picture)}
                                          alt={entry.artist}
                                          className="w-8 h-8 rounded-full object-cover cursor-pointer"
                                          />
                                          <span
                                          className="hover:underline cursor-pointer"
                                          >{entry.username}</span>
                        </NavLink>

                </td>
                <td className="px-6 py-3 text-left">{entry.engagement_points}</td>
                <td className="px-6 py-3 text-left">{entry.weekly_wins}</td>
                <td className="px-4 py-3 text-right pr-5">{new Date(entry.joined_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        <div className="flex justify-between mt-2 text-[var(--color)]">
          <span>Page {currentPage} of {totalPages}</span>
        </div>
    </Layout>
  );
}
