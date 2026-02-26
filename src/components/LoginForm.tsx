import React from 'react';
import {Button, Checkbox, Form, FormProps, Input, message} from "antd";
import {validateLogin} from "../functions/functions";
import {loginUser} from "../api/api";
import {AuthData, authProps} from "../types/types";
import {useNavigate} from "react-router-dom";

const LoginForm: React.FC = ({authMode, word}: authProps) => {
  type FieldType = {
    login?: string;
    password?: string;
    remember?: boolean;
  };

  const navigate = useNavigate()

  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>['onFinish'] = async (authData: AuthData) => {
    try {
      await loginUser(authData)
      message.success(`Successful ${word}`);
      navigate('/')
    } catch (e) {
      message.error(e.response?.data || 'Login Failed')
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
        label="Login"
        name="login"
        rules={[{required: true, message: 'Please input your Login!'},
          {
            validator(_, value) {
              return validateLogin(value)
            },
          },]}
      >
        <Input size="large" placeholder="login"/>
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

      <div className="underAuthData">
        <Form.Item<FieldType>
          style={{margin: 0}}
          valuePropName="checked"
          label={null}
          name='remember'
        >
          <Checkbox style={{color: 'rgba(161, 161, 161, 1)'}}>Remember me</Checkbox>
        </Form.Item>
        {authMode ? <a href="#">Forgot Password?</a> : ''}
      </div>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          {authMode ? 'Login' : 'Register'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;