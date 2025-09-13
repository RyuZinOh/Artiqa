import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/useAuth";

//registrationcontrol
export function useRegister(initialData){
    const [favFlow, setFavFlow] = useState(false);
      const [showPass, setShowPass] = useState(false);
      const [showConf, setShowConf] = useState(false ) 
    const [formData, setFormData] = useState(initialData);
    
    const handleContinue = async(e) =>{
      e.preventDefault();
      if (formData.password!==formData.confirm_password){
        toast.error("Password do not match");
        return;
      }
      setFavFlow(true);
    };


    return{
        favFlow,
        showPass,
        showConf, 
        formData,
        setFormData,
        setShowConf,
        setShowPass, 
        handleContinue
    }   
}


//aftermath
export function useFavAfter(formData){
    const [favFood, setFavfood] = useState("");
    const navigate = useNavigate();


  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(!favFood.trim()) return alert("Please enter your favorite food.");

    const finalData = {...formData, fav_food: favFood};

    try {
      const res = await fetch(
            `${import.meta.env.VITE_STATIC_FAST_API_URL}/users/register`,
   {
    method: "POST",
    headers:{"Content-Type": "application/json"},
    body: JSON.stringify(finalData),
    })

      if(!res.ok){
        const err = await res.json();
        return toast.error(err. detail || "registration failed")
      }
      toast.success(`${formData.username} successfully registered`)
      navigate("/login");
    } catch (error) {
      toast.error(`Something went wrong! ${error}`)
    }
  }

  return{favFood, setFavfood, handleSubmit}

}



//for login
export function useLogin(){
  const[username, setUsername] = useState("");
  const[password, setPassword] =  useState("");
  const[loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {login} = useAuth();


  const handleLogin = async(e)=>{
    e.preventDefault();
    setLoading(true);
    try{
      const res = await fetch(
            `${import.meta.env.VITE_STATIC_FAST_API_URL}/users/login`,
            {
              method: "POST",
              headers:{"Content-Type": "application/json"},
              body: JSON.stringify({username, password})   
            }        
      )
      const data = await res.json();
      
      if(!res.ok){
        toast.error(data.detail || "Login Failed");
        setLoading(false);
        return;
      }
      


        login(data.auth)


        toast.success(`Welcome, ${username}`);
        navigate("/");
      }catch(error){
        toast.error(`Something went wrong! ${error}`);
      }finally{
        setLoading(false);
      }
  }
  return{
    username,
    setUsername,
    password, 
    setPassword,
    loading,
    handleLogin
  }

}


//tokenforthepasswordreset && resetting
export async function requestPasswordReset(email, fav_food){
  const res = await fetch(
            `${import.meta.env.VITE_STATIC_FAST_API_URL}/users/forgetpass/getresettoken`,
            {
              method: "POST",
              headers:{"Content-Type": "application/json"},
              body: JSON.stringify({email, fav_food})        
            }
      );

      if (!res.ok){
        const error = await res.json();
        throw new Error(error.detail || "failed to request reset token");
      }
      return await res.json();
}

export async function resetPassword(token, new_password){
   const res = await fetch(
            `${import.meta.env.VITE_STATIC_FAST_API_URL}/users/forgetpass/resetpwd`,
            {
              method: "POST",
              headers:{"Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },

              body: JSON.stringify({new_password})        
            }
      );


      
      if (!res.ok){
        const error = await res.json();
        throw new Error(error.detail || "failed to reset Password");
      }

      return await res.json();
  
}

