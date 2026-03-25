import React from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { selectProfile } from '../store/selectors/authSelectors';

const GeneralLayout: React.FC = () => {
  type MenuItem = Required<MenuProps>['items'][number];

  const location = useLocation();

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

  const profile = useAppSelector(selectProfile);

  const items: MenuItem[] = [
    getItem('Список задач', '/', <Link to="/" />),
    getItem('профиль', '/profile', <Link to="/profile" />),
  ];
  const adminItems: MenuItem[] = [
    getItem('Список задач', '/', <Link to="/" />),
    getItem('профиль', '/profile', <Link to="/profile" />),
    getItem('Пользователи', '/users', <Link to="/users" />),
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme={'dark'}>
        <Menu
          theme="dark"
          selectedKeys={[location.pathname]}
          mode="inline"
          items={profile?.data?.roles?.includes('ADMIN') ? adminItems : items}
        />
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: '#fff' }}></Header>
        <Content style={{ backgroundColor: '#fff' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default GeneralLayout;
