import { NavLink } from "react-router-dom";
import pleadingerza from "/assets/mascot_emotes/pleadingErza.svg";

export default function PleaseRegisterOrLogin(){
    return(
               <div className="min-h-screen bg-[var(--sbgc)] px-20 py-40 flex flex-col text-[var(--color)] relative">
        <h2 className="font-bold text-8xl drop-shadow-md ">Please reigister or login... </h2>
           <img
        src={pleadingerza}
        alt="she is crying"
        className="absolute bottom-0 right-0 w-[600px]"
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


)}




