import Layout from "../components/layouts/layout";
import {
  CrownSimpleIcon,
  GreaterThanIcon,
  HashIcon,
  LessThanIcon,
  UserIcon,
} from "@phosphor-icons/react";
import leaderboardData from "../dummy/leaderboard.json";
import { useState } from "react";



export default function Weekly() {
  const date = new Date(); // here we will like get the created challenge date from the database and diff it through one week of time, but for now its's Just the skeleton so whatever is looking resemblance is added!




  const sortedData = [...leaderboardData].sort((a,b) => b.wins - a.wins);

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
      <div className="mb-10">
        <table className="min-w-full drop-shadow-md text-gray-500">
          <tbody className="text-md border-3  border-[var(--border)] overflow-hidden">
            <tr className="bg-[var(--bgc)]">
              <td className="px-3 py-3 text-left w-[5%]">15</td>
              <td className="px-4 py-3 text-left w-[45%]">You (x%)</td>
              <td className="px-6 py-3 text-left w-[20%]">
                15
              </td>
              <td className="px-4 py-3 pr-5 text-right w-[30%]">2025-5-20</td>
            </tr>
          </tbody>
        </table>
      </div>


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
              <th className="px-4 py-3 pr-5 text-right w-[30%]">Claimed At</th>
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
                <td className="py-4 px-4">{entry.artist}</td>
                <td className="px-6 py-3 text-left">{entry.wins}</td>
                <td className="px-4 py-3 text-right pr-5">{entry.claimedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

</div>

    </Layout>
  );
}
