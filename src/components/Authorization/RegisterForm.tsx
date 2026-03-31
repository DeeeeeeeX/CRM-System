import React, { useState } from 'react';
import { Button, Checkbox, Form, FormProps, Input, message, Modal } from 'antd';
import {
  validateEmail,
  validateLogin,
  validateNumberPhone,
  validateUserName,
} from '../../functions/validators';
import { useNavigate } from 'react-router-dom';
import { registrationUser } from '../../api/api';

type authProps = {
  isAuthMode: boolean;
  word: string;
};

type FieldType = {
  username: string;
  login: string;
  password: string;
  repeatPassword: string;
  email: string;
  phoneNumber?: string;
  remember?: boolean;
};

const RegisterForm: React.FC = ({ isAuthMode, word }: authProps) => {
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

  const onSubmitRegisterForm: FormProps<FieldType>['onSubmitRegisterForm'] = async (
    userData: FieldType,
  ) => {
    try {
      await onRegistrationUser(userData);
      message.success(`Успешно ${word}`);
      showModal();
    } catch (e) {
      message.error(e.response?.data || 'Регистрация провалена');
    }
  };

  const onSubmitRegisterFormFailed: FormProps<FieldType>['onSubmitRegisterFormFailed'] = (
    errorInfo,
  ) => {
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
          {
            validator(_, value) {
              return validateUserName(value);
            },
          },
        ]}
      >
        <Input size="large" placeholder="User name" />
      </Form.Item>
      <Form.Item<FieldType>
        label="Login"
        name="login"
        rules={[
          { required: true, message: 'Пожалуйста введите ваш логин' },
          {
            validator(_, value) {
              return validateLogin(value);
            },
          },
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
          {
            validator(_, value) {
              return validateEmail(value);
            },
          },
        ]}
      >
        <Input size="large" placeholder="mail@abc.com" />
      </Form.Item>
      <Form.Item<FieldType>
        label="Phone number"
        name="phoneNumber"
        type="tel"
        rules={[
          {
            validator(_, value) {
              return validateNumberPhone(value);
            },
          },
        ]}
      >
        <Input size="large" placeholder="+71234567890" />
      </Form.Item>

      {isAuthMode ? (
        <div className="under-auth-data">
          <Form.Item<FieldType>
            style={{ margin: 0 }}
            name="remember"
            valuePropName="checked"
            label={null}
          >
            <Checkbox style={{ color: 'rgba(161, 161, 161, 1)' }}>Remember me</Checkbox>
          </Form.Item>
          <a href="src/components/Authorization/RegisterForm#">Forgot Password?</a>
        </div>
      ) : (
        ''
      )}

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          {isAuthMode ? 'Login' : 'Register'}
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
