import React, {useState} from 'react';
import {Button, Checkbox, Form, FormProps, Input, message, Modal} from "antd";
import {registerUser} from "../api/api";
import {validateEmail, validateLogin, validateNumberPhone, validateUserName,} from "../functions/functions";
import {useNavigate} from "react-router-dom";
import {authProps} from "../types/types";

const RegisterForm: React.FC = ({authMode, word}: authProps) => {
  type FieldType = {
    username: string,
    login: string,
    password: string,
    repeatPassword: string,
    email: string,
    phoneNumber?: string
    remember?: boolean
  };

  const navigate = useNavigate()

  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    navigate('/login');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleRegUser = async (userData: FieldType): Promise<void> => {
    const {
      email, login, password, phoneNumber, username
    } = userData
    await registerUser({
      email, login, password, phoneNumber, username
    })
  }

  const onFinish: FormProps<FieldType>['onFinish'] = async (userData: FieldType) => {
    try {
      await handleRegUser(userData)
      message.success(`Successful ${word}`);
      showModal()
    } catch (e) {
      message.error(e.response?.data || 'Registration Failed')
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    message.error(`Failed:, ${errorInfo.message}`);
  };
  return (
    <Form
      form={form}
      name="basic"
      layout="vertical"
      initialValues={{remember: true}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="User name"
        name="username"
        rules={[{required: true, message: 'Please input your user name!'},
          {
            validator(_, value) {
              return validateUserName(value)
            },
          }]}
      >
        <Input size="large" placeholder="User name"/>
      </Form.Item>
      <Form.Item<FieldType>
        label="Login"
        name="login"
        rules={[{required: true, message: 'Please input your login!'},
          {
            validator(_, value) {
              return validateLogin(value)
            },
          },
        ]}
      >
        <Input size="large" placeholder="User name"/>
      </Form.Item>
      <Form.Item<FieldType>
        layout="vertical"
        label="Password"
        name="password"
        rules={[{required: true, message: 'Please input your password!'},
          {min: 6, message: 'Minimum 6 characters'},
          {max: 60, message: 'Maximum 60 characters'}]}
      >
        <Input.Password size="large" placeholder="*****************"/>
      </Form.Item>
      <Form.Item<FieldType>
        layout="vertical"
        label="Repeat Password"
        name="repeatPassword"
        rules={[
          {required: true, message: 'Please confirm your password!',},
          ({getFieldValue}) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password size="large" placeholder="*****************"/>
      </Form.Item>
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{required: true, message: 'Please input your email!'},
          {
            validator(_, value) {
              return validateEmail(value)
            },
          }]}
      >
        <Input size="large" placeholder="mail@abc.com"/>
      </Form.Item>
      <Form.Item<FieldType>
        label="Phone number"
        name="phoneNumber"
        type='tel'
        rules={[
          {
            validator(_, value) {
              return validateNumberPhone(value)
            },
          }]}
      >
        <Input size="large" placeholder="+71234567890"/>
      </Form.Item>

      {authMode ? <div className="underAuthData">
          <Form.Item<FieldType>
            style={{margin: 0}}
            name="remember"
            valuePropName="checked"
            label={null}
          >
            <Checkbox style={{color: 'rgba(161, 161, 161, 1)'}}>Remember me</Checkbox>
          </Form.Item>
          <a href="#">Forgot Password?</a>
        </div>
        : ''
      }

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          {authMode ? 'Login' : 'Register'}
        </Button>
      </Form.Item>
      <Modal
        title="loginLink"
        closable={{'aria-label': 'Custom Close Button'}}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        перейти на страницу авторизации для входа в систему?
      </Modal>
    </Form>
  );
};

export default RegisterForm;