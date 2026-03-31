import React from 'react';
import AuthorizationLayout from '../components/Authorization/AuthorizationLayout';
import { Flex } from 'antd';
import { Link } from 'react-router-dom';
import LoginForm from '../components/Authorization/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <AuthorizationLayout>
      <Flex vertical align="center" className="form-block">
        <div className="login-title">
          <h3>Login your Account</h3>
          <span>See what is going on with your business</span>
        </div>
        <LoginForm />
      </Flex>
      <div className="create-title">
        <span>Not Registered Yet?</span>
        <Link to="/register">Create an account</Link>
      </div>
    </AuthorizationLayout>
  );
};

export default LoginPage;
