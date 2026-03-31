import './App.css';
import { Route, Routes } from 'react-router-dom';
import ToDoListPage from './pages/ToDoListPage';
import React from 'react';
import ProfilePage from './pages/ProfilePage';
import GeneralLayout from './components/GeneralLayout';
import AuthProtection from './components/Authorization/AuthProtection';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route element={<GeneralLayout />}>
        <Route path="/" element={<ToDoListPage />} />
        <Route element={<AuthProtection />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
};
export default App;
