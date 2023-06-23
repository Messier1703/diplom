import React, { useEffect, useState } from 'react';
import { Card, Button } from 'antd';
import axios from 'axios';
import s from './AllClients.module.scss';
import { useLocation } from 'react-router-dom';

const AllClients = () => {
    const [clients, setClients] = useState([]);
    const location = useLocation();

    const headers = {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://ecoboxwebapi20230517185257.azurewebsites.net/api/Manager/allClients`, { headers });
            setClients(response.data.clients);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (email) => {
        try {
            await axios.post(`https://ecoboxwebapi20230517185257.azurewebsites.net/api/UserManage/delete?email=${encodeURIComponent(email)}`, null, { headers });
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    const isOnAdminPage = location.pathname === '/admin-page';

    return (
        <div className={s.clients}>
            <div className={s.clients_cards}>
                {Array.isArray(clients) && clients.length > 0 ? (
                    clients.map((client) => (
                        <Card key={client.id} className={s.card}>
                            <p>ID: {client.id}</p>
                            <p>Name: {client.userName}</p>
                            {isOnAdminPage && (
                                <Button type="primary" danger onClick={() => handleDelete(client.userName)}>Delete</Button>
                            )}
                        </Card>
                    ))
                ) : (
                    <p>No clients found.</p>
                )}
            </div>
        </div>
    );
};

export default AllClients;