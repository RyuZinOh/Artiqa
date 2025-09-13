import erzaforget from "/assets/mascot_emotes/forget_mascot.png";
import cloudbrush from "/assets/forforget/cloudpen.svg";
import { AtIcon, LockKeyIcon, QuestionMarkIcon } from "@phosphor-icons/react";
import { resetPassword, requestPasswordReset } from "./gateway";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgetPass() {
  const [email, setEmail] = useState("");
  const [favFood, setFavFood] = useState("");
  const [resetToken, setResetToken] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = new useNavigate();



  const handleCheck = async (e)=>{
    e.preventDefault();
    try{
      const data = await requestPasswordReset(email, favFood);
      setResetToken(data.reset_token);
      setMessage("verification success! please set your new password.");
    }catch(err){
      setMessage(err.message);
    }
  } 

  const handleReset = async(e) =>{
    e.preventDefault();
    try {
      await resetPassword(resetToken, newPassword);
      setMessage("password reset success! you can now login");
      setResetToken(null);
      setEmail("");
      setFavFood("");
      setNewPassword("");
      navigate("/login");
      
    } catch (error) {
      setMessage(error.message);
      
    }
  }


  return (
    <div className="min-h-screen bg-[var(--sbgc)] flex  flex-col  relative overflow-hidden">
      <h1 className="text-[var(--color)] text-8xl  text-center font-bold  mt-8">
        Account Recovery
      </h1>

      <form
      onSubmit={resetToken ? handleReset: handleCheck}
        className="z-10 space-y-6 w-[600px]  mx-auto px-10 py-10 border-3 bg-[var(--bgc)] border-[var(--border)]  mt-8
          rounded-md relative"
      >
        {!resetToken ?( 
        <>
        <h1 className="text-[var(--color)] text-xl text-center italic ">
          Please enter your details to recover the account
        </h1>

        {/* email  */}
        <div className="relative group">
          <input
            type="text"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            className="w-full p-3 pr-10 border-2 border-[var(--border)] rounded-md bg-transparent placeholder:text-[var(--color)]
                transition duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--border)]
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
            value={favFood}
            onChange={(e)=> setFavFood(e.target.value)}
            className="w-full p-3 pr-10 border-2 border-[var(--border)] rounded-md bg-transparent placeholder:text-[var(--color)]
                transition duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--border)]
                "
            placeholder="What was your favorite food?"
          />
          <QuestionMarkIcon
            size={24}
            weight="regular"
            className="absolute right-3 top-4 -translate-y-0.5"
          />
        </div>
        </>
        ):(
          <>
            <h1 className="text-[var(--color)] text-xl text-center italic">
              Enter your new password
            </h1>
            <div className="relative group">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 pr-10 border-2 border-[var(--border)] rounded-md bg-transparent placeholder:text-[var(--color)]
                  transition duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--border)]"
                placeholder="New Password"
              />
              <LockKeyIcon
                size={24}
                weight="regular"
                className="absolute right-3 top-4 -translate-y-0.5"
              />
            </div>
          </>
        )}


        {/* checkbutton */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="py-3 px-4
          border-2 border-[var(--border)] rounded-md bg-[var(--sbgc)] text-[var(--color)] font-bold cursor-pointer w-[150px]
          hover:bg-[var(--bgc)]  transition duration-300
          "
          >
            {resetToken ? "RESET": "CHECK"}
          </button>
        </div>
        {message && (
          <p className="text-center text-[var(--color)] font-bold">
            {message}
          </p>
        )}
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
