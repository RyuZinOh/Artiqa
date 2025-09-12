import { useState } from "react";
import AuthContext from "./AuthContext";

export function AuthProvider({children}){
    const[auth, setAuth] = useState(()=>{
        const token = localStorage.getItem("authToken");
        const isAdmin = localStorage.getItem("isAdmin") === "true";
        const isArtist = localStorage.getItem("isArtist") === "true";
        return token ? {
            token, 
            isAdmin, 
            isArtist
        } : null;
    });

    const login = (data) =>{
        localStorage.setItem("authToken", data.auth);
        localStorage.setItem("isAdmin", data.is_admin);
        localStorage.setItem("isArtist", data.is_artist);

        setAuth({
            token: data.auth,
            isAdmin: data.is_admin,
            isArtist: data.is_artist,
        });
    };

        const logout = ()=>{
            localStorage.removeItem("authToken");
            localStorage.removeItem("isAdmin");
            localStorage.removeItem("isArtist");
            setAuth(null);
        };

    return(
            <AuthContext.Provider value={{auth, login, logout}}>
                {children}
            </AuthContext.Provider>
        )    
    }
    
