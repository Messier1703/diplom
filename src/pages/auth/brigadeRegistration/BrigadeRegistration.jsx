import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import s from './BrigadeRegistration.module.scss';
import { API_BASE_URL } from '../../../api/BASE_URL';

function BrigadeRegistration() {
    const [value, setValue] = useState({
        email: '',
        password: '',
        brigaderName: '',
        brigaderSurname: '',
        informalName: ''
    })

    const headers = {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
    };

    const registerBrigade = async () => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/UserManage/register/brigade?email=${value.email}&password=${value.password}&brigaderName=${value.brigaderName}&brigaderSurname=${value.brigaderSurname}&informalName=${value.informalName}`,
                {},
                { headers }
            );
            console.log(response);
            message.success('Brigade registered successfully!');
        } catch (error) {
            console.error('Error registering brigade:', error);
            message.error('Failed to register brigade. Please try again.');
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
                                { type: 'email', message: 'The input is not a valid E-mail!' },
                                { required: true, message: 'Please input your E-mail!' },
                            ]}
                            onChange={e => setValue({ ...value, email: e.target.value })}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, type: 'text' }]}
                            onChange={e => setValue({ ...value, password: e.target.value })}
                        >
                            <Input placeholder="Пароль" />
                        </Form.Item>
                        <Form.Item
                            name="brigaderName"
                            rules={[{ required: true, type: 'text' }]}
                            onChange={e => setValue({ ...value, brigaderName: e.target.value })}
                        >
                            <Input placeholder="Имя" />
                        </Form.Item>
                        <Form.Item
                            name="brigaderSurname"
                            rules={[{ required: true, type: 'text' }]}
                            onChange={e => setValue({ ...value, brigaderSurname: e.target.value })}
                        >
                            <Input placeholder="Фамилия" />
                        </Form.Item>
                        <Form.Item
                            name="informalName"
                            rules={[{ required: true, type: 'text' }]}
                            onChange={e => setValue({ ...value, informalName: e.target.value })}
                        >
                            <Input placeholder="Никнейм" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="register-form-button" onClick={registerBrigade}>
                                Создать
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default BrigadeRegistration;
