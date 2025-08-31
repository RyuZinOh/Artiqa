import { Routes, Route, Navigate } from "react-router-dom";
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
import Settings from "./pages/users/Settings";
import Gallery from "./pages/users/artists/Gallery";
import ProtectedRoute from "./protection/ProtectedRoute";
import Top from "./pages/Top";
import OnlyAdmin from "./protection/onlyAdmin";
import ManageUsers from "./pages/admin/manageuser/ManageUsers";
import AritstRequests from "./pages/admin/ArtistRequests";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Explore" replace />} />
      <Route path="/Explore" element={<Explore/>} />
      <Route path="/Explore/:slug" element={<IndividualePost />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgetpassword" element={<ForgetPass />} />
      <Route path="/weekly" element={<Weekly />} />
      <Route path="/Top" element={<Top />} />
      <Route path="/settings" element={<Settings/>} />


      {/* 
//this will have logic under certain criteria and auth but for now this is just it is what it is as frontend only defnese  */}

      <Route path="/statistics" element={
        <ProtectedRoute>
        <Statistics />
        </ProtectedRoute>
        
        }/>

      <Route path="/portfolio" element={
        <ProtectedRoute>
        <Portfolio />
        </ProtectedRoute>
        
        } />
      <Route path="/portfolio/gallery" element={
        <ProtectedRoute>
        <Gallery />
        </ProtectedRoute>
        } />
      <Route path="/collaboration" element={
        <ProtectedRoute>
        <Collaboration />
        </ProtectedRoute>
      } />
      <Route path="/management" element={
        <ProtectedRoute>
        <UserDashboard />
        </ProtectedRoute>
        } />



        {/* //admin shiboinger */}
        <Route path="/manage-users" element={
        <OnlyAdmin>
        <ManageUsers />
        </OnlyAdmin>
        } />

        <Route path="/review-artists" element={
        <OnlyAdmin>
        <AritstRequests />
        </OnlyAdmin>
        } />




        
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;