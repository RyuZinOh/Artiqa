import Layout from "../components/layouts/layout";
import {
  CrownSimpleIcon,
  GreaterThanIcon,
  HashIcon,
  LessThanIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { getFullUrl } from "../utils/urlHelpers";
import { NavLink } from "react-router-dom";
import { API_BASE } from "../utils/api";
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];


export default function Weekly() {
  const {userData} = useAuth();

  const [leaderboard, setLeaderboard]= useState([]);
  const [currentUserentry, setCurrentUserEntry] = useState(null);
  
  useEffect(()=>{
    fetch(`${API_BASE}/users/weekly`).then((res) => res.json()).then((data)=>{
      setLeaderboard(data);
      const username = userData?.user?.username?.trim().toLowerCase();
      if (username){
        const entry = data.find((e)=> e.username.trim().toLowerCase() === username);
        if (entry) setCurrentUserEntry(entry);
  }
}).catch((error) => console.error("failed to fetch weely leaders", error));
}, [userData?.user?.username])
  
  
  const date = new Date(); // here we will like get the created challenge date from the database and diff it through one week of time, but for now its's Just the skeleton so whatever is looking resemblance is added!
  const theme = "Whispers from Forgotten Worlds";

  const currentRank = currentUserentry ? leaderboard.findIndex((e)=> e.username === currentUserentry.username) +1:null;




  return (
    <Layout>
      <div className="drop-shadow-md flex justify-between items-center mb-4 text-[var(--color)]">
        <div className="font-bold text-2xl">
          {days[date.getUTCDay()]}, ( {date.getUTCDate()} / {date.getUTCMonth()}{" "}
          / {date.getFullYear()} )
        </div>
        <div className="text-right font-bold text-2xl drop-shadow-md text-[var(--sbgc)] bg-[var(--color)] border-[var(--border)] border-2 px-4 py-1  rounded mb-4">
          {theme}
        </div>
      </div>
      {/* upper table  userSpecific */}
      {currentUserentry&& (
      <div className="mb-10">
        <table className="min-w-full drop-shadow-md text-gray-500">
          <tbody className="text-md border-3  border-[var(--border)] overflow-hidden">
            <tr className="bg-[var(--bgc)]">
              <td className="px-3 py-3 text-left w-[5%]">{currentRank}</td>
              <td className="px-4 py-3 text-left w-[20%]">{currentUserentry.username}</td>
              <td className="px-6 py-3 text-left w-[40%]">
              {currentUserentry.competing_art.image_name}
              </td>
              <td className="py-3 px-4 text-right w-[15%]">{currentUserentry.engagement_points}</td>
              <td className="px-4 py-3 pr-5 text-right w-[20%]">{new Date(currentUserentry.competing_art.upload_date).toLocaleDateString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      )}



      <div className="overflow-x-auto text-[var(--color)]">
        <div className="flex justify-between items-centermb-2 drop-shadow-md">
          <h1 className="text-xl text-[var(--color)]">
            Next reset in: {date.getHours()}:{date.getMinutes()}:
            {date.getSeconds()}
          </h1>

          <div className="flex space-x-3 mb-2">
            {[
              {icon: UserIcon, title: "userspecific"},
              {icon: LessThanIcon, title: "go back"},
              {icon: HashIcon, title: "Enter your own number"},
              {icon: GreaterThanIcon, title: "go front"}
            ].map(({icon, title},i)=>{
              const IconComponenet = icon;
             return( <button
              key={i}
              className="p-2 border-3 border-[var(--border)] bg-[var(--sbgc)] rounded-lg"
              title={title}
              >
                <IconComponenet size={22} weight="bold"/>
              </button>
             );
})}
          </div>
        </div>

        {/* lower table  */}
        <div className="mt-2 rounded-md  overflow-hidden border-3 border-[var(--border)]">

        <table className="min-w-full ">

          <thead className="bg-[var(--sbgc)] text-2xl uppercase border-b-3 border-[var(--border)]">
            <tr>
              <th className="px-3 py-3 text-left w-[5%]">#</th>
              <th className="px-4 py-3 text-left w-[20%]">Artist</th>
              <th className="px-6 py-3 text-left w-[30%]">Art</th>
              <th className="px-4 py-3 text-right w-[25%]">Engagements Points</th>
              <th className="px-4 py-3 pr-5 text-right w-[20%]">Date</th>
            </tr>
          </thead>

          <tbody className="text-md">
            {leaderboard.map((entry, index) => (
              <tr
                key={index}
                >
                <td className="px-3 py-3">
                  <div className="flex justify-start">
                    {index === 0 ? (
                      <CrownSimpleIcon
                        size={20}
                        weight="regular"
                      />
                    ) : (
                      <span className="ml-1">{index+1}</span>
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
                <td className="px-6 py-3 text-left hover:underline">
                  
                  <NavLink to={`/Explore/${entry.competing_art.art_id}`}>
                  {entry.competing_art.image_name}
                  </NavLink>
                  </td>
                <td className="px-4 py-3 text-right">{entry.engagement_points}</td>
                <td className="px-4 py-3 text-right pr-5">{new Date(entry.competing_art.upload_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

</div>

    </Layout>
  );
}
