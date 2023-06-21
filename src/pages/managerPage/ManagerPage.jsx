import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Button, message, Modal } from 'antd';
import s from './ManagerPage.module.scss';
import LogoutButton from '../../components/logoutButton/LogoutButton';
import HomeButton from '../../components/homeButton/HomeButton';

const { Meta } = Card;

const ManagerPage = () => {
    const [applications, setApplications] = useState([]);
    const [brigades, setBrigades] = useState([]);
    const [selectedApplicationId, setSelectedApplicationId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const headers = {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
    };

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get(`https://ecoboxwebapi20230517185257.azurewebsites.net/api/Application`, { headers });
                if (Array.isArray(response.data.applications)) {
                    setApplications(response.data.applications);
                } else {
                    console.error('Invalid response format. Expected "applications" to be an array.');
                }
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        const fetchBrigades = async () => {
            try {
                const response = await axios.get(`https://ecoboxwebapi20230517185257.azurewebsites.net/api/Manager/allBrigades`, { headers });
                if (Array.isArray(response.data.brigades)) {
                    setBrigades(response.data.brigades);
                } else {
                    console.error('Invalid response format. Expected "brigades" to be an array.');
                }
            } catch (error) {
                console.error('Error fetching brigades:', error);
            }
        };

        fetchApplications();
        fetchBrigades();
    }, []);

    const handleAssignToBrigade = (applicationId, brigadeId) => {
        const requestData = Number(brigadeId);

        axios
            .post(
                `https://ecoboxwebapi20230517185257.azurewebsites.net/api/Manager/assingToBrigade?applicationId=${applicationId}`,
                requestData,
                { headers }
            )
            .then(() => {
                message.success('Assigned to brigade successfully!');
                setIsModalVisible(false);
            })
            .catch((error) => {
                console.error('Error assigning to brigade:', error);
                message.error('Failed to assign to brigade. Please try again.');
            });
    };

    const showModal = (applicationId) => {
        setSelectedApplicationId(applicationId);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <section className={s.manager_page}>
            <div className="container">
                <h1 className={s.title}>Управление заявками</h1>
                <div className={s.cards}>
                    {applications.map((application) => (
                        <Card key={application.id}>
                            <p>Описание: {application.description}</p>
                            <p>Адрес: {application.adress}</p>
                            <Button id={s.btn} type="primary" onClick={() => showModal(application.id)}>
                                Перенаправить на бригаду
                            </Button>
                        </Card>
                    ))}

                    <Modal
                        title="Select Brigade"
                        open={isModalVisible}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        {brigades.map((brigade) => (
                            <Card
                                id={s.brigade_card}
                                key={brigade.id}
                                style={{ marginBottom: '12px' }}
                                onClick={() => handleAssignToBrigade(selectedApplicationId, brigade.id)}
                            >
                                <Meta title={brigade.userName} />
                            </Card>
                        ))}
                    </Modal>
                </div>
            <HomeButton />
            </div>
        </section>
    );
};

export default ManagerPage;
