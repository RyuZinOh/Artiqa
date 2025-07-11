import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './theme/ThemeProvider.jsx'

createRoot(document.getElementById('root')).render(

<ThemeProvider>
  <BrowserRouter>
  <App />  
  </BrowserRouter>
</ThemeProvider>
)



