import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Button, message, Modal } from 'antd';
import s from './UnconfirmedApplications.module.scss';
import LogoutButton from '../logoutButton/LogoutButton';
import HomeButton from '../homeButton/HomeButton';

const { Meta } = Card;

// ...

const UnconfirmedApplications = () => {
    const [applications, setApplications] = useState([]);

    const headers = {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
    };

    useEffect(() => {
        // ...

        const fetchApplications = async () => {
            try {
                const response = await axios.get(
                    `https://ecoboxwebapi20230517185257.azurewebsites.net/api/Client/applications`,
                    { headers }
                );
                if (Array.isArray(response.data.applications)) {
                    const filteredApplications = response.data.applications.filter(
                        (application) => application.status === 2
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

    const handleCompleteApplication = async (applicationId) => {
        try {
            const response = await axios.put(
                `https://ecoboxwebapi20230517185257.azurewebsites.net/api/Client/applications/completeApplication?applicationId=${applicationId}`,
                null,
                { headers }
            );
            // Show success message
            message.success('Application completed successfully.');
            // Perform any necessary additional actions after completion
        } catch (error) {
            console.error('Error completing application:', error);
            // Show error message
            message.error('Failed to complete application.');
        }
    };

    return (
        <section className={s.applications}>
            <div className="container">
                <div className={s.wrapper}>
                    <div className={s.cards}>
                        {applications.map((application) => (
                            <Card key={application.id}>
                                <p>Описание: {application.description}</p>
                                <p>Адрес: {application.adress}</p>
                                <Button
                                    type="primary" warn
                                    onClick={() => handleCompleteApplication(application.id)}
                                >
                                    Complete
                                </Button>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UnconfirmedApplications;
