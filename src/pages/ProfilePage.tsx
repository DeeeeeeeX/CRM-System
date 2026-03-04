import React, { useEffect } from 'react';
import '../css/ProfilePage.css';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchProfile } from '../store/reducers/ActionCreators';
import { Button, Card, message, Space } from 'antd';
import { logout } from '../functions/functions';

const ProfilePage = () => {
  const dispatch = useAppDispatch();

  const profile = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  useEffect(() => {
    if (profile.error) {
      message.error(profile.error);
    }
  }, [profile.error]);

  return (
    <>
      {profile.isLoading ? (
        'Loading...'
      ) : (
        <Space vertical style={{ paddingLeft: '60px' }}>
          <Card title="Данные пользователя" style={{ width: 300 }}>
            <p>Имя пользователя: {profile.profile.username}</p>
            <p>Почтовый адрес: {profile.profile.email}</p>
            <p>Телефон: {profile.profile.phoneNumber}</p>
          </Card>
          <Button onClick={logout}>logout</Button>
        </Space>
      )}
    </>
  );
};

export default ProfilePage;
