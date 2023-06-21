import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../api/BASE_URL';
import { Card, Button, message, Modal, Form, Input } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import s from './ClientProfile.module.scss';
import HomeButton from '../../components/homeButton/HomeButton';

const { Meta } = Card;

const Profile = () => {
  const headers = {
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": "application/json"
  };

  const [userApplications, setUserApplications] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [completedApplications, setCompletedApplications] = useState([]);

  const getUserInfo = () => {
    return axios.get(`${API_BASE_URL}/Client/applications`, { headers });
  };

  const handleUpdate = (id) => {
    setModalVisible(true);
    setSelectedItemId(id);
    form.resetFields();
    form.setFieldsValue(userApplications.find(application => application.id === id));
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: 'Are you sure you want to delete this application?',
      onOk: () => {
        axios.delete(`${API_BASE_URL}/Application?id=${id}`, { headers })
          .then(() => {
            message.success('Application deleted successfully!');
            setUserApplications(userApplications.filter(application => application.id !== id));
          })
          .catch((error) => {
            console.error('Error deleting application:', error);
            message.error('Failed to delete application. Please try again.');
          });
      }
    });
  };

  const markAsCompleted = (applicationId) => {
    axios
      .put(`${API_BASE_URL}/Client/applications/completeApplication?applicationId=${applicationId}`, null, { headers })
      .then(() => {
        message.success('Marked as completed successfully!');
        setCompletedApplications([...completedApplications, applicationId]);
      })
      .catch((error) => {
        console.error('Error marking as completed:', error);
        message.error('Failed to mark as completed. Please try again.');
      });
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleModalOk = () => {
    form.validateFields()
      .then((values) => {
        const { adress, description, number } = values;
        const id = selectedItemId;
        axios.put(`${API_BASE_URL}/Application`, { id, adress, description, number }, { headers })
          .then(() => {
            message.success('Item updated successfully!');
            setModalVisible(false);
            setUserApplications(userApplications.map(application => {
              if (application.id === id) {
                return {
                  ...application,
                  adress,
                  description,
                  number
                };
              }
              return application;
            }));
          })
          .catch((error) => {
            console.error('Error updating item:', error);
            message.error('Failed to update item. Please try again.');
          });
      })
      .catch((error) => {
        console.error('Validation error:', error);
      });
  };

  useEffect(() => {
    getUserInfo().then((res) => {
      setUserApplications(res.data.applications);
      const completedAppIds = res.data.applications.filter(app => !app.isActive).map(app => app.id);
      setCompletedApplications(completedAppIds);
    });
  }, []);

  return (
    <section className={s.client_profile}>
    <div className="container">
      <h1 className={s.title}>Мои заявки</h1>
      <div className={s.cards}>
        {userApplications.map((item) => (
          <Card key={item.id}>
            <p>Описание: {item.description}</p>
            <p>Адрес: {item.adress}</p>
            <p>Номер телефона: {item.number}</p>
            {completedApplications.includes(item.id) && (
              <div className={s.checkmarkContainer}>
                <CheckCircleOutlined className={s.checkmark} />
              </div>
            )}
            {!completedApplications.includes(item.id) && (
              <Button id={s.btn} type="primary" onClick={() => handleUpdate(item.id)}>
                Редактировать
              </Button>
            )}
            {!completedApplications.includes(item.id) && (
              <Button id={s.btn} type="primary" danger onClick={() => handleDelete(item.id)}>
                Удалить
              </Button>
            )}
            {!completedApplications.includes(item.id) && (
              <Button id={s.btn} type="primary" onClick={() => markAsCompleted(item.id)}>
                Завершить
              </Button>
            )}
          </Card>
        ))}
        <Modal
          title="Update Item"
          open={modalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
        >
          <Form form={form}>
            <Form.Item name="adress" label="Address">
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input />
            </Form.Item>
            <Form.Item name="number" label="Number">
              <Input type="number" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <HomeButton />
    </div>
    </section>
  );
};

export default Profile;