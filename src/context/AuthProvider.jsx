import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { getUserData } from "./getter";

export function AuthProvider({children}){
    const[auth, setAuth] = useState(()=>{
        const token = localStorage.getItem("authToken");
        return token ? {
            token, 
        } : null;
    });

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = (token) =>{
      localStorage.setItem("authToken", token);
      setAuth({token});
    }
    const logout = () =>{
      localStorage.removeItem("authToken");
      setAuth(null);
      setUserData(null);
    }

    useEffect(()=>{
      if (!auth?.token){
        setUserData(null);
        setLoading(null);
        return;
      }

      const fetchUser = async()=>{
        try{
          setLoading(true);
          const data = await getUserData(auth.token);
          setUserData(data);
        }catch(err){
          console.error("failed to fetch", err);
          logout();
        }finally{
          setLoading(false);
        }
      }
      fetchUser();
    }, [auth?.token]);

    return(
            <AuthContext.Provider value={{auth, login, logout, userData, loading}}>
                {children}
            </AuthContext.Provider>
        )    
    }
    
