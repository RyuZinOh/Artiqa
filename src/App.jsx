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
import ManageUsers from "./pages/admin/manageuser/ManageUsers";
import AritstRequests from "./pages/admin/ArtistRequests";
import CreateCompeition from "./pages/admin/CreateComp";
import ModerateArts from "./pages/admin/moderatearts/ModerateArts";
import ArtReport from "./pages/admin/moderatearts/ArtReports";
import PublicProfile from "./pages/users/PublicProfile";
import IsValid from "./protection/isValid";
import HeLiked from "./pages/users/heLiked";
import HeCommented from "./pages/users/heCommented";
import PleaseRegisterOrLogin from "./pages/PleaseRegisterOrLogin";
import Guester from "./protection/guester";
import ViewArt from "./pages/users/artists/viewArt";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Explore" replace />} />
      <Route path="/Explore" element={<Explore/>} />
      <Route path="/Explore/:artId" element={<IndividualePost />} />


      <Route path="/login" element={
        <Guester>
        <Login />
        </Guester>
        } />
      <Route path="/register" element={
        <Guester>
        <Register />
        </Guester>
        } />

      <Route path="/forgetpassword" element={
        <Guester>
        <ForgetPass />
        </Guester>
        
        } />
      <Route path="/weekly" element={<Weekly />} />
      <Route path="/Top" element={<Top />} />
      <Route path="/plead" element={<PleaseRegisterOrLogin/>} />
      <Route path="/profile/:username" element={<PublicProfile/>}/>





      <Route path="/likes" element={
        <IsValid>
        <HeLiked/>
        </IsValid>
        
        }/>
        <Route path="/comments" element={
        <IsValid>
        <HeCommented/>
        </IsValid>
        
        }/>

      <Route path="/settings" element={
        <IsValid>
        <Settings/>
        </IsValid>
      } />



      <Route path="/statistics" element={
        <ProtectedRoute requireArtist={true}>
        <Statistics />
        </ProtectedRoute>
        
        }/>

      <Route path="/portfolio" element={
        <ProtectedRoute requireArtist={true}>
        <Portfolio />
        </ProtectedRoute>
        
        } />


      <Route path="/portfolio/gallery" element={
        <ProtectedRoute requireArtist={true}>
        <Gallery />
        </ProtectedRoute>
        } />
      <Route path="/collaboration" element={
        <ProtectedRoute requireArtist={true}>
        <Collaboration />
        </ProtectedRoute>
      } />
      <Route path="/management" element={
        <ProtectedRoute requireArtist={true}>
        <UserDashboard />
        </ProtectedRoute>
        } />

        
      <Route path="/management/art/:artId" element={
        <ProtectedRoute requireArtist={true}>
        <ViewArt />
        </ProtectedRoute>
        } />



        {/* //admin shiboinger */}
        <Route path="/manage-users" element={
        <ProtectedRoute requireAdmin={true}>
        <ManageUsers />
        </ProtectedRoute>
        } />

        <Route path="/review-artists" element={
        <ProtectedRoute requireAdmin={true}>
        <AritstRequests />
        </ProtectedRoute>
        } />
        

        <Route path="/manage-weekly" element={
        <ProtectedRoute requireAdmin={true}>
        <CreateCompeition />
        </ProtectedRoute>
        } />

          <Route path="/moderate-arts" element={
        <ProtectedRoute requireAdmin={true}>
        <ModerateArts />
        </ProtectedRoute>
        } />
        
          <Route path="/moderate-arts/art-report/:imagename" element={
        <ProtectedRoute requireAdmin={true}>
        <ArtReport />
        </ProtectedRoute>
        } />
        



        
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;