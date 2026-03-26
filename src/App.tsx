import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import ToDoListPage from './pages/ToDoListPage';
import React from 'react';
import ProfilePage from './pages/ProfilePage';
import { Layout, Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';

const App: React.FC = () => {
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

  return (
    <Layout className="app-layout">
      <Sider width="15%">
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Content gap="large">
          <Routes>
            <Route path="/" element={<ToDoListPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
