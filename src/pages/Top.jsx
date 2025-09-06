import Layout from "../components/layouts/layout";
import {
  CrownSimpleIcon,
  GreaterThanIcon,
  HashIcon,
  LessThanIcon,
  UserIcon,
} from "@phosphor-icons/react";
import leaderboardData from "../dummy/user.json";
import { useState } from "react";
import currentuser from "../dummy/current_user.json";
import { getFullUrl } from "../utils/urlHelpers";
import { NavLink } from "react-router-dom";


export default function Weekly() {
  const date = new Date(); // here we will like get the created challenge date from the database and diff it through one week of time, but for now its's Just the skeleton so whatever is looking resemblance is added!


  const ukelele = currentuser?.username && currentuser.username.trim()!= "" && currentuser.username!="none" ?leaderboardData.find(u=> u.username === currentuser.username): null;


  const sortedData = [...leaderboardData].sort((a,b) => b.total_wins - a.total_wins);

  //pagination
  const per = 15;
  const [currPage, setCurrPage] = useState(1);
  const totalPage = Math.ceil(sortedData.length / per);



  const paginatedData = sortedData.slice(
    (currPage -1 )* per,
    currPage * per
  );

  // jumping according to the page will be added when backend designing

  return (
    <Layout>
      {/* upper table  userSpecific */}
     {ukelele &&(
      <div className="mb-10">
        <table className="min-w-full drop-shadow-md text-gray-500">
          <tbody className="text-md border-3  border-[var(--border)] overflow-hidden">
            <tr className="bg-[var(--bgc)]">
              <td className="px-3 py-3 text-left w-[5%]">
                {sortedData.findIndex((u)=> u.username === ukelele.username)+1}
              </td>
              <td className="px-4 py-3 text-left w-[45%]">{ukelele.username}</td>

              <td className="px-6 py-3 text-left w-[20%]">
                {ukelele.total_wins}
              </td>
              <td className="px-4 py-3 pr-5 text-right w-[30%]">{ukelele.joined_date}</td>
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
            {/* // the leaderbord top will be reset at each month */}
          </h1>

          <div className="flex space-x-3 mb-2">
            

            <button 
            className="p-2 border-3 border-[var(--border)] bg-[var(--sbgc)] rounded-lg cursor-pointer"
           title="User Specific"
           >
                <UserIcon size={22} weight="bold" className="text-[var(--color)]"/>
            </button>
            

            
            <button 
            onClick={()=> setCurrPage((prev)=> Math.max(prev-1,1))}
            className="p-2 border-3 border-[var(--border)] bg-[var(--sbgc)] rounded-lg cursor-pointer"
           title="go back"
           >
                <LessThanIcon size={22} weight="bold" className="text-[var(--color)]"/>
            </button>

            
            <button 
            className="p-2 border-3 border-[var(--border)] bg-[var(--sbgc)] rounded-lg cursor-pointer"
           title="enter page thing"
           >
                <HashIcon size={22} weight="bold" className="text-[var(--color)]"/>
            </button>

            
            <button 
            onClick={()=> setCurrPage((prev)=> Math.min(prev+1,totalPage))}
            className="p-2 border-3 border-[var(--border)] bg-[var(--sbgc)] rounded-lg cursor-pointer"
           title="Go forward"
           >
                <GreaterThanIcon size={22} weight="bold" className="text-[var(--color)]"/>
            </button>

          </div>
        </div>

        {/* lower table  */}
        <div className="mt-2 rounded-md  overflow-hidden border-3 border-[var(--border)]">

        <table className="min-w-full ">

          <thead className="bg-[var(--sbgc)] text-2xl uppercase border-b-3 border-[var(--border)]">
            <tr>
              <th className="px-3 py-3 text-left w-[5%]">#</th>
              <th className="px-4 py-3 text-left w-[45%]">Artist</th>
              <th className="px-6 py-3 text-left w-[20%]">Wins</th>
              <th className="px-4 py-3 pr-5 text-right w-[30%]">Joined At</th>
            </tr>
          </thead>

          <tbody className="text-md">
            {paginatedData.map((entry, index) => (
              <tr
                key={index}
              >
                <td className="px-3 py-3">
                  <div className="flex justify-start">
                    {(currPage -1) * per + index+1 === 1 ? (
                      <CrownSimpleIcon
                        size={20}
                        weight="bold"
                        className="text-[var(--color)]"
                      />
                    ) : (
                      <span className="ml-1">{
                        (currPage-1) * per +index+1
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
                <td className="px-6 py-3 text-left">{entry.total_wins}</td>
                <td className="px-4 py-3 text-right pr-5">{entry.joined_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

</div>

    </Layout>
  );
}
