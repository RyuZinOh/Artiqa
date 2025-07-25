import Layout from "../components/layouts/layout";
import {
  CrownSimpleIcon,
  GreaterThanIcon,
  HashIcon,
  LessThanIcon,
  UserIcon,
} from "@phosphor-icons/react";

// ##dummy data
const leaderboardData = [
  {
    rank: 1,
    artist: "batista123",
    art: "The Archivist's Lantern",
    votes: "10.2k",
    createdAt: "2025-4-12",
  },
  {
    rank: 2,
    artist: "zeldris123",
    art: "Echoes Beneath",
    votes: "10.1k",
    createdAt: "2025-4-12",
  },
  {
    rank: 3,
    artist: "abi.arts1",
    art: "Temple of the Hollows",
    votes: "10k",
    createdAt: "2025-4-12",
  },
  {
    rank: 4,
    artist: "percy_clamp",
    art: "The Last Oracle",
    votes: "9k",
    createdAt: "2025-4-12",
  },
  {
    rank: 5,
    artist: "masterfull4",
    art: "Runes in the Dust",
    votes: "8k",
    createdAt: "2025-4-12",
  },
  {
    rank: 6,
    artist: "ajStyles",
    art: "Stars Remembered us",
    votes: "5.5k",
    createdAt: "2025-4-12",
  },
  {
    rank: 7,
    artist: "jhonTimmy",
    art: "The Forgotten Feast",
    votes: "5k",
    createdAt: "2025-4-12",
  },
  {
    rank: 8,
    artist: "BobRosco",
    art: "Bones of the Sky",
    votes: "4.62k",
    createdAt: "2025-4-12",
  },
  {
    rank: 9,
    artist: "LakheKami",
    art: "Dreams etched in clay",
    votes: "4.61k",
    createdAt: "2025-4-12",
  },
  {
    rank: 10,
    artist: "Jharkriketa",
    art: "The city that slept",
    votes: "3k",
    createdAt: "2025-4-12",
  },
  {
    rank: 11,
    artist: "powerlevel10k",
    art: "chronicles of wind",
    votes: "3.2k",
    createdAt: "2025-4-12",
  },
  {
    rank: 12,
    artist: "tokenize123",
    art: "The mirror that lied",
    votes: "2.0k",
    createdAt: "2025-4-12",
  },
  {
    rank: 13,
    artist: "roukenranbo",
    art: "Ashes of the ember",
    votes: "1k",
    createdAt: "2025-4-12",
  },
  {
    rank: 14,
    artist: "chrome14",
    art: "The clockmaker's tomb",
    votes: "0.8k",
    createdAt: "2025-4-12",
  },
  {
    rank: 15,
    artist: "safal726",
    art: "Whispers petrified",
    votes: "0.5k",
    createdAt: "2025-4-12",
  },
];

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
      <div className="drop-shadow-md flex justify-between items-center mb-4">
        <div className="font-bold text-2xl">
          {days[date.getUTCDay()]}, ( {date.getUTCDate()} / {date.getUTCMonth()}{" "}
          / {date.getFullYear()} )
        </div>
        <div className="text-right font-bold text-2xl drop-shadow-md text-[var(--primary)] border-black border-2 bg-black px-4 py-1  rounded mb-4">
          {theme}
        </div>
      </div>
      {/* upper table  userSpecific */}
      <div className="mb-10">
        <table className="min-w-full rounded-xl shadow-md overflow-hidden border border-gray-200">
          <tbody className="text-md text-gray-800">
            <tr className="bg-white hover:bg-gray-100 transition duration-100">
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

      <div className="overflow-x-auto">
        <div className="flex justify-between items-centermb-2 drop-shadow-md">
          <h1 className="text-xl">
            Next reset in: {date.getHours()}:{date.getMinutes()}:
            {date.getSeconds()}
          </h1>

          <div className="flex space-x-3 mb-2">
            {/* getmydetail  */}
            <button
              className=" flex items-center space-x-1 px-3 py-1 border-2 border-black bg-[var(--primary)]"
              title="User specific"
            >
              <UserIcon size={24} weight="regular" />
            </button>
            {/* goback  */}
            <button
              className=" flex items-center space-x-1 px-3 py-1 border-2 border-black bg-[var(--primary)]"
              title="go back"
            >
              <LessThanIcon size={24} weight="regular" />{" "}
            </button>{" "}
            {/* custom  */}
            <button
              className=" flex items-center space-x-1 px-3 py-1 border-2 border-black bg-[var(--primary)]"
              title="enter your own number"
            >
              <HashIcon size={24} weight="regular" />{" "}
            </button>{" "}
            {/* go front  */}
            <button
              className=" flex items-center space-x-1 px-3 py-1 border-2 border-black bg-[var(--primary)]"
              title="go front"
            >
              <GreaterThanIcon size={24} weight="regular" />{" "}
            </button>
          </div>
        </div>

        {/* lower table  */}
        <table className="min-w-full rounded-xl shadow-md overflow-hidden border border-gray-200 px-0">
          <thead className="bg-[var(--primary)] text-2xl uppercase">
            <tr>
              <th className="px-3 py-3 text-left w-[5%]">#</th>
              <th className="px-4 py-3 text-left w-[20%]">Artist</th>
              <th className="px-6 py-3 text-left w-[40%]">Art</th>
              <th className="px-4 py-3 text-right w-[15%]">Votes</th>
              <th className="px-4 py-3 pr-5 text-right w-[20%]">Date</th>
            </tr>
          </thead>

          <tbody className="text-md text-gray-800">
            {leaderboardData.map((entry, index) => (
              <tr
                key={index}
                className={`
                hover:bg-gray-100 transition duration-100 ${
                  index % 2 === 0 ? "bg-gray-50" : " "
                }
                `}
              >
                <td className="px-3 py-3">
                  <div className="flex justify-start">
                    {entry.rank === 1 ? (
                      <CrownSimpleIcon
                        size={20}
                        weight="regular"
                        className="text-black"
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
