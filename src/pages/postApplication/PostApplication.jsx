import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { API_BASE_URL } from '../../api/BASE_URL';
import s from './PostApplication.module.scss';

const PostApplication = () => {
  const onFinish = (values) => {
    sendToAPI(values);
  };

  const sendToAPI = (data) => {
    const headers = {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json"
    };

    axios
      .post(`${API_BASE_URL}/Application`, data, { headers })
      .then((response) => {
        console.log('API response:', response.data);
        message.success('Application submitted successfully!');
      })
      .catch((error) => {
        console.error('API error:', error);
        message.error('Failed to submit application. Please try again.');
      });
  };

  return (
    <div className="container">
      <div className={s.post_application}>
        <div className={s.form}>
          <Form id={s.post_form} onFinish={onFinish}>
            <Form.Item name="adress" rules={[{ required: true, message: 'Напишите адрес!' }]}>
              <Input placeholder="Адрес" />
            </Form.Item>
            <Form.Item name="description" rules={[{ required: true, message: 'Напишите описание!' }]}>
              <Input placeholder="Описание" />
            </Form.Item>
            <Form.Item name="number" rules={[{ required: true, message: 'Введите число!' }]}>
              <Input placeholder="Номер телефона" type="phone" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PostApplication;
