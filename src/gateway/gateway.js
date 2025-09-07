import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
            `${import.meta.env.VITE_STATIC_BASE_URL}/users/register`,
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