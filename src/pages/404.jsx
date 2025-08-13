import { NavLink } from "react-router-dom";
import losterza from "/assets/mascot_emotes/losterza.svg";


export default function PageNotFound(){
    return(
        <div className="min-h-screen bg-[var(--sbgc)] px-20 py-40 flex flex-col text-[var(--color)] relative">
        <h2 className="font-bold text-8xl drop-shadow-md ">Page not found!</h2>
           <img
        src={losterza}
        alt="she is lost"
        className="absolute bottom-0 right-0 w-[845px]"
      />
<div className="flex-grow"/>
     <NavLink
            to="/"
            className="py-4 px-4  z-30
          border-3 border-[var(--border)] rounded-md bg-[var(--bgc)] text-[var(--color)] font-bold cursor-pointer w-[150px]  text-center
          hover:bg-[var(--sbgc)] hover:text-[var(--color)] transition duration-300
          "
          >
            GO BACK
          </NavLink>

    
        </div>

    );

}