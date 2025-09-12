import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function IsValid({children}){
  const {auth} = useAuth();


  if(!auth?.token){
    return <Navigate to="/plead" replace/>
  }
  return children;
}