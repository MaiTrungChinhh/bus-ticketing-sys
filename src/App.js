  import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from 'react-router-dom';
import GoogleCallback from './Account/CallbackGoogle';
import './App.css';
import FooterComponent from './components/Footer/FooterComponent';
import HeaderComponent from './components/Header/HeaderComponent';
import { routes } from './routes';

  function App() {
    const location = useLocation();
    const currentRoute = routes.find((route) => route.path === location.pathname);

    return (
      <>
        {currentRoute && currentRoute.isShowHeader && <HeaderComponent />}
      
        <Routes>
        <Route path="/api/auth/google/callback" element={<GoogleCallback />} />

          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={<route.page />} />
          ))}
        </Routes>
          {currentRoute && currentRoute.isShowFooter && <FooterComponent />} 
      </>
    );
  }

  export default function AppWrapper() {
    return (
      <Router>
        <App />
      </Router>
    );
  }
