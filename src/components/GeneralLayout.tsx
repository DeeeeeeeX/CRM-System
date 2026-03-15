import React from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import { Link, Outlet, useLocation } from 'react-router-dom';

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

  const items: MenuItem[] = [
    getItem('Список задач', '/', <Link to="/" />),
    getItem('профиль', '/profile', <Link to="/profile" />),
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme={'dark'}>
        <Menu theme="dark" selectedKeys={[location.pathname]} mode="inline" items={items} />
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
