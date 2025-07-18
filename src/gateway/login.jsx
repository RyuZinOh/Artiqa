import loginIllustration from "/assets/forLogin/illustrationLogin.svg";
import blackblob from "/assets/forLogin/blob.svg";
import { EyesIcon, UserIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="flex h-screen">
      {/* left side */}
      <div
        className="flex-1 flex flex-col justify-center items-center p-8
      bg-white text-black"
      >
        <div className="w-full max-w-md">
          <h1 className="text-6xl font-bold  drop-shadow-md mb-2">LOGIN</h1>
          <p className="mb-2 drop-shadow-md">
            Enter your account details
          </p>
          <form
          onSubmit= {(e)=>{
            e.preventDefault();
            navigate("/");
          }}
            className="space-y-6 px-12 py-12 border-3 border-black 
          rounded-md"
          >
            {/* username  */}
            <div className="relative group">
              <input
                type="text"
                className="w-full p-3 pr-10 border-2 border-black rounded-md bg-transparent placeholder:text-black
                transition duration-200 focus:outline-none focus:ring-2 focus:ring-black
                "
                placeholder="username"
              />
              <UserIcon
                size={24}
                weight="regular"
                className="absolute right-3 top-4 -translate-y-0.5"
              />
            </div>
            {/* password */}
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                className="w-full p-3 pr-10 border-2 border-black rounded-md bg-transparent placeholder:text-black
                transition duration-200 focus:outline-none focus:ring-2 focus:ring-black 
                "
                placeholder="password"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-4 -translate-y-0.5 group-hover:scale-100 transition-transform duration-150 cursor-pointer"
              >
                <EyesIcon
                  size={24}
                  weight="fill"
                  className={showPass ? "scale-x-[-1] " : " "}
                />
              </button>
            </div>

            {/* loginbutton */}
            <button
              type="submit"
              className="w-full py-3 px-4 
          border-2 border-black bg-black  text-white rounded-md font-bold cursor-pointer
          hover:bg-white hover:text-black  transition duration-300
          "
            >
              LOGIN
            </button>

            {/* //forget password */}
            <div className="flex justify-center">
              
              <NavLink
                to="/forgetpassword"
                className="text-sm  cursor-pointer  drop-shadow-md -mt-2
                hover:underline transition
                "
              >
                Forgot password?
              </NavLink>
            </div>
          </form>

          {/* //signup strip */}
          <div className="flex mx-12 items-center justify-between mt-4">
            <p className="text-sm cursor-pointer drop-shadow-md">
              Don't have an account?
            </p>
                  <NavLink
            to="/register"
            className="py-2 w-35 px-4 bg-white text-black border-black border-3 rounded-md text-center drop-shadow-md cursor-pointer hover:text-white hover:bg-black transition duration-300
          "
          >SignUP 
          </NavLink>
          </div>
        </div>
      </div>

      {/* //right side */}
      <div className="flex-1 flex flex-col justify-center p-8 bg-[var(--primary)]">
        <div className="mb-8">
          <h1 className="text-8xl leading-snug text-left drop-shadow-md">
            <div className="font-bold">Welcome to</div>
            <div className="-mt-12">Artiqa</div>
          </h1>
          <p className="text-3xl drop-shadow-sm text-left">
            Login to access your account
          </p>
        </div>
        <div className="relative h-full">
          <div className="absolute -bottom-8 -right-8 w-full max-w-[650px]">
            <div className="relative w-full">
              <img
                src={blackblob}
                alt="black blob"
                className="absolute top-0 left-0 w-full max-w-[450px]"
              />
              <img
                src={loginIllustration}
                alt="login illustration"
                className="relative w-full max-w-[650px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
