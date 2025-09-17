import ladypaints from "/assets/forRegister/paintergirlillu.svg";
import { AtIcon, DropIcon, EyesIcon, FeatherIcon, FlagIcon, IdentificationCardIcon, UserIcon } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import FavAfterRegister from "./favafterRegister";
import { useRegister } from "./gateway";




export default function Register(){
const{
  favFlow,
        showPass,
        showConf, 
        formData,
        setFormData,
        setShowConf,
        setShowPass, 
        handleContinue
} = useRegister({
      email: "",
      username: "",
      full_name:"",
      password:"",
      confirm_password: "",
      biography: "",
      gender:"",
      nationality:"",
      profile_pic: null,
      speciality: ""
})

  if(favFlow){
    return <FavAfterRegister formData={formData}/>;
}

  return(
      
        <div className="flex h-screen">
        {/* // left side  */}
        <div
        className="flex-1 flex flex-col justify-center px-16
    items-center    text-[var(--color)]  bg-[var(--sbgc)] "
      >
        <div className="max-w-xl w-full text-left">
          <h1 className="text-8xl leading-snug font-bold  drop-shadow-md text-lef">
            Register
          </h1>
          <p className="text-3xl   drop-shadow-sm">
            Artiqa <span className="ml-52">fill the form below</span>
          </p>
          
          <form
          onSubmit={handleContinue}
        className="space-y-6  border-3 border-[var(--border)]
        rounded-md p-6"
          >

            {/* //email + username */}
            <div className="flex space-x-4 relative" >
              <div className="relative flex-1">
                   <input type="email" 
                placeholder="email"
                className="
                w-full p-3 pr-10 border-2 border-[var(--border)] rounded-md bg-[var(--bgc)] placeholder:text-[var(--color)]
                transition duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--border)]
                "
                value={formData.email}
                onChange={(e)=> setFormData({...formData, email: e.target.value})}
                />      
          <AtIcon
                size={24}
                weight="regular"
                className="absolute right-3 top-4 -translate-y-0.5"
              />
              </div>
              <div className="relative flex-1">
                <input type="text " 
                value={formData.username}
                onChange={(e)=> setFormData({...formData, username: e.target.value})}
                placeholder="username"
                className="
                 w-full p-3 pr-10 border-2 border-[var(--border)] rounded-md bg-[var(--bgc)]  placeholder:text-[var(--color)]
                transition duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--border)]
               
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
                value={formData.full_name}
                onChange={(e)=> setFormData({...formData, full_name: e.target.value})}
                className="
                 w-full p-3 pr-10 border-2 border-[var(--border)] rounded-md bg-[var(--bgc)] placeholder:text-[var(--color)]
                transition duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--border)]
               
                "
                />
               <IdentificationCardIcon
                size={24}
                weight="regular"
                className="absolute right-3 top-4 -translate-y-0.5"
              />
            </div>



            {/* //nationality */}
<div className="relative flex-1 mt-4">
  <input
    type="text"
    placeholder="Nationality"
    value={formData.nationality}
    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
    className="
      w-full p-3 pr-10 border-2 border-[var(--border)] rounded-md bg-[var(--bgc)] placeholder:text-[var(--color)]
      transition duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--border)]
    "
  />
    <FlagIcon
                size={24}
                weight="regular"
                className="absolute right-3 top-4 -translate-y-0.5"
              />
</div>

                <div className="relative flex-1 mt-4">
  <input
    type="text"
    placeholder="Speciality"
    value={formData.speciality}
    onChange={(e) => setFormData({ ...formData, speciality: e.target.value })}
    className="
      w-full p-3 pr-10 border-2 border-[var(--border)] rounded-md bg-[var(--bgc)] placeholder:text-[var(--color)]
      transition duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--border)]
    "
  />
  <DropIcon
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
                value={formData.password}
                onChange={(e)=> setFormData({...formData, password: e.target.value})}
               className="
                w-full p-3 pr-10 border-2 border-[var(--border)] rounded-md bg-[var(--bgc)] placeholder:text-[var(--color)]
                transition duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--border)
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
                value={formData.confirm_password}
                onChange={(e)=> setFormData({...formData, confirm_password: e.target.value})}   
               className="
                w-full p-3 pr-10 border-2 border-[var(--border)] rounded-md bg-[var(--bgc)] placeholder:text-[var(--color)]
                transition duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--border)]
               
               "/>

                   <button
                type="button"
                onClick={() => setShowConf(!showConf)}
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
               value={formData.biography}
                onChange={(e)=> setFormData({...formData, biography: e.target.value})}
               className="
                resize-none 
                min-h-[7.8rem] 
                w-full p-3 pr-10 border-2 border-[var(--border)] rounded-md bg-[var(--bgc)] placeholder:text-[var(--color)]
                transition duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--border)]
               
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
                        checked={formData.gender === "male"}
                onChange={(e)=> setFormData({...formData, gender: e.target.value})}
                        className="w-5 h-5 border-2 border-black accent-black"/>
                        <span>male</span>

                        {/* //female */}
                    </label>
                        <label className="flex items-center space-x-1">
                        <input type="radio" name="gender" value="female"
                        checked={formData.gender === "female"}
                onChange={(e)=> setFormData({...formData, gender: e.target.value})}                        
                        className="w-5 h-5 border-2 border-black accent-black"/>
                        
                        <span>female</span>
                    </label>
                        {/* others */}
                        <label className="flex items-center space-x-1">
                        <input type="radio" name="gender" value="others"
                        checked={formData.gender ==="others"}
                onChange={(e)=> setFormData({...formData, gender: e.target.value})}                        
                        className="w-5 h-5 border-2 border-black accent-black"/>
                        
                        <span>others</span>
                    </label>
                </div>
                </div>

              <button type="submit"
                className="bg-[var(--sbgc)] border-2 border-[var(--border)] text-[var(--color)] font-bold px-8 py-3 rounded-md hover:bg-[var(--bgc)]  hover:border-2 transition -mb-3 w-[200px] ml-8 "> 
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
            className="py-2 w-35 px-4 mr-2 bg-[var(--bgc)] hover:bg-[var(--sbgc)] text-[var(--color)] border-[var(--border)] border-3 rounded-md font-bold text-center drop-shadow-md cursor-pointer"
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