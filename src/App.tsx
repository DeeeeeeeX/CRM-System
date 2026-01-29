import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import ToDoListPage from './pages/ToDoListPage';
import React from 'react';
import ProfilePage from './pages/ProfilePage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <nav className="menu">
          <Link to="/">список задач</Link>
          <Link to="/profile">профиль</Link>
        </nav>
        <div className="Pages">
          <Routes>
            <Route path="/" element={<ToDoListPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
