import React from 'react';
import authBack from '../assets/auth/authback.png';
import circle from '../assets/auth/Vector.svg';
import loginImg from '../assets/auth/loginImg.svg';
import { Button, Checkbox, Form, FormProps, Input, message } from 'antd';
import { Link } from 'react-router-dom';

const Login = () => {
  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>['onFinish'] = () => {
    message.success('Successful login');
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    message.error(`Failed:, ${errorInfo.message}`);
  };

  return (
    <div>
      <div className="authBack">
        <img className="imgBack" src={authBack} alt="background" />
        <img className="circle" src={circle} alt="circle" />
        <div className="authImgTitle">
          <h3>Turn your ideas into reality.</h3>
          <span>Start for free and get attractive offers from the community</span>
        </div>
      </div>
      <div className="loginLayer">
        <img className="loginImg" src={loginImg} alt="loginImg" />

        <div className="formBlock">
          <div className="loginTitle">
            <h3>Login to your Account</h3>
            <span>See what is going on with your business</span>
          </div>
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

              <a href="#">Forgot Password?</a>
            </div>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="createTitle">
          <span>Not Registered Yet?</span>
          <Link to="/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
