import React from 'react';
import {Button, Checkbox, Form, FormProps, Input, message} from "antd";

const LoginForm = ({authMode}) => {
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
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Email"
        name="Email"
        rules={[{ required: true, message: 'Please input your Email!' }]}
      >
        <Input size="large" placeholder="mail@abc.com" />
      </Form.Item>

      <Form.Item<FieldType>
        layout="vertical"
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password size="large" placeholder="*****************" />
      </Form.Item>

      <div className="underAuthData">
        <Form.Item<FieldType>
          style={{ margin: 0 }}
          name="remember"
          valuePropName="checked"
          label={null}
        >
          <Checkbox style={{ color: 'rgba(161, 161, 161, 1)' }}>Remember me</Checkbox>
        </Form.Item>
        {authMode ? <a href="#">Forgot Password?</a> : ''}
      </div>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          {authMode.isLogin ? 'Register' : 'Login'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;