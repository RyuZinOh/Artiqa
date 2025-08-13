import Layout from "../components/layouts/layout";
import {
  CrownSimpleIcon,
  GreaterThanIcon,
  HashIcon,
  LessThanIcon,
  UserIcon,
} from "@phosphor-icons/react";
import leaderboardData from "../dummy/weeky.json";

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
  const date = new Date(); // here we will like get the created challenge date from the database and diff it through one week of time, but for now its's Just the skeleton so whatever is looking resemblance is added!
  const theme = "Whispers from Forgotten Worlds";

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
      <div className="mb-10">
        <table className="min-w-full rounded-xl shadow-md overflow-hidden ">
          <tbody className="text-md">
            <tr className="bg-[var(--bgc)]">
              <td className="px-3 py-3 text-left w-[5%]">15</td>
              <td className="px-4 py-3 text-left w-[20%]">You (x%)</td>
              <td className="px-6 py-3 text-left w-[40%]">
                Whispers petrified{" "}
              </td>
              <td className="py-3 px-4 text-right w-[15%]">0.5k</td>
              <td className="px-4 py-3 pr-5 text-right w-[20%]">2025-4-12</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto text-[var(--color)]">
        <div className="flex justify-between items-centermb-2 drop-shadow-md">
          <h1 className="text-xl text-[var(--color)]">
            Next reset in: {date.getHours()}:{date.getMinutes()}:
            {date.getSeconds()}
          </h1>

          <div className="flex space-x-3 mb-2">
            {/* getmydetail  */}
            <button
              className=" flex items-center space-x-1 px-3 py-1 border-2 border-[var(--border)] bg-[var(--sgbc)]"
              title="User specific"
            >
              <UserIcon size={24} weight="regular" 
              />
            </button>
            {/* goback  */}
            <button
              className=" flex items-center space-x-1 px-3 py-1 border-2 border-[var(--border)] bg-[var(--sbgc)]"
              title="go back"
            >
              <LessThanIcon size={24} weight="regular"
               />{" "}
            </button>{" "}
            {/* custom  */}
            <button
              className=" flex items-center space-x-1 px-3 py-1 border-2 border-[var(--border)] bg-[var(--sbgc)]"
              title="enter your own number"
            >
              <HashIcon size={24} weight="regular" 
              />{" "}
            </button>{" "}
            {/* go front  */}
            <button
              className=" flex items-center space-x-1 px-3 py-1 border-2 border-[var(--border)] bg-[var(--sbgc)]"
              title="go front"
            >
              <GreaterThanIcon size={24} weight="regular" 
              />{" "}
            </button>
          </div>
        </div>

        {/* lower table  */}
        <table className="min-w-full rounded-xl shadow-md overflow-hidden border border-[var(--border)] px-0 ">
          <thead className="bg-[var(--sbgc)] text-2xl uppercase">
            <tr>
              <th className="px-3 py-3 text-left w-[5%]">#</th>
              <th className="px-4 py-3 text-left w-[20%]">Artist</th>
              <th className="px-6 py-3 text-left w-[40%]">Art</th>
              <th className="px-4 py-3 text-right w-[15%]">Votes</th>
              <th className="px-4 py-3 pr-5 text-right w-[20%]">Date</th>
            </tr>
          </thead>

          <tbody className="text-md">
            {leaderboardData.map((entry, index) => (
              <tr
                key={index}
              >
                <td className="px-3 py-3">
                  <div className="flex justify-start">
                    {entry.rank === 1 ? (
                      <CrownSimpleIcon
                        size={20}
                        weight="regular"
                      />
                    ) : (
                      <span className="ml-1">{entry.rank}</span>
                    )}
                  </div>
                </td>
                <td className="py-4 px-4">{entry.artist}</td>
                <td className="px-6 py-3 text-left">{entry.art}</td>
                <td className="px-4 py-3 text-right">{entry.votes}</td>
                <td className="px-4 py-3 text-right pr-5">{entry.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
