import './App.css';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ToDoListPage from './pages/ToDoListPage';
import React, { useEffect } from 'react';
import ProfilePage from './pages/ProfilePage';
import { Layout, Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import Auth from './components/Auth';
import { useAppSelector } from './hooks/redux';

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const authMode = useAppSelector((state) => state.authReducer);

  type MenuItem = Required<MenuProps>['items'][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem('Список задач', '1', <Link to="/" />),
    getItem('профиль', '2', <Link to="/profile" />),
  ];

  const refreshToken = localStorage.getItem('refreshToken');

  useEffect(() => {
    if (!refreshToken) {
      navigate('/login');
    }
  }, [refreshToken, navigate]);

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<Auth authMode={authMode.isAuth.login} word={authMode.word.login} />}
        />
        <Route
          path="/register"
          element={<Auth authMode={authMode.isAuth.register} word={authMode.word.register} />}
        />
      </Routes>
      {location.pathname === '/login' || location.pathname === '/register' ? (
        ''
      ) : (
        <Layout style={{ minHeight: '100vh' }}>
          {location.pathname === '/login' || location.pathname === '/register' ? (
            ''
          ) : (
            <Sider theme={'dark'}>
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
          )}
          <Layout>
            <Header style={{ backgroundColor: '#fff' }}></Header>
            <Content style={{ backgroundColor: '#fff' }}>
              <Routes>
                <Route path="/" element={<ToDoListPage />} />
                <Route path="/profile" element={<ProfilePage />} />{' '}
              </Routes>
            </Content>
          </Layout>
        </Layout>
      )}
    </>
  );
};
export default App;
