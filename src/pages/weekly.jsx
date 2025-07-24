import Layout from "../components/layouts/layout";
import { CrownSimpleIcon } from "@phosphor-icons/react";

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

export default function Weekly() {
  return (
    <Layout>
      <div className="overflox-x-auto">
        <table className="min-w-full rounded-xl shadow-md overflow-hidden border border-gray-200 px-0">
          <thead className="bg-[var(--primary)] text-2xl uppercase">
            <tr>
              <th className="px-3 py-3 text-left"># </th>
              <th className="px-4 py-3 text-left">Artist</th>
              <th className="px-6 py-3 text-left">Art</th>
              <th className="px-4 py-3 text-right">Votes</th>
              <th className="px-4 py-3 pr-5 text-right">Date</th>
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
