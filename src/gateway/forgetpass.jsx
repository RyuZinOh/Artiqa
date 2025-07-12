import erzaforget from "/assets/mascot_emotes/forget_mascot.png";
import cloudbrush from "/assets/forforget/cloudpen.svg";
import { AtIcon, QuestionMarkIcon } from "@phosphor-icons/react";

export default function ForgetPass() {
  return (
    <div className="min-h-screen bg-[var(--primary)] flex  flex-col  relative overflow-hidden">
      <h1 className="text-black text-8xl  text-center font-bold  mt-8">
        Account Recovery
      </h1>

      <form
        className="z-10 space-y-6 w-[600px]  mx-auto px-10 py-10 border-3 bg-white border-black  mt-8
          rounded-md relative"
      >
        <h1 className="text-black  text-xl text-center italic ">
          Please enter your details to recover the account
        </h1>

        {/* email  */}
        <div className="relative group">
          <input
            type="text"
            className="w-full p-3 pr-10 border-2 border-black rounded-md bg-transparent placeholder:text-black
                transition duration-200 focus:outline-none focus:ring-2 focus:ring-black
                "
            placeholder="email"
          />
          <AtIcon
            size={24}
            weight="regular"
            className="absolute right-3 top-4 -translate-y-0.5"
          />
        </div>
        {/* //fav food */}
        <div className="relative group">
          <input
            type="text"
            className="w-full p-3 pr-10 border-2 border-black rounded-md bg-transparent placeholder:text-black
                transition duration-200 focus:outline-none focus:ring-2 focus:ring-black
                "
            placeholder="What was your favorite food?"
          />
          <QuestionMarkIcon
            size={24}
            weight="regular"
            className="absolute right-3 top-4 -translate-y-0.5"
          />
        </div>

        {/* checkbutton */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="py-3 px-4
          border-2 border-black rounded-md bg-black text-white font-bold cursor-pointer w-[150px]
          hover:bg-white hover:text-black transition duration-300
          "
          >
            CHECK
          </button>
        </div>
      </form>

      <img
        src={erzaforget}
        alt="erzamascot"
        className="pointer-events-none z-15 absolute bottom-0 left-40  ml-200 top-[200px]   w-[450px]"
      />

      <img
        src={cloudbrush}
        alt="cloudbrush"
        className="absolute bottom-0 left-10 w-175"
      />
    </div>
  );
}
