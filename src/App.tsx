import './App.css';
import { Route, Routes } from 'react-router-dom';
import ToDoListPage from './pages/ToDoListPage';
import React, { useEffect } from 'react';
import ProfilePage from './pages/ProfilePage';
import Auth from './components/Auth';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import GeneralLayout from './components/GeneralLayout';
import AuthProtection from './components/AuthProtection';
import { fetchProfile, isLogOut, refreshAuth } from './store/reducers/ActionCreators';
import { selectAuth } from './store/selectors/authSelectors';
import { message, Spin } from 'antd';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function init() {
      try {
        await dispatch(refreshAuth());
        dispatch(fetchProfile());
      } catch (e) {
        message.error('Не удалось обновить информацию', e);
        dispatch(isLogOut());
      }
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
        </Route>
      </Route>
    </Routes>
  );
};
export default App;
