import Layout from "../../../components/layouts/layout";
import mockUser from "../../../dummy/user.json";
import ReactCalendarHeatmap from "react-calendar-heatmap";
import { Chart } from "chart.js/auto";
import { useRef, useEffect } from "react";
import stats from "../../../dummy/stats.json";
import statsr from "../../../dummy/radar.json";
import { useTheme } from "../../../theme/useTheme";
import { getFullUrl } from "../../../utils/urlHelpers";

export default function Statistics() {
  const {theme} = useTheme();

  const today  = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear()-1);

  const generateHeatmapData = () =>{
    const data = [];
    const today = new Date();
    const streakStart = new Date(today);

    streakStart.setDate(today.getDate()- mockUser.current_streak+1);

    for (let d = new Date(streakStart); d<= today; d.setDate(d.getDate()+1)){
      data.push({
        date: new Date(d).toISOString().split("T")[0],
        count: 1,
      })
    }
    return data;
  }

  const heatmapData = generateHeatmapData();


  //for stats
  const barRef = useRef(null);
  useEffect(()=>{
    const ctx = barRef.current.getContext("2d");
    
    if(Chart.getChart(ctx)){
      Chart.getChart(ctx).destroy();
    }



    const data= {
      labels: stats.monthly_likes.labels,
      datasets:[{
        label: "Monthly Likes",
        data: stats.monthly_likes.data,
      backgroundColor:  theme["--primary"],
        borderColor: "black",
        borderWidth: 3,
      },
      ],
    };
    new Chart(ctx,{
      type: "bar",data,
      options:{
        responsive: true,
        scales:{
          y:{
            beginAtZero: true,
          },
        },
      },
    });
  },[theme]);


  //radar
  const radarRef = useRef(null);
  useEffect(()=>{
    const ctx = radarRef.current.getContext('2d');



    if (Chart.getChart(ctx)){
      Chart.getChart(ctx).destroy();
    }

    const data = {
      ...statsr,
      datasets: statsr.datasets.map(ds=>({
        ...ds,
      backgroundColor:  theme["--primary"],
        borderColor: "black",

      })),
    };

    new Chart(ctx,{
      type:"radar", data,
      options:{
        elements:{
          line:{
            borderWidth: 3,
          },
        },
        responsive: true
      },
    });    
  }, [theme])

  return (
    <Layout>
      <div className="border-3 border-black shadow-sm flex justify-between items-stretch min-h-[150px] relative">
        {/* profile  */}
        <div className="flex items-center px-2 space-x-4 w-[30%]">
          <img
            src={getFullUrl(mockUser.profile_picture)}
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



      {/* //streak heapmap  */}
      <div className="border-3 border-black shadow-sm mt-5 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm font-medium">Last 12 Months</span>
          </div>
        </div>
        <div className="heatmap-container">
          <ReactCalendarHeatmap
          startDate={oneYearAgo}
          endDate={today}
          values={heatmapData}
          classForValue={
            (value)=> value? "c-fill": "c-empty"
          }
          tooltipDataAttrs={(value)=>
            value?.date
            ? {"dt":`${value.date}: ${value.count} tests` }
            :null
          }
          showWeekdayLabels={true}
          weekdayLabels={["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]}
          monthLabels={["Jan","Feb","Mar", "Apr", "May", "Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}
          />
        </div>
      </div>

      <style jsx global>{`
        .react-calendar-heatmap .c-empty {
          fill: #ebedf0;
          stroke: black;
          stroke-width: 1px;
        }
        .react-calendar-heatmap .c-fill {
          fill: var(--primary);
          stroke: black;
          stroke-width: 1px;
        }
        .react-calendar-heatmap rect {
          rx: 2;
          ry: 2;
        }
        .react-calendar-heatmap text {
          font-size: 6px;
          fill: black;
        }
      `}</style>

<div className="flex space-x-6 mt-6 mx-auto w-full">
    {/* //stats  ->likes on months*/}
      <div className="w-1/2  border-3 border-black p-6 rounded-lg
      h-[400px] flex items-center justify-center">
        <canvas ref={barRef}  className="max-w-full max-h-full"></canvas>
      </div>

      {/* his ilndividual stats  */}
      <div className="w-1/2  border-3 border-black p-6 rounded-lg
      h-[400px] flex items-center justify-center">
        <canvas ref={radarRef} className="max-w-full max-h-full"></canvas>
      </div>
</div>

  </Layout>
  );
}
