import React, { useState } from 'react';
import { Button, Form, FormProps, Input, message, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { registrationUser } from '../../api/api';

type FieldType = {
  username: string;
  login: string;
  password: string;
  repeatPassword: string;
  email: string;
  phoneNumber?: string;
  remember?: boolean;
};

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm<FieldType>();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const onTransitionAuthorization = () => {
    navigate('/login');
  };

  const onCancelModal = () => {
    setIsModalOpen(false);
  };

  const onRegistrationUser = async (userData: FieldType): Promise<void> => {
    const { email, login, password, phoneNumber, username } = userData;
    await registrationUser({
      email,
      login,
      password,
      phoneNumber,
      username,
    });
  };

  const onSubmitRegisterForm: FormProps<FieldType>['onFinish'] = async (userData: FieldType) => {
    try {
      await onRegistrationUser(userData);
      message.success(`Успешная регистрация`);
      showModal();
    } catch (e) {
      message.error(e.response?.data || 'Регистрация провалена');
    }
  };

  const onSubmitRegisterFormFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    message.error(`Ошибка:, ${errorInfo.message}`);
  };
  return (
    <Form
      form={form}
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onSubmitRegisterForm}
      onFinishFailed={onSubmitRegisterFormFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="User name"
        name="username"
        rules={[
          { required: true, message: 'Пожалуйста, введите имя пользователя' },
          { min: 1 },
          { max: 60 },
          { pattern: /^[a-zа-яё]+$/i, message: 'Только буквы' },
        ]}
      >
        <Input size="large" placeholder="User name" />
      </Form.Item>
      <Form.Item<FieldType>
        label="Login"
        name="login"
        rules={[
          { required: true, message: 'Пожалуйста, введите ваш логин' },
          { min: 2 },
          { max: 60 },
          { pattern: /^[a-z]+$/i, message: 'Только английские буквы' },
        ]}
      >
        <Input size="large" placeholder="User name" />
      </Form.Item>
      <Form.Item<FieldType>
        layout="vertical"
        label="Password"
        name="password"
        rules={[
          { required: true, message: 'Пожалуйста, введите пароль' },
          { min: 6, message: 'Минимум 6 символов' },
          { max: 60, message: 'Максимум 60 символов' },
        ]}
      >
        <Input.Password size="large" placeholder="*****************" />
      </Form.Item>
      <Form.Item<FieldType>
        layout="vertical"
        label="Repeat Password"
        name="repeatPassword"
        rules={[
          { required: true, message: 'Пожалуйста, повторите ваш пароль' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Пароли не совпадают'));
            },
          }),
        ]}
      >
        <Input.Password size="large" placeholder="*****************" />
      </Form.Item>
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Пожалуйста, введите вашу почту' },
          { type: 'email', message: 'Не верный email' },
        ]}
      >
        <Input size="large" placeholder="mail@abc.com" />
      </Form.Item>
      <Form.Item<FieldType>
        label="Phone number"
        name="phoneNumber"
        type="tel"
        rules={[
          { pattern: /^\+\d{7,15}$/, message: 'Номер телефона должен быть в формате +123...' },
        ]}
      >
        <Input size="large" placeholder="+71234567890" />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
      <Modal
        title="loginLink"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={onTransitionAuthorization}
        onCancel={onCancelModal}
      >
        перейти на страницу авторизации для входа в систему?
      </Modal>
    </Form>
  );
};

export default RegisterForm;
