import React from 'react';
import authBack from '../assets/auth/authback.png';
import circle from '../assets/auth/Vector.svg';
import loginImg from '../assets/auth/loginImg.svg';
import {Link} from 'react-router-dom';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Auth = ({authMode}) => {

  return (
    <div>
      <div className="authBack">
        <img className="imgBack" src={authBack} alt="background"/>
        <img className="circle" src={circle} alt="circle"/>
        <div className="authImgTitle">
          <h3>Turn your ideas into reality.</h3>
          <span>Start for free and get attractive offers from the community</span>
        </div>
      </div>
      <div className="loginLayer">
        <img className="loginImg" src={loginImg} alt="loginImg"/>

        <div className="formBlock">
          <div className="loginTitle">
            <h3>{`${authMode.word}`} your Account</h3>
            <span>See what is going on with your business</span>
          </div>
          {authMode.isLogin ? <LoginForm authMode={authMode}/> : <RegisterForm authMode={authMode}/>
          }
        </div>
        <div className="createTitle">
          <span>{authMode.isLogin ? 'Not Registered Yet?' : 'Already have an account? Log in'}</span>
          {authMode.isLogin ? <Link to="/register">Create an account</Link> : <Link to="/login">Login</Link>}
        </div>
      </div>
    </div>
  );
};

export default Auth;
