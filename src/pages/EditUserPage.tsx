import React, { useEffect, useState } from 'react';
import '../css/ProfilePage.css';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { Button, Card, Flex, Form, Input, message, Space } from 'antd';
import { selectUsersData } from '../store/selectors/usersSelectors';
import { useNavigate, useParams } from 'react-router-dom';
import { editUserById, fetchUserById } from '../store/reducers/ActionCreators';
import { UserRequest } from '../types/types';
import { validateEmail, validateNumberPhone, validateUserName } from '../functions/functions';
import { CheckOutlined, EditOutlined } from '@ant-design/icons';

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

  if (!id) return;

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch]);

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
                {
                  validator(_, value) {
                    return validateUserName(value);
                  },
                },
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
                {
                  validator(_, value) {
                    return validateEmail(value);
                  },
                },
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
                  validator(_, value) {
                    return validateNumberPhone(value);
                  },
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
