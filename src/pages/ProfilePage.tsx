import React, { useEffect } from 'react';
import '../css/ProfilePage.css';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { Button, Card, Space, Spin } from 'antd';
import { selectProfile } from '../store/selectors/authSelectors';
import { logout } from '../functions/functions';
import { fetchProfile } from '../store/reducers/ActionCreators';

const ProfilePage = () => {
  const dispatch = useAppDispatch();

  const profile = useAppSelector(selectProfile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  if (profile.status === 'pending') {
    return <Spin />;
  }

  return (
    <Space vertical style={{ paddingLeft: '60px' }}>
      <Card title="Данные пользователя" style={{ width: 300 }}>
        <p>Имя пользователя: {profile?.data?.username}</p>
        <p>Почтовый адрес: {profile?.data?.email}</p>
        <p>Телефон: {profile?.data?.phoneNumber}</p>
      </Card>
      <Button onClick={logout}>logout</Button>
    </Space>
  );
};

export default ProfilePage;
