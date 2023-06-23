import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Button, message, Modal } from 'antd';
import s from './ActiveApplications.module.scss';
import LogoutButton from '../logoutButton/LogoutButton';
import HomeButton from '../homeButton/HomeButton';

const { Meta } = Card;

const ActiveApplications = () => {
    const [applications, setApplications] = useState([]);

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
                        (application) => application.status === 1
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

    return (
        <section className={s.applications}>
            <div className="container">
                <div className={s.wrapper}>
                    <div className={s.cards}>
                        {applications.map((application) => (
                            <Card key={application.id}>
                                <p>Описание: {application.description}</p>
                                <p>Адрес: {application.adress}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ActiveApplications;