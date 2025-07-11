// import Login from "./gateway/login";
// import Register from "./gateway/register";
// import ForgetPass from "./gateway/forgetpass";
import { Routes, Route, Router } from "react-router-dom";
import Explore from "./pages/explore";
import PageNotFound from "./pages/404";

function App() {
  return (
    // <ForgetPass/>
    // <Register/>
    // <Login/>

    
      <Routes>
        <Route path="/" element={<Explore/>}/>
        <Route path="*" element={<PageNotFound/>}/>

      </Routes>
  );
}

export default App; 



