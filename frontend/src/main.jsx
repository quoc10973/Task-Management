import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/route.jsx';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes >
        <ToastContainer />
      </AppRoutes>
    </BrowserRouter>
  </StrictMode>,
)
