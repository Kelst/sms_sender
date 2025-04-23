import { useState, useEffect } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Header from './components/header/Header';
import SMSPage from './components/sms/SMSPage';
import HistoryPage from './components/history/HistoryPage';
import StatusPage from './components/status/StatusPage';
import LoginPage from './components/login/Login';
import { ProviderContext } from './ProviderContext';
import Cookies from 'js-cookie';
import ProviderSelectionPage from './ProviderSelectionPage';

const brands = [
  { name: 'Intelekt', color: '#E53E3E' },
  { name: 'Opensvit', color: '#3182CE' }, 
  { name: 'Opticom', color: '#38A169' },
  { name: 'Veles', color: '#A1CAE2' }
];

function WrappedHeader() {
  const [currentBrand, setCurrentBrand] = useState(() => {
    const saved = localStorage.getItem('currentBrand');
    return saved ? JSON.parse(saved) : null;
  });

  const login = Cookies.get('login');
  const providerAccess = Cookies.get('providerAccess');
  
  // Redirect to login if not authenticated
  if (!login || !providerAccess) {
    return <Navigate to="/login" />;
  }

  // Redirect to provider selection if no brand selected
  if (!currentBrand) {
    return <Navigate to="/provider-selection" />;
  }

  // Check if user has access to selected provider
  const parsedAccess = JSON.parse(providerAccess);
  const hasAccess = parsedAccess[currentBrand.name.toLowerCase()] === 1;
  
  if (!hasAccess) {
    // Clear invalid selection and redirect
    localStorage.removeItem('currentBrand');
    return <Navigate to="/provider-selection" />;
  }

  return (
    <ProviderContext.Provider value={{ currentBrand, setCurrentBrand }}>
      <Header brands={brands} />
    </ProviderContext.Provider>
  );
}

const router = createBrowserRouter([
  {
    path: "/provider-selection",
    element: (
      <ProviderContext.Provider 
        value={{ 
          currentBrand: null, 
          setCurrentBrand: (brand) => {
            localStorage.setItem('currentBrand', JSON.stringify(brand));
            window.location.href = '/sms';
          }
        }}
      >
        <ProviderSelectionPage brands={brands} />
      </ProviderContext.Provider>
    )
  },
  {
    element: <WrappedHeader />,
    children: [
      {
        path: "/",
        element: <Navigate to="/sms" />
      },
      {
        path: "/sms",
        element: <SMSPage />
      },
      {
        path: "/history",
        element: <HistoryPage />
      },
      {
        path: "/status",
        element: <StatusPage />
      }
    ],
  },
  {
    path: "/login",
    element: <LoginPage /> 
  }
]);

function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

export default App;