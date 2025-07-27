import Layout from "../../../components/layouts/layout";
import mockUser from "../../../dummy/user.json";

export default function Statistics() {
  return (
    <Layout>
      <div className="border-3 border-black shadow-sm flex justify-between items-stretch min-h-[150px] relative">
        {/* profile  */}
        <div className="flex items-center px-2 space-x-4 w-[30%]">
          <img
            src={mockUser.profile_picture}
            alt={mockUser.username}
            className="w-20 h-20 rounded-full object-cover border-3 border-black drop-shadow-md"
          />
          <div>
            <h2 className="font-bold text-xl">{mockUser.username}</h2>
            <p className="text-sm">
              Joined{" "}
              {new Date(mockUser.joined_date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p className="text-sm text-gray-800">
              Current Streak: {mockUser.current_streak}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-lg">{mockUser.level}</span>
              <div className="w-44 h-3 border-3 overflow-hidden rounded-full">
                <div
                  className="h-3 bg-[var(--primary)] rounded-full"
                  style={{
                    width: `${mockUser.progress * 100}%`,
                  }}
                ></div>
              </div>
              <span className="text-sm">
                {(mockUser.progress * 1).toFixed(2)}k/1k
              </span>
            </div>
          </div>
        </div>

        {/* arts some  */}
        <div className="flex flex-col text-center w-[20%] relative px-4">
          <div className="absolute left-0 top-0 h-full border-l-3 border-black"></div>
          <p className="text-sm font-bold text-left uppercase tracking-wide">
            Total Arts
          </p>
          <p className="text-xl text-left">{mockUser.total_arts}</p>
          <p className="text-sm font-bold text-left uppercase tracking-wide mt-[15px]">
            Wins
          </p>
          <p className="text-xl text-left">{mockUser.total_wins}</p>
        </div>

        {/* recents victories  */}
        <div className="pl-4 w-[50%] relative">
          <div className="absolute left-0 top-0 h-full border-l-3 border-black"></div>

          <p className="text-md uppercase font-semibold tracking-wide mb-2">
            Recent Victories
          </p>
          <ul className="list-disc ml-5 space-y-1 text-sm">
            {mockUser.recent_victories.map((v, index) => (
              <li key={index}>{v}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-3 border-black shadow-sm mt-5 min-h-[70px] flex items-center justify-between px-4">
        <span className="text-2xl text-gray-500">
          All Time Artist Leaderboard
        </span>
        <span className="font-bold text-sm mr-4">
          Top 10%:
          <span className="ml-1 font-normal text-2xl">653TH</span>
        </span>
      </div>
    </Layout>
  );
}
