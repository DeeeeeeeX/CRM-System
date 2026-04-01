import './App.css';
import { Route, Routes } from 'react-router-dom';
import ToDoListPage from './pages/ToDoListPage';
import React from 'react';
import ProfilePage from './pages/ProfilePage';
import GeneralLayout from './components/GeneralLayout';
import AuthProtection from './components/Authorization/AuthProtection';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import UsersPage from './pages/UsersPage';
import EditUserPage from './pages/EditUserPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route element={<GeneralLayout />}>
        <Route path="/" element={<ToDoListPage />} />
        <Route element={<AuthProtection />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/editUser/:id" element={<EditUserPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
export default App;
