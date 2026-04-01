import React from 'react';
import authBack from '../../assets/auth/authback.png';
import circle from '../../assets/auth/Vector.svg';
import loginImg from '../../assets/auth/loginImg.svg';
import { Flex } from 'antd';

type AuthProps = { children: React.ReactNode };

const AuthorizationLayout: React.FC<AuthProps> = ({ children }) => {
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
        {children}
      </Flex>
    </>
  );
};

export default AuthorizationLayout;
