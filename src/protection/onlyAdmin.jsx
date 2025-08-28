import { Navigate } from "react-router-dom";
import currentUser  from "../dummy/current_user.json";
import users from "../dummy/user.json";


export default function OnlyAdmin({children, requiredRole = "superuser"}){
      const loggedInUser = currentUser?.username && currentUser.username.trim()!== ""?
  users.find((u)=>u.username === currentUser.username):null;


  if(!loggedInUser || loggedInUser.role!=requiredRole){
    return <Navigate to="/404" replace/>
  }
return children;
}