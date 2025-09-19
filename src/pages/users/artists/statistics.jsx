import Layout from "../../../components/layouts/layout";
import ReactCalendarHeatmap from "react-calendar-heatmap";
import { Chart } from "chart.js/auto";
import { useRef, useEffect} from "react";
import { useTheme } from "../../../theme/useTheme";
import { getFullUrl } from "../../../utils/urlHelpers";
import { useStatistics } from "./context/statisticswala/useStatistics";

export default function Statistics() {

  const { theme } = useTheme();
  const {stats, loading, error} = useStatistics();

  const barRef = useRef(null);
  const radarRef = useRef(null);


  // Monthly Likes Bar Chart
  useEffect(() => {
    if (!stats || !barRef.current) return;
    
      // Generate last 12 months data for bar chart
  const getLast12Months = () => {
    if (!stats?.monthly_likes?.labels || !stats?.monthly_likes?.data) return [];
    const dataMap = {};
    stats.monthly_likes.labels.forEach((label, i) => {
      dataMap[label] = stats.monthly_likes.data[i];
    });

    const months = [];
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const label = date.toLocaleString("en-US", { month: "short", year: "numeric" });
      months.push({ label, value: dataMap[label] || 0 });
    }
    return months;
  };


    const ctx = barRef.current.getContext("2d");
    if (Chart.getChart(ctx)) Chart.getChart(ctx).destroy();

    const monthsData = getLast12Months();
    const labels = monthsData.map((m) => m.label);
    const dataValues = monthsData.map((m) => m.value);

    new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Monthly Likes",
            data: dataValues,
            backgroundColor: theme["--sbgc"],
            borderColor: theme["--border"],
            borderWidth: 2,
            maxBarThickness: 40,
            minBarLength: 2,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1 } },
          x: { ticks: { maxRotation: 0, minRotation: 0 } },
        },
        plugins: { legend: { display: false } },
      },
    });
  }, [stats, theme]);

  // Radar Chart
  useEffect(() => {
    if (!stats || !radarRef.current) return;

    const ctx = radarRef.current.getContext("2d");
    if (Chart.getChart(ctx)) Chart.getChart(ctx).destroy();

    new Chart(ctx, {
      type: "radar",
      data: {
        labels: ["Total Arts", "Total Wins", "Current Streak", "Hearts Received", "Critiques Received"],
        datasets: [
          {
            label: stats.username,
            data: [
              stats.radar.total_arts,
              stats.radar.total_wins,
              stats.radar.current_streak,
              stats.radar.hearts_received,
              stats.radar.critiques_received,
            ],
            backgroundColor: theme["--sbgc"],
            borderColor: theme["--border"],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        scales: { r: { ticks: { backdropColor: "transparent" } } },
        elements: { line: { borderWidth: 1 } },
      },
    });
  }, [stats, theme]);

    if (loading) return <div>Loading stats...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!stats) return <div>No stats available</div>;

  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const heatmapData = stats.heatmap.map((item) => ({
    date: item.date,
    count: item.count,
  }));

  return (
    <Layout>
      {/* Profile & Stats */}
      <div className="border-3 border-[var(--border)] shadow-sm flex justify-between items-stretch min-h-[150px] relative text-[var(--color)]">
        <div className="flex items-center px-2 space-x-4 w-[30%]">
          <img
            src={getFullUrl(stats.profile_picture)}
            alt={stats.username}
            className="w-20 h-20 rounded-full object-cover border-3 border-[var(--border)] drop-shadow-md"
          />
          <div>
            <h2 className="font-bold text-xl">{stats.username}</h2>
            <p className="text-sm">
              Joined{" "}
              {new Date(stats.joined_date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p className="text-sm">Current Streak: {stats.radar.current_streak}</p>
<div className="flex items-center space-x-2 mt-2">
  <span className="text-lg">{stats.level}</span>
  <div className="w-48 h-3 border-3 border-[var(--border)] overflow-hidden rounded-full relative">
<div 
  className="h-2 bg-[var(--sbgc)]  absolute left-0 top-0 animated-progress"
  style={{ "--final-width": `${stats.progress * 100}%` }}
></div>  </div>
  <span className="text-sm">{(stats.progress * 1).toFixed(2)}k/1k</span>
</div>
          </div>
        </div>

        {/* Arts & Wins */}
        <div className="flex flex-col text-center w-[20%] relative px-4">
          <div className="absolute left-0 top-0 h-full border-l-3 border-[var(--border)]"></div>
          <p className="text-sm font-bold text-left uppercase tracking-wide">Total Arts</p>
          <p className="text-xl text-left">{stats.radar.total_arts}</p>
          <p className="text-sm font-bold text-left uppercase tracking-wide mt-[15px]">Wins</p>
          <p className="text-xl text-left">{stats.radar.total_wins}</p>
        </div>

        {/* Recent Victories */}
        <div className="pl-4 w-[50%] relative">
          <div className="absolute left-0 top-0 h-full border-l-3 border-[var(--border)]"></div>
          <p className="text-md uppercase font-semibold tracking-wide mb-2">Recent Victories</p>
          <ul className="list-disc ml-5 space-y-1 text-sm">
            {stats.recent_victories.length
              ? stats.recent_victories.map((v, index) => <li key={index}>{v}</li>)
              : <li>No recent victories</li>}
          </ul>
        </div>
      </div>

      {/* Heatmap */}
      <div className="border-3 border-[var(--border)] shadow-sm mt-5 p-4 text-[var(--color)]">
        <span className="text-sm font-medium">Last 12 Months</span>
        <ReactCalendarHeatmap
          startDate={oneYearAgo}
          endDate={today}
          values={heatmapData}
          classForValue={(v) => (v?.count ? "c-fill" : "c-empty")}
          tooltipDataAttrs={(v) => (v?.date ? { dt: `${v.date}: ${v.count} hits` } : null)}
          showWeekdayLabels
          weekdayLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
          monthLabels={["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}
        />
        <div className="flex items-center space-x-4 mt-4">
          <div className="flex items-center">
            <div className="w-4 h-4 border border-[var(--border)] bg-[#ebedf0]"></div>
            <span className="text-sm p-2">Miss</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 border border-[var(--border)] bg-[var(--sbgc)]"></div>
            <span className="text-sm p-2">Hit</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="flex space-x-6 mt-6 mx-auto w-full">
        <div className="w-1/2 border-3 border-[var(--border)] p-6 rounded-lg h-[400px] flex items-center justify-center">
          <canvas ref={barRef} className="max-w-full max-h-full"></canvas>
        </div>
        <div className="w-1/2 border-3 border-[var(--border)] p-6 rounded-lg h-[400px] flex items-center justify-center">
          <canvas ref={radarRef} className="max-w-full max-h-full"></canvas>
        </div>
      </div>

      <style jsx global>{`
        .react-calendar-heatmap .c-empty { fill: #ebedf0; stroke: var(--border); stroke-width: 0.5px; }
        .react-calendar-heatmap .c-fill { fill: var(--sbgc); stroke: var(--border); stroke-width: 0.5px; }
        .react-calendar-heatmap rect { rx: 3; ry: 3; }
        .react-calendar-heatmap text { font-size: 6px; fill: var(--color); }
      `}</style>
    </Layout>
  );
}
