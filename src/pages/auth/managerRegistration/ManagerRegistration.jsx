import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import s from './ManagerRegistration.module.scss'

function ManagerRegistration() {
    const [value, setValue] = useState({
        email: '',
        password: ''
    })

    const headers = {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
    };

    const getData = async () => {
        try {
          const resp = await axios.post(
            `https://ecoboxwebapi20230517185257.azurewebsites.net/api/UserManage/register/manager?email=${value.email}&password=${value.password}`,
            {},
            { headers }
          );
          console.log(resp);
        } catch (error) {
          console.error('Error registering manager:', error);
        }
      };

    return (
        <div className="container">
            <div className={s.register}>
                <div className={s.form}>
                    <h1 className={s.form_title}>Создайте аккаунт!</h1>
                    <Form
                        name="normal_register"
                        className="register-form"
                        id={s.register_form}
                        initialValues={{ remember: true }}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                { type: 'email', message: 'The input is not valid E-mail!' },
                                { required: true, message: 'Please input your E-mail!' },
                            ]}
                            onChange={e => setValue({ ...value, email: e.target.value })}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                            onChange={e => setValue({ ...value, password: e.target.value })}
                        >
                            <Input.Password placeholder="Пароль" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="register-form-button" onClick={getData}>
                                Создать
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default ManagerRegistration;
