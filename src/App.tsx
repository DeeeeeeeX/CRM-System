import './App.css';
import { Route, Routes } from 'react-router-dom';
import ToDoListPage from './pages/ToDoListPage';
import React, { useEffect } from 'react';
import ProfilePage from './pages/ProfilePage';
import { useAppDispatch, useAppSelector } from './store/hooks';
import GeneralLayout from './components/GeneralLayout';
import AuthProtection from './components/Authorization/AuthProtection';
import { fetchProfile, refreshAuth, unauthorize } from './store/reducers/ActionCreators';
import { selectAuth } from './store/selectors/authSelectors';
import { message, Spin } from 'antd';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function init() {
      try {
        await dispatch(refreshAuth());
        dispatch(fetchProfile());
      } catch (e) {
        message.error('Не удалось обновить информацию', e);
        dispatch(unauthorize());
      }
    }

    init();
  }, [dispatch]);

  const { isLoginChecked } = useAppSelector(selectAuth);

  if (!isLoginChecked) {
    return <Spin />;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route element={<AuthProtection />}>
        <Route element={<GeneralLayout />}>
          <Route path="/" element={<ToDoListPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
};
export default App;
