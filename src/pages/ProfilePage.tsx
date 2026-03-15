import React from 'react';
import '../css/ProfilePage.css';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchProfile, isLogOut, refreshAuth } from '../store/reducers/ActionCreators';
import { Button, Card, Space, Spin } from 'antd';
import { removeRefreshToken, token } from '../functions/functions';
import { selectProfile } from '../store/selectors/authSelectors';

const ProfilePage = () => {
  const dispatch = useAppDispatch();

  const profile = useAppSelector(selectProfile);

  const logout = () => {
    removeRefreshToken();
    token.clearAccessToken();
    dispatch(isLogOut());
  };

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
      <Button onClick={() => dispatch(refreshAuth())}>sendRefreshToken</Button>
      <Button onClick={() => dispatch(fetchProfile())}>getProfile</Button>
      <Button onClick={() => token.clearAccessToken()}>clearAccessToken</Button>
    </Space>
  );
};

export default ProfilePage;
