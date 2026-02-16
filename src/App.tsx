import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import ToDoListPage from './pages/ToDoListPage';
import React from 'react';
import ProfilePage from './pages/ProfilePage';

const App: React.FC = () => {
  return (
    <div className="app-wrapper">
      <nav className="menu">
        <Link to="/">список задач</Link>
        <Link to="/profile">профиль</Link>
      </nav>
      <div className="pages">
        <Routes>
          <Route path="/" element={<ToDoListPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
