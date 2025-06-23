import React, {useState} from "react";


export default function Login(){
    const[showPwd, setShowPwd] = useState(false);

    const user_icon = "/assets/forLogin/user_icon.svg";
    const eye_icon = "/assets/forLogin/eyes_left.svg";
    const gmail_icon = "/assets/forLogin/gmail.svg";
    const fb_icon = "/assets/forLogin/facebook.svg";
      return(
      <div className="flex justify-center bg-white items-center min-h-screen" >
        <div className="relative bg-white  px-2 h-[600px] w-80 border-2 border-black"
        style={{boxShadow: "4px 4px 8px  rgba(0,0,00.5)"}}
        >
              {/* vertical right line */}
                <div className="top-20 bottom-4 right-3 h-52 border-2 w-px bg-black absolute "/> 

                {/* horizontal style */}
                <div className="mb-2 mt-4">
                    <hr   className="border-2 border-black ml-8 w-50px"/>
                    <hr className="border-2 border-black mr-8 w-50px mt-3" />
                <h2 className="text-3xl mt-2">LOGIN PORTAL</h2>
                </div>
             {/* input username */}
             <div className="flex mb-a mt-30">
                <div className="relative w-75px">
                    <input type="text"
                    placeholder="Enter Username"
                    className="w-full border-black border-2 pl-2
                    focus:outline-none focus:border-black
                    " 
        style={{boxShadow: "4px 4px 8px  rgba(0,0,00.5)"}}
                    />
                    <img src={user_icon} alt="a user icon" className="absolute right-3 top-1 w-h h-5" />
                </div>
             </div>
           
           {/* for password */}
             <div className="flex mb-a mt-2">
                <div className="relative w-75px">
                    <input type={showPwd ?"text":"password"}
                    placeholder="Enter Password"
                    className="w-full border-black border-2 pl-2
                    focus:outline-none focus:border-black
                    " 
        style={{boxShadow: "4px 4px 8px  rgba(0,0,00.5)"}}
                    />
                    <img src={eye_icon} alt="a eye  icon" className={`
                    absolute right-3 top-1 w-h h-5 cursor-pointer
                    transition-transform duration:200 
                    ${showPwd? "scale-x-[-1]":""}
                    `}
                    onClick={()=>setShowPwd(!showPwd) }/>
                </div>
             </div>

             {/* //login */}
             <div>
                <button
               className="w-30 bg-black text-white py-0.5 mt-4 rounded"
        style={{boxShadow: "4px 4px 8px  rgba(0,0,00.5)"}}

                >LOGIN</button>
             </div>


             <div className="text-center text-3xl mt-14 drop-shadow-lg">OR</div>


             {/* //optional logins */}
             <div className="flex flex-col items-end space-y-4 absolute right-4 bottom-20">
                <button className="border-black border-2 rounded-full p-2">
                    <img src={gmail_icon} alt="gmail icon" className="w-4 h-4"/>
                </button>
                <button className="border-black border-2 rounded-full">
                    <img src={fb_icon} alt = "facebook icon"/>
                </button>
             </div>

           {/* forgetpass */}
           <div className="text-center mt-40 mb-2 text-xs  text-gray-400 cursor-pointer">
            forget password?
           </div>
           <hr className="border-2 border-black mb-8 w-[75%] mx-auto" />
            </div>
            </div>

    );
}