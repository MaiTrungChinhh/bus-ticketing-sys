import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { routes } from './routes';
import HeaderComponent from './components/Header/HeaderComponent';
import FooterComponent from './components/Footer/FooterComponent';

function App() {
  const location = useLocation();
  const currentRoute = routes.find((route) => route.path === location.pathname);

  return (
    <div>
      {currentRoute && currentRoute.isShowHeader && <HeaderComponent />}
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.page />} />
        ))}
      </Routes>
      {currentRoute && currentRoute.isShowFooter && <FooterComponent />}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
