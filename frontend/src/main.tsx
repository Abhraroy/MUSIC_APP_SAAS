import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import axios from 'axios'
import App from './App.tsx'



axios.defaults.baseURL = "https://music-app-saas.onrender.com/api/v1"
axios.defaults.withCredentials = true





createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
