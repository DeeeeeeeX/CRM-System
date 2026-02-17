import React from 'react';
import {Button, Checkbox, Form, FormProps, Input, message} from "antd";

const RegisterForm = ({authMode}) => {
  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>['onFinish'] = () => {
    message.success(`Successful ${authMode.onFinishSuccess}`);
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
        name="userName"
        rules={[{required: true, message: 'Please input your user name!'}]}
      >
        <Input size="large" placeholder="User name"/>
      </Form.Item>
      <Form.Item<FieldType>
        label="Login"
        name="login"
        rules={[{required: true, message: 'Please input your login!'}]}
      >
        <Input size="large" placeholder="User name"/>
      </Form.Item>
      <Form.Item<FieldType>
        layout="vertical"
        label="Password"
        name="password"
        rules={[{required: true, message: 'Please input your password!'}]}
      >
        <Input.Password size="large" placeholder="*****************"/>
      </Form.Item>
      <Form.Item<FieldType>
        layout="vertical"
        label="Repeat Password"
        name="repeatPassword"
        rules={[{required: true, message: 'Please repeat your password!'}]}
      >
        <Input.Password size="large" placeholder="*****************"/>
      </Form.Item>
      <Form.Item<FieldType>
        label="Email"
        name="Email"
        rules={[{required: true, message: 'Please input your Email!'}]}
      >
        <Input size="large" placeholder="mail@abc.com"/>
      </Form.Item>
      <Form.Item<FieldType>
        label="Phone number"
        name="phoneNumber"
        rules={[{required: false, message: 'Please input your phone number!'}]}
      >
        <Input size="large" placeholder="71234567890"/>
      </Form.Item>

      {authMode.isLogin ? <div className="underAuthData">
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
          {authMode.isLogin ? 'Login' : 'Register'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;