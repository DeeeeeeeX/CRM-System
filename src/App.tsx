import './App.css';
import { Route, Routes } from 'react-router-dom';
import ToDoListPage from './pages/ToDoListPage';
import React, { useEffect } from 'react';
import ProfilePage from './pages/ProfilePage';
import Auth from './components/Auth';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import GeneralLayout from './components/GeneralLayout';
import AuthProtection from './components/AuthProtection';
import { fetchProfile, refreshAuth } from './store/reducers/ActionCreators';
import { selectAuth } from './store/selectors/authSelectors';
import { Spin } from 'antd';
import UsersPage from './pages/UsersPage';
import EditUserPage from './pages/EditUserPage';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function init() {
      await dispatch(refreshAuth());
      dispatch(fetchProfile());
    }

    init();
  }, [dispatch]);

  const { isLoginChecked, isAuth } = useAppSelector(selectAuth);

  if (!isLoginChecked) {
    return <Spin />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Auth authMode={isAuth.login} word="login" />} />
      <Route path="/register" element={<Auth authMode={isAuth.register} word="register" />} />
      <Route element={<AuthProtection />}>
        <Route element={<GeneralLayout />}>
          <Route path="/" element={<ToDoListPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/editUser/:id" element={<EditUserPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
export default App;
