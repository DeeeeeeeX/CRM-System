import { useAppSelector } from '../hooks/redux';
import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';

const AuthProtection: React.FC = () => {
  const { isLogin } = useAppSelector((state) => state.authReducer);

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AuthProtection;
