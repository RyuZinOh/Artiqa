import { useState } from "react";
import ladypaints from "/assets/forRegister/paintergirlillu.svg";
import { AtIcon, EyesIcon, FeatherIcon, IdentificationCardIcon, UserIcon } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import FavAfterRegister from "./favafterRegister";

export default function Register(){
  const [favfoo,setFoo] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConf, setshowConf] = useState(false ) //if not created seperatly then the both password and confirm password might hide and show at same time , not sperately so for seperation, this seperate usestate 
    return(
      <>{
        favfoo?(
          <FavAfterRegister/>
        ):(
        <div className="flex h-screen">
        {/* // left side  */}
        <div
        className="flex-1 flex flex-col justify-center px-16
    items-center      bg-[var(--primary)] "
      >
        <div className="max-w-xl w-full text-left">
          <h1 className="text-8xl leading-snug font-bold  drop-shadow-md text-lef">
            Register
          </h1>
          <p className="text-3xl   drop-shadow-sm">
            Artiqa <span className="ml-52">fill the form below</span>
          </p>
          
          <form
        className="space-y-6  border-3 border-black 
        rounded-md p-6"
          >

            {/* //email + username */}
            <div className="flex space-x-4 relative" >
              <div className="relative flex-1">
                   <input type="email" 
                placeholder="email"
                className="
                w-full p-3 pr-10 border-2 border-black rounded-md bg-white placeholder:text-black
                transition duration-200 focus:outline-none focus:ring-2 focus:ring-black
                "
                />      
          <AtIcon
                size={24}
                weight="regular"
                className="absolute right-3 top-4 -translate-y-0.5"
              />
              </div>
              <div className="relative flex-1">
                <input type="text " 
                placeholder="username"
                className="
                 w-full p-3 pr-10 border-2 border-black rounded-md bg-white placeholder:text-black
                transition duration-200 focus:outline-none focus:ring-2 focus:ring-black
               
                "
                />
                          <UserIcon
                size={24}
                weight="regular"
                className="absolute right-3 top-4 -translate-y-0.5"
              />
              </div>
                
            </div>
            
            {/* //full name  */}
            <div className="relative flex-1">
  <input type="text " 
                placeholder="full name"
                className="
                 w-full p-3 pr-10 border-2 border-black rounded-md bg-white placeholder:text-black
                transition duration-200 focus:outline-none focus:ring-2 focus:ring-black
               
                "
                />
               <IdentificationCardIcon
                size={24}
                weight="regular"
                className="absolute right-3 top-4 -translate-y-0.5"
              />
            </div>
                
            
{/* //password +bio */}
<div className="flex space-x-4 " >
              <div className="flex flex-col flex-1 space-y-4">
                
               <div className="relative flex-1">
                <input 
                type={showPass ? "text" : "password"}
                placeholder="password"
               className="p
                w-full p-3 pr-10 border-2 border-black rounded-md bg-white placeholder:text-black
                transition duration-200 focus:outline-none focus:ring-2 focus:ring-black
               
               "/>
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
               <div className="relative flex-1 ">
                <input
                type={showConf ? "text" : "password"}
                placeholder="confirm password"
               className="
                w-full p-3 pr-10 border-2 border-black rounded-md bg-white placeholder:text-black
                transition duration-200 focus:outline-none focus:ring-2 focus:ring-black
               
               "/>

                   <button
                type="button"
                onClick={() => setshowConf(!showConf)}
                className="absolute right-3 top-4 -translate-y-0.5 group-hover:scale-100 transition-transform duration-150 cursor-pointer"
              >
                <EyesIcon
                  size={24}
                  weight="fill"
                  className={showConf ? "scale-x-[-1] " : " "}
                />
              </button>
                </div>              
               </div>

                <div className="relative flex-1">
                  <textarea placeholder="biography"
                className="
                
                resize-none 
                min-h-[7.8rem] 
                w-full p-3 pr-10 border-2 border-black rounded-md bg-white placeholder:text-black
                transition duration-200 focus:outline-none focus:ring-2 focus:ring-black
               
                ">
                </textarea>
                 <FeatherIcon
                size={24}
                weight="regular"
                className="absolute right-3 top-4 -translate-y-0.5"
              />

                </div>

                
            </div>
            

            <div className="flex justify-between items-center mb-2">
                <div>
                    <h3 className="text-xl -my-5 mb-1 ">Gender</h3>
                <div className="flex space-x-4">

                    {/* //male  */}
                    <label className="flex items-center space-x-1">
                        <input type="radio" name="gender" value="male"
                        
                        className="w-5 h-5 border-2 border-black accent-black"/>
                        <span>male</span>

                        {/* //female */}
                    </label>
                        <label className="flex items-center space-x-1">
                        <input type="radio" name="gender" value="female"
                        
                        className="w-5 h-5 border-2 border-black accent-black"/>
                        
                        <span>female</span>
                    </label>
                        {/* others */}
                        <label className="flex items-center space-x-1">
                        <input type="radio" name="gender" value="others"
                        
                        className="w-5 h-5 border-2 border-black accent-black"/>
                        
                        <span>others</span>
                    </label>
                </div>
                </div>

              <button type="submit"
              onClick={
                ()=>setFoo(true)
                }
                className="bg-black border-2 border-black text-white font-bold px-8 py-3 rounded-md hover:bg-white hover:text-black hover:border-2 transition -mb-3 w-[200px] ml-8 "> 
                    CONTINUE
                </button>
                
            </div>

            

          </form>
           <div className="flex mx-12 items-center justify-between mt-4">
            <p className="text-sm cursor-pointer drop-shadow-md">
              Already have an account?
            </p>
            <NavLink
            to="/login"
            className="py-2 w-35 px-4 mr-2 bg-white hover:bg-black hover:text-white border-black text-black border-3 rounded-md text-center drop-shadow-md cursor-pointer"
          >LOGIN
          </NavLink>

          </div>
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
        
)
      }
      </>
    );
    
}