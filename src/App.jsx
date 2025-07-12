import { Routes, Route, Router } from "react-router-dom";
import Explore from "./pages/explore";
import PageNotFound from "./pages/404";
import Login from "./gateway/login";
import Register from "./gateway/register";
import ForgetPass from "./gateway/forgetpass";

function App() {
  return (

    
      <Routes>
        <Route path="/" element={<Explore/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgetpassword" element={<ForgetPass/>}/>
        
        <Route path="*" element={<PageNotFound/>}/>

      </Routes>
  );
}

export default App; 



