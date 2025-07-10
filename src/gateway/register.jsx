import ladypaints from "/assets/forRegister/paintergirlillu.svg";
export default function Register(){
    return(
        <div className="flex h-screen">
        {/* // left side  */}
        <div
        className="flex-[0.5] flex flex-col justify-center px-16
      bg-[var(--primary)]"
      >
        <div className="max-w-xl w-full">
          <h1 className="text-8xl leading-snug font-bold  drop-shadow-md">
            Register
          </h1>
          <p className="text-3xl   drop-shadow-sm">
            Artiqa <span className="ml-40">fill the form below</span>
          </p>
          
          <form
        className="space-y-6  border-3 border-black 
        rounded-md p-6"
          >

            {/* //email + username */}
            <div className="flex space-x-4" >
                <input type="email" 
                placeholder="email"
                className="flex-1 p-3 rounded border-2 bg-white"
                />
                <input type="text " 
                placeholder="username"
                className="flex-1 p-3 border-2 rounded bg-white"
                />

            </div>
            
            {/* //full name  */}
                <input type="text " 
                placeholder="full name"
                className="w-full p-3 border-2 rounded bg-white"
                />
                
            
{/* //password +bio */}
<div className="flex space-x-4 " >
              <div className="flex flex-col flex-1 space-y-4">
               
               <input type="password" placeholder="password"
               className="p-3 rounded border-2 bg-white"/>
               <input type="password" placeholder="confirm password"
               className="p-3 rounded border-2 bg-white"/>
                </div>
                <textarea placeholder="biography"
                className="flex-1 p-3 rounded border-2 resize-none bg-white">

                </textarea>
            </div>
            

            <div className="flex justify-between items-center mb-2">
                <div>
                    <h3 className="text-xl mb-2">Gender</h3>
                <div className="flex space-x-6">

                    {/* //male  */}
                    <label className="flex items-center space-x-2">
                        <input type="radio" name="gender" value="male"
                        
                        className="w-5 h-5 border-2 border-black accent-black"/>
                        <span>male</span>

                        {/* //female */}
                    </label>
                        <label className="flex items-center space-x-2">
                        <input type="radio" name="gender" value="female"
                        
                        className="w-5 h-5 border-2 border-black accent-black"/>
                        
                        <span>female</span>
                    </label>
                        {/* others */}
                        <label className="flex items-center space-x-2">
                        <input type="radio" name="gender" value="other"
                        
                        className="w-5 h-5 border-2 border-black accent-black"/>
                        
                        <span>other</span>
                    </label>
                </div>
                </div>
                <button type="submit"
                className="bg-black border-2 border-black text-white px-6 py-3 rounded-md hover:bg-white hover:text-black hover:border-2 transition -mb-7 w-[185px]"> 
                    REGISTER
                </button>
            </div>

            

          </form>
           <div className="flex mx-12 items-center justify-between mt-4">
            <p className="text-sm cursor-pointer drop-shadow-md  hover:underline transition">
              Already have an account?
            </p>
            <button
              type="submit"
              className="py-2 w-35 px-4 bg-white font-bold text-black rounded-md drop-shadow-2xl cursor-pointer border-black border-2 "
            >
              LOGIN
            </button>
          </div>
          </div>
        </div>
      
      

      {/* //right side  */}
      <div className="flex-[1.5] flex flex-col justify-center relative p-8 bg-white overflow-hidden">
        <img
                src={ladypaints}
                alt="lady paints"
                className="absolute bottom-0 right-0 w-[800px] h-auto max-w-none"
              />
              </div>

 
        </div>
        

    );
}