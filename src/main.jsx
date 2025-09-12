import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './theme/ThemeProvider.jsx'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from './context/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
<ThemeProvider>
  <BrowserRouter>
  <AuthProvider>
  <App />  
      <ToastContainer position="top-center" autoClose={5000} />

  </AuthProvider>
  </BrowserRouter>
</ThemeProvider>
)



