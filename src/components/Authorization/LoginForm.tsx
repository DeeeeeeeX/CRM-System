import React from 'react';
import { Button, Checkbox, Form, FormProps, Input, message } from 'antd';
import { loginUser } from '../../api/api';
import { token } from '../../functions/workWithTokens';
import { AuthData } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { authorize, fetchProfile } from '../../store/reducers/ActionCreators';
import { useAppDispatch } from '../../store/hooks';

type FieldType = {
  login?: string;
  password?: string;
  remember?: boolean;
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const onSubmitLoginForm: FormProps<FieldType>['onSubmitLoginForm'] = async (
    authData: AuthData,
  ) => {
    try {
      const response = await loginUser(authData);
      token.setAccessToken(response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      dispatch(authorize());
      dispatch(fetchProfile());
      message.success(`Успешная авторизация`);
      navigate('/');
    } catch (e) {
      message.error(e.response?.data || 'Авторизация провалена');
    }
  };

  const onSubmitLoginFormFailed: FormProps<FieldType>['onSubmitLoginFormFailed'] = (errorInfo) => {
    message.error(`Ошибка:, ${errorInfo.message}`);
  };
  return (
    <Form
      form={form}
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onSubmitLoginForm}
      onFinishFailed={onSubmitLoginFormFailed}
      autoComplete="off"
    >
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
        <Input size="large" placeholder="login" />
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

      <div className="under-auth-data">
        <Form.Item<FieldType>
          style={{ margin: 0 }}
          valuePropName="checked"
          label={null}
          name="remember"
        >
          <Checkbox style={{ color: 'rgba(161, 161, 161, 1)' }}>Remember me</Checkbox>
        </Form.Item>
        <a href="src/components/Authorization/LoginForm#">Forgot Password?</a>
      </div>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
