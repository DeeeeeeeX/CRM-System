import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import { Button, Card, Flex, Form, Input, message, Space } from 'antd';
import { selectUsersData } from '../store/selectors/usersSelectors';
import { useNavigate, useParams } from 'react-router-dom';
import { editUserById, fetchUserById } from '../store/reducers/ActionCreators';
import { UserRequest } from '../types/types';
import { CheckOutlined, EditOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../store/hooks';

interface IsEditing {
  username: boolean;
  email: boolean;
  phoneNumber: boolean;
}

const EditUserPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUsersData);
  const [form] = Form.useForm<UserRequest>();
  const { id } = useParams();

  const [isEditing, setIsEditing] = useState<IsEditing>({
    username: false,
    email: false,
    phoneNumber: false,
  });

  if (!id) return <div>id undefined</div>;

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
    }
  }, [form, user]);

  const onEdit = async (field: keyof UserRequest) => {
    try {
      const values = await form.validateFields([field]);

      await dispatch(
        editUserById({
          id,
          userState: {
            [field]: values[field],
          },
        }),
      );
      setIsEditing((prev) => ({ ...prev, [field]: false }));
    } catch (e) {
      message.error(e.message);
    }
  };

  const onStartEdit = (field: keyof UserRequest) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));

    form.setFieldsValue({
      [field]: user[field],
    });
  };

  return (
    <Card title="Данные пользователя" style={{ minWidth: 300 }}>
      <Form form={form} autoComplete="off">
        <Space size="large" vertical style={{ width: '30%' }}>
          {isEditing.username ? (
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Пожалуйста, введите имя пользователя' },
                { min: 1 },
                { max: 60 },
                { pattern: /^[a-zа-яё]+$/i, message: 'Только буквы' },
              ]}
            >
              <Flex gap={10}>
                <div>Имя пользователя</div>
                <Input />
                <CheckOutlined onClick={() => onEdit('username')} />
              </Flex>
            </Form.Item>
          ) : (
            <Flex gap={10}>
              <div>Имя пользователя {user?.username}</div>
              <EditOutlined style={{ cursor: 'pointer' }} onClick={() => onStartEdit('username')} />
            </Flex>
          )}

          {isEditing.email ? (
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Пожалуйста, введите вашу почту' },
                { type: 'email', message: 'Не верный email' },
              ]}
            >
              <Flex gap={10}>
                <div>Email</div>
                <Input />
                <CheckOutlined onClick={() => onEdit('email')} />
              </Flex>
            </Form.Item>
          ) : (
            <Flex gap={10}>
              <div> Email {user?.email} </div>
              <EditOutlined style={{ cursor: 'pointer' }} onClick={() => onStartEdit('email')} />
            </Flex>
          )}

          {isEditing.phoneNumber ? (
            <Form.Item
              name="phoneNumber"
              rules={[
                {
                  pattern: /^\+\d{7,15}$/,
                  message: 'Номер телефона должен быть в формате +123...',
                },
              ]}
            >
              <Flex gap={10}>
                <div>Телефон</div>
                <Input />
                <CheckOutlined onClick={() => onEdit('phoneNumber')} />
              </Flex>
            </Form.Item>
          ) : (
            <Flex gap={10}>
              <div> Телефон {user?.phoneNumber}</div>
              <EditOutlined
                style={{ cursor: 'pointer' }}
                onClick={() => onStartEdit('phoneNumber')}
              />
            </Flex>
          )}
          <Button onClick={() => navigate('/users')}>Вернуться к пользователям</Button>
        </Space>
      </Form>
    </Card>
  );
};

export default EditUserPage;
