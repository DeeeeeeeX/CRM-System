import React from 'react';
import AuthorizationLayout from '../components/Authorization/AuthorizationLayout';
import RegisterForm from '../components/Authorization/RegisterForm';
import { Flex } from 'antd';
import { Link } from 'react-router-dom';

const RegistrationPage: React.FC = () => {
  return (
    <AuthorizationLayout>
      <Flex vertical align="center" className="form-block">
        <div className="login-title">
          <h3>Register your Account</h3>
          <span>See what is going on with your business</span>
        </div>
        <RegisterForm />
      </Flex>
      <div className="create-title">
        <span>Already have an account? Log in</span>
        <Link to="/login">Login</Link>
      </div>
    </AuthorizationLayout>
  );
};

export default RegistrationPage;
