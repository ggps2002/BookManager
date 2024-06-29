import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, useLocation, Navigate, Routes, Route } from 'react-router-dom';
import './index.css'
import Dashboard from './pages/Dashboard.jsx'
import Home from './pages/Home.jsx'
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ProtectedDashboard = () => {
  const query = useQuery();
  const userID = query.get('userID');
  const username = query.get('username');

  if (!userID || !username) {
    return <Navigate to="/404" replace />;
  }

  return <Dashboard />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<ProtectedDashboard />} />
        <Route path="/404" element={<><h1>Page not found</h1></>} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
