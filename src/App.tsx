import './App.css';
import {Route, Routes, useLocation} from 'react-router-dom';
import ToDoListPage from './pages/ToDoListPage';
import React from 'react';
import ProfilePage from './pages/ProfilePage';
import Login from './components/Login';
import Navigation from './components/Navigation';
import {Layout} from 'antd';
import Sider from 'antd/es/layout/Sider';
import {Content, Header} from 'antd/es/layout/layout';
import Auth from "./components/Auth";

const App: React.FC = () => {
  const registerMode = {
    word: 'Login',
    isLogin: false,
  }

  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/login" element={<Auth authMode={registerMode}/>}/>
        <Route path="/register" element={<Auth authMode={registerMode}/>}/>
      </Routes>
      {location.pathname === '/login' ? (
        ''
      ) : (
        <Layout>
          {location.pathname === '/login' ? (
            ''
          ) : (
            <Sider width="15%" style={{backgroundColor: '#fff'}}>
              <Navigation/>
            </Sider>
          )}
          <Layout>
            <Header style={{backgroundColor: '#fff'}}></Header>
            <Content style={{backgroundColor: '#fff'}}>
              <Routes>
                <Route path="/" element={<ToDoListPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>{' '}
              </Routes>
            </Content>
          </Layout>
        </Layout>
      )}
    </>
  );
};

export default App;
