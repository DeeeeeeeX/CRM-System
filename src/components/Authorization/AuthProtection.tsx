import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Navigate, Outlet } from 'react-router-dom';
import React, { useEffect } from 'react';
import { selectAuth } from '../../store/selectors/authSelectors';
import { message, Spin } from 'antd';
import { fetchProfile, refreshAuth } from '../../store/reducers/ActionCreators';
import { authSlice } from '../../store/reducers/AuthSlice';

const AuthProtection: React.FC = () => {
  const { isLogin } = useAppSelector((state) => state.authReducer);
  const { isLoginChecked } = useAppSelector(selectAuth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function init() {
      try {
        await dispatch(refreshAuth());
        dispatch(fetchProfile());
      } catch (e) {
        message.error('Не удалось обновить информацию', e);
        dispatch(authSlice.actions.authorize(false));
      }
    }

    init();
  }, [dispatch]);

  if (!isLoginChecked) {
    return <Spin />;
  }

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AuthProtection;
