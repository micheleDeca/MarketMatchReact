import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './Context/UserContext.jsx'
import { CategoryProvider } from './Context/CategoryContex.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CategoryProvider>
          <App />
        </CategoryProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
