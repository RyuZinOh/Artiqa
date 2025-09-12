import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function ProtectedRoute({children, requireArtist= false, requireAdmin=false}){
      const {auth, userData} = useAuth();
  if (!auth?.token){
        return <Navigate to="/login" replace/>
      }

  if(requireArtist && !userData?.is_artist){
    return <Navigate to="/404" replace/>;
  }
  
  if(requireAdmin && !userData?.is_admin){
    return <Navigate to="/404" replace/>
  }
  
return children;

}