import { Navigate } from "react-router-dom";
import currentUser  from "../dummy/current_user.json";
import users from "../dummy/user.json";


export default function IsValid({children, requiredRole = ["artist", "superuser", "user"]}){
      const loggedInUser = currentUser?.username && currentUser.username.trim()!== ""?
  users.find((u)=>u.username === currentUser.username):null;


  if(!loggedInUser || !requiredRole.includes(loggedInUser.role)){
    return <Navigate to="/plead" replace/>
  }
return children;


}