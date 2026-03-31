import React from 'react';
import authBack from '../assets/auth/authback.png';
import circle from '../assets/auth/Vector.svg';
import loginImg from '../assets/auth/loginImg.svg';
import { Link } from 'react-router-dom';
import LoginForm from '../components/Authorization/LoginForm';
import RegisterForm from '../components/Authorization/RegisterForm';
import { Flex } from 'antd';

type authProps = {
  isAuthMode: boolean;
  word: string;
};

const AuthorizationPage: React.FC<authProps> = ({ isAuthMode, word }) => {
  return (
    <>
      <Flex className="auth-back">
        <img className="img-back" src={authBack} alt="background" />
        <img className="circle" src={circle} alt="circle" />
        <div className="auth-img-title">
          <h3>Turn your ideas into reality.</h3>
          <span>Start for free and get attractive offers from the community</span>
        </div>
      </Flex>
      <Flex className="login-layer" wrap>
        <img className="login-img" src={loginImg} alt="loginImg" />

        <Flex vertical align="center" className="form-block">
          <div className="login-title">
            <h3>{`${word}`} your Account</h3>
            <span>See what is going on with your business</span>
          </div>
          {isAuthMode ? (
            <LoginForm isAuthMode={isAuthMode} word={word} />
          ) : (
            <RegisterForm isAuthMode={isAuthMode} word={word} />
          )}
        </Flex>
        <div className="create-title">
          <span>{isAuthMode ? 'Not Registered Yet?' : 'Already have an account? Log in'}</span>
          {isAuthMode ? (
            <Link to="/register">Create an account</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </Flex>
    </>
  );
};

export default AuthorizationPage;
