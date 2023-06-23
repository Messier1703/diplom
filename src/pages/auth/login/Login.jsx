import React, { useState } from 'react';
import { Form, Input, Button, Select, Alert, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../../api/BASE_URL';
import s from './Login.module.scss';
import TransparentHeader from '../../../components/header/Header';

const { Option } = Select;

function Login() {
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [showError, setShowError] = useState(false);

  const onFinish = async (values) => {
    try {
      if (values.role === 'default') {
        setShowWarning(true);
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/Auth?email=${values.email}&password=${values.password}`
      );
      localStorage.setItem('token', response.data);
      console.log(response.data);

      const selectedRole = values.role;
      switch (selectedRole) {
        case 'Brigade':
          navigate('/brigade-page');
          break;
        case 'Client':
          navigate('/client-profile');
          break;
        case 'Manager':
          navigate('/manager-page');
          break;
        case 'Admin':
          navigate('/admin-page');
          break;
        default:
          navigate('/default');
          break;
      }
    } catch (error) {
      console.error(error);
      setShowError(true);
    }
  };

  const closeModal = () => {
    setShowError(false);
  };

  return (
    <>
      <TransparentHeader />
      <div className="container">
        <div className={s.login}>
          <div className={s.form}>
            <h1 className={s.form_title}>Войдите в аккаунт!</h1>
            {showWarning && <Alert message="Please select a role!" type="warning" showIcon />}
            <Form
              name="normal_login"
              className="login-form"
              id={s.login_form}
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="role"
                rules={[{ required: true, message: 'Please select a role!' }]}
              >
                <Select placeholder="Select a role">
                  <Option value="default">Select a role</Option>
                  <Option value="Brigade">Brigade</Option>
                  <Option value="Client">Client</Option>
                  <Option value="Manager">Manager</Option>
                  <Option value="Admin">Admin</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
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
        <Modal
          open={showError}
          title="Error"
          onCancel={closeModal}
          footer={[
            <Button key="ok" onClick={closeModal}>
              OK
            </Button>,
          ]}
        >
          <p>An error occurred during login. Please try again.</p>
        </Modal>
      </div>
    </>
  );
}

export default Login;