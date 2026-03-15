import React from 'react';
import authBack from '../assets/auth/authback.png';
import circle from '../assets/auth/Vector.svg';
import loginImg from '../assets/auth/loginImg.svg';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { authProps } from '../types/types';

const Auth: React.FC<authProps> = ({ authMode, word }) => {
  return (
    <div>
      <div className="auth-back">
        <img className="img-back" src={authBack} alt="background" />
        <img className="circle" src={circle} alt="circle" />
        <div className="auth-img-title">
          <h3>Turn your ideas into reality.</h3>
          <span>Start for free and get attractive offers from the community</span>
        </div>
      </div>
      <div className="login-layer">
        <img className="login-img" src={loginImg} alt="loginImg" />

        <div className="form-block">
          <div className="login-title">
            <h3>{`${word}`} your Account</h3>
            <span>See what is going on with your business</span>
          </div>
          {authMode ? (
            <LoginForm authMode={authMode} word={word} />
          ) : (
            <RegisterForm authMode={authMode} word={word} />
          )}
        </div>
        <div className="create-title">
          <span>{authMode ? 'Not Registered Yet?' : 'Already have an account? Log in'}</span>
          {authMode ? (
            <Link to="/register">Create an account</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
