import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import ToDoListPage from './pages/ToDoListPage';
import React, { useEffect } from 'react';
import ProfilePage from './pages/ProfilePage';
import Login from './components/Login';
import Register from './components/Register';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {location.pathname === '/login' ? (
        ''
      ) : (
        <div className="app-wrapper">
          {location.pathname === '/login' ? '' : <Navigation />}
          <div className="pages">
            <Routes>
              <Route path="/" element={<ToDoListPage />} />
              <Route path="/profile" element={<ProfilePage />} />{' '}
            </Routes>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
