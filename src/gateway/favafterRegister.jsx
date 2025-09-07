import ladypaints from "/assets/forRegister/paintergirlillu.svg";
import { BowlFoodIcon} from "@phosphor-icons/react";
import { useFavAfter } from "./gateway";
export default function FavAfterRegister({formData}){
  const {favFood, setFavfood, handleSubmit} = useFavAfter(formData);
  
    return(
        <div className="flex h-screen">
        {/* // left side  */}
        <div
        className="flex-1 flex flex-col justify-center px-16
      bg-[var(--sbgc)] items-center"
      >
        <div className="max-w-xl w-full text-left">
          <h1 className="text-7xl leading-snug font-bold  drop-shadow-md">Security Setup
          </h1>
          <p className="text-[0.5]xl  drop-shadow-sm">
            Answer the question to help us recover your account later.
          </p>
          <form
          onSubmit={handleSubmit}
        className="space-y-6  border-3 border-[var(--border)]
        rounded-md p-6"
          >

            {/* //setting up favfood */}
            <div className="relative flex-1">
  <input type="text " 
                placeholder="enter your fav food"
                value={favFood}
                onChange={(e)=>setFavfood(e.target.value)}
                className="
                 w-full p-3 pr-10 border-2 border-[var(--border)] rounded-md bg-[var(--bgc)] placeholder:text-[var(--color)]
                transition duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--border)]
               
                "
                />
               <BowlFoodIcon
                size={24}
                weight="regular"
                className="absolute right-3 top-4 -translate-y-0.5"
              />
            </div>
                <div className="flex justify-end">
 <button
 type="submit"
                className="bg-[var(--sbgc)] border-2 border-[var(--border)] text-[var(--color)] font-bold px-8 py-3 rounded-md hover:bg-[var(--bgc)] hover:border-2 transition -mb-3 w-[200px] ml-8 text-center "> 
                    REGISTER
                </button>


                </div>
                         </form>
          </div>
        </div>
      
      

      {/* //right side  */}
      <div className="flex-1 flex flex-col justify-center relative p-8 bg-white overflow-hidden">
        <img
                src={ladypaints}
                alt="lady paints"
                className="absolute bottom-0 right-0 w-[780px] h-auto max-w-none"
              />
              </div>

 
        </div>
        

    );
}