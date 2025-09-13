import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Guester({children}){
    const {auth} = useAuth();

    if (auth?.token){
        return <Navigate to="/Explore" replace/>;
    }
return children;

}