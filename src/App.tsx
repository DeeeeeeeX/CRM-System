import './App.css';
import {Link, Route, Routes} from 'react-router-dom';
import ToDoListPage from './pages/ToDoListPage';
import React from 'react';
import ProfilePage from './pages/ProfilePage';
import {Layout} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content, Header} from "antd/es/layout/layout";

const App: React.FC = () => {
  return (
    <>
      <Layout>
        <Sider width="15%" style={{backgroundColor: '#fff'}}>
          <nav className='menu'>
            <Link to="/">список задач</Link>
            <Link to="/profile">профиль</Link>
          </nav>
        </Sider>
        <Layout>
          <Header style={{backgroundColor: '#f5f5f5'}}>
          </Header>
          <Content>
            <Routes>
              <Route path="/" element={<ToDoListPage/>}/>
              <Route path="/profile" element={<ProfilePage/>}/>
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
