import Layout from "../../../components/layouts/layout";
import users from "../../../dummy/user.json";
import currentUser from "../../../dummy/current_user.json";
import ReactCalendarHeatmap from "react-calendar-heatmap";
import { Chart } from "chart.js/auto";
import { useRef, useEffect } from "react";
import stats from "../../../dummy/stats.json";
import statsr from "../../../dummy/radar.json";
import { useTheme } from "../../../theme/useTheme";
import { getFullUrl } from "../../../utils/urlHelpers";

export default function Statistics() {

  const loggedInUser = currentUser?.username && currentUser.username.trim()!== ""?
    users.find((u)=>u.username === currentUser.username):null;
 
  const {theme} = useTheme();

  const today  = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear()-1);

  const generateHeatmapData = () =>{
    const data = [];
    const today = new Date();
    const streakStart = new Date(today);

    streakStart.setDate(today.getDate()- loggedInUser.current_streak+1);

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
      backgroundColor:  theme["--sbgc"],
        borderColor: theme["--border"],
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
      backgroundColor:  theme["--sbgc"],
        borderColor: theme["--border"],

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
        responsive: true,
        scales:{
          r:{
            ticks:{
              backdropColor: "transparent"
            }
          }
        }
      },
    });    
  }, [theme])

  return (
    <Layout>
      <div className="border-3 border-[var(--border)] shadow-sm flex justify-between items-stretch min-h-[150px] relative text-[var(--color)]">
        {/* profile  */}
        <div className="flex items-center px-2 space-x-4 w-[30%]">
          <img
            src={getFullUrl(loggedInUser.profile_picture)}
            alt={loggedInUser.username}
            className="w-20 h-20 rounded-full object-cover border-3 border-[var(--border)] drop-shadow-md"
          />
          <div>
            <h2 className="font-bold text-xl">{loggedInUser.username}</h2>
            <p className="text-sm">
              Joined{" "}
              {new Date(loggedInUser.joined_date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p className="text-sm ">
              Current Streak: {loggedInUser.current_streak}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-lg">{loggedInUser.level}</span>
              <div className="w-44 h-3 border-3 overflow-hidden rounded-full">
                <div
                  className="h-3 bg-[var(--sbgc)] rounded-full"
                  style={{
                    width: `${loggedInUser.progress * 100}%`,
                  }}
                ></div>
              </div>
              <span className="text-sm">
                {(loggedInUser.progress * 1).toFixed(2)}k/1k
              </span>
            </div>
          </div>
        </div>

        {/* arts some  */}
        <div className="flex flex-col text-center w-[20%] relative px-4">
          <div className="absolute left-0 top-0 h-full border-l-3 border-[var(--border)]"></div>
          <p className="text-sm font-bold text-left uppercase tracking-wide">
            Total Arts
          </p>
          <p className="text-xl text-left">{loggedInUser.total_arts}</p>
          <p className="text-sm font-bold text-left uppercase tracking-wide mt-[15px]">
            Wins
          </p>
          <p className="text-xl text-left">{loggedInUser.total_wins}</p>
        </div>

        {/* recents victories  */}
        <div className="pl-4 w-[50%] relative">
          <div className="absolute left-0 top-0 h-full border-l-3 border-[var(--border)]"></div>

          <p className="text-md uppercase font-semibold tracking-wide mb-2">
            Recent Victories
          </p>
          <ul className="list-disc ml-5 space-y-1 text-sm">
            {loggedInUser.recent_victories.map((v, index) => (
              <li key={index}>{v}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-3 border-[var(--border)] shadow-sm mt-5 min-h-[70px] flex items-center justify-between px-4 text-[var(--color)]">
        <span className="text-2xl text-gray-500">
          All Time Artist Leaderboard
        </span>
        <span className="font-bold text-sm mr-4">
          Top 10%:
          <span className="ml-1 font-normal text-2xl">653TH</span>
        </span>
      </div>



      {/* //streak heapmap  */}
      <div className="border-3 border-[var(--border)] shadow-sm mt-5 p-4 text-[var(--color)]">
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

        {/* legend  */}
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

      <style jsx global>{`
        .react-calendar-heatmap .c-empty {
          fill: #ebedf0;
          stroke: var(--border);
          stroke-width: 0.5px;
        }
        .react-calendar-heatmap .c-fill {
          fill: var(--sbgc);
          stroke: var(--border);
          stroke-width: 0.5px;
        }
        .react-calendar-heatmap rect {
          rx: 3;
          ry: 3;
        }
        .react-calendar-heatmap text {
          font-size: 6px;
          fill: var(--color);
        }
      `}</style>

<div className="flex space-x-6 mt-6 mx-auto w-full">
    {/* //stats  ->likes on months*/}
      <div className="w-1/2  border-3 border-[var(--border)] p-6 rounded-lg
      h-[400px] flex items-center justify-center">
        <canvas ref={barRef}  className="max-w-full max-h-full"></canvas>
      </div>

      {/* his ilndividual stats  */}
      <div className="w-1/2  border-3 border-[var(--border)] p-6 rounded-lg
      h-[400px] flex items-center justify-center">
        <canvas ref={radarRef} className="max-w-full max-h-full"></canvas>
      </div>
</div>

  </Layout>
  );
}
