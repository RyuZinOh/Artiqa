import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './theme/ThemeProvider.jsx'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from './context/AuthProvider.jsx'
import { AssetProvider } from './pages/users/artists/context/AssetsWala/AssetProvider.jsx'
import { StatisticsProvider } from './pages/users/artists/context/statisticswala/StatisticsProvider.jsx'
import MineArtsProvider from './pages/users/artists/context/minearts/MineArtsProvider.jsx'
import { HeDoneProvider } from './pages/users/context/HeDoneProvider.jsx'
import { UserProvider } from './pages/users/context/UserHoni/UserProvider.jsx'
import { ExploreProvider } from './pages/context/Exploration/ExploreProvider.jsx'
import { PortfolioProvider } from './pages/users/artists/context/portfolio/PortfolioProvider.jsx'

createRoot(document.getElementById('root')).render(
<ThemeProvider>
  <BrowserRouter>
  <AuthProvider>
    <AssetProvider>
      <StatisticsProvider>
        <MineArtsProvider>
          <UserProvider>
          <HeDoneProvider>
            <PortfolioProvider>
            <ExploreProvider>
  <App />  
      <ToastContainer position="top-center" autoClose={5000} />
            </ExploreProvider>
            </PortfolioProvider>
          </HeDoneProvider>
          </UserProvider>
        </MineArtsProvider>
      </StatisticsProvider>
    </AssetProvider>
  </AuthProvider>
  </BrowserRouter>
</ThemeProvider>
)



