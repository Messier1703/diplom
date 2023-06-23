import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Button, message, Modal, Form, Input } from 'antd';
import s from './InactiveApplications.module.scss';
import LogoutButton from '../logoutButton/LogoutButton';
import HomeButton from '../homeButton/HomeButton';
import TransparentHeader from '../header/Header';

const { Meta } = Card;

const InactiveApplications = () => {
    const [applications, setApplications] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedApplicationId, setSelectedApplicationId] = useState(null);
    const [form] = Form.useForm();

    const headers = {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
    };

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get(
                    `https://ecoboxwebapi20230517185257.azurewebsites.net/api/Client/applications`,
                    { headers }
                );
                if (Array.isArray(response.data.applications)) {
                    const filteredApplications = response.data.applications.filter(
                        (application) => application.status === 0
                    );
                    setApplications(filteredApplications);
                } else {
                    console.error('Invalid response format. Expected "applications" to be an array.');
                }
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        fetchApplications();
    }, []);

    const handleDeleteApplication = async (applicationId) => {
        try {
            await axios.delete(
                `https://ecoboxwebapi20230517185257.azurewebsites.net/api/Application?id=${applicationId}`,
                { headers }
            );
            // Show success message
            message.success('Application deleted successfully.');
            // Update the applications state by removing the deleted application
            setApplications((prevApplications) =>
                prevApplications.filter((application) => application.id !== applicationId)
            );
        } catch (error) {
            console.error('Error deleting application:', error);
            // Show error message
            message.error('Failed to delete application.');
        }
    };

    const handleEditApplication = (application) => {
        setSelectedApplicationId(application.id);
        setIsModalVisible(true);
        // Reset the form fields and set initial values
        form.resetFields();
        form.setFieldsValue({
            description: application.description,
            adress: application.adress,
            number: application.number
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleUpdateApplication = async (values) => {
        try {
            const updatedApplication = {
                id: selectedApplicationId,
                description: values.description,
                adress: values.adress,
                number: values.number
            };
            await axios.put(
                'https://ecoboxwebapi20230517185257.azurewebsites.net/api/Application',
                updatedApplication,
                { headers }
            );
            // Show success message
            message.success('Application updated successfully.');
            // Perform any necessary additional actions after update
            // Close the modal
            handleCancel();
        } catch (error) {
            console.error('Error updating application:', error);
            // Show error message
            message.error('Failed to update application.');
        }
    };

    return (
        <div className={s.applications}>
            <div className="container">
                <div className={s.wrapper}>
                    <div className={s.cards}>
                        {applications.map((application) => (
                            <Card key={application.id}>
                                <p>Описание: {application.description}</p>
                                <p>Адрес: {application.adress}</p>
                                <p>Номер: {application.number}</p>
                                <Button type="primary" onClick={() => handleEditApplication(application)}>
                                    Edit
                                </Button>
                                <Button type="primary" danger onClick={() => handleDeleteApplication(application.id)}>
                                    Delete
                                </Button>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            <Modal
                title="Edit Application"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} onFinish={handleUpdateApplication}>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: false, message: 'Please enter a description' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="adress"
                        label="Address"
                        rules={[{ required: false, message: 'Please enter an address' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="number"
                        label="Number"
                        rules={[{ required: false, message: 'Please enter a number' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default InactiveApplications;
