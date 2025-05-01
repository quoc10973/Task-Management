import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/route.jsx';
import { UserProvider } from './context/userSession.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <AppRoutes >
        </AppRoutes>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
