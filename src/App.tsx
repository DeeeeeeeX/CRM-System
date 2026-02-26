import './App.css';
import {Route, Routes, useLocation} from 'react-router-dom';
import ToDoListPage from './pages/ToDoListPage';
import React from 'react';
import ProfilePage from './pages/ProfilePage';
import Navigation from './components/Navigation';
import {Layout} from 'antd';
import Sider from 'antd/es/layout/Sider';
import {Content, Header} from 'antd/es/layout/layout';
import Auth from "./components/Auth";
import {useAppSelector} from "./hooks/redux";

const App: React.FC = () => {

  const location = useLocation();

  const token: string = localStorage.getItem('accessToken')

  const authMode = useAppSelector(
    state => state.authReducer
  )

  return (
    <>
      <Routes>
        <Route path="/login" element={<Auth authMode={authMode.isAuth.login} word={authMode.word.login}/>}/>
        <Route path="/register" element={<Auth authMode={authMode.isAuth.register} word={authMode.word.register}/>}/>
      </Routes>
      {location.pathname === '/login' || location.pathname === '/register' ? (
        ''
      ) : (
        <Layout>
          {location.pathname === '/login' || location.pathname === '/register' ? (
            ''
          ) : (
            <Sider width="15%" style={{backgroundColor: '#fff'}}>
              <Navigation token={token}/>
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
