import { Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/404";
import Login from "./gateway/login";
import Register from "./gateway/register";
import ForgetPass from "./gateway/forgetpass";
import Weekly from "./pages/weekly";
import Explore from "./pages/explore/explore";
import IndividualePost from "./pages/explore/individualepost";
import Statistics from "./pages/users/artists/statistics";
import Portfolio from "./pages/users/artists/portfolio";
import Collaboration from "./pages/users/artists/collaboration";
import UserDashboard from "./pages/users/artists/userdashboard";
import Settings from "./pages/settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Explore />} />
      <Route path="/Explore/:slug" element={<IndividualePost />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgetpassword" element={<ForgetPass />} />
      <Route path="/weekly" element={<Weekly />} />
      <Route path="/settings" element={<Settings/>} />


      {/* 
//this will have logic under certain criteria and auth but for now this is just it is what it is as frontend only defnese  */}

      <Route path="/statistics" element={<Statistics />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/collaboration" element={<Collaboration />} />
      <Route path="/management" element={<UserDashboard />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
