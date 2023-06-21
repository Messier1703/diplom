import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import s from './Login.module.scss';

function Login() {
  const onFinish = async (values) => {
    try {
      const response = await axios.post(`https://ecoboxwebapi20230517185257.azurewebsites.net/api/Auth?email=${values.email}&password=${values.password}`);
      localStorage.setItem('token', response.data)
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className={s.login}>
        <div className={s.form}>
          <h1 className={s.form_title}>Войдите в аккаунт!</h1>
          <Form
            name="normal_login"
            className="login-form"
            id={s.login_form}
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input.Password placeholder="Пароль" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Войти
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
