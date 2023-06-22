import React, { useEffect, useState } from 'react';
import { Card, Button } from 'antd';
import axios from 'axios';
import s from './AllBrigades.module.scss';

const AllBrigades = () => {
    const [brigades, setBrigades] = useState([]);

    const headers = {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://ecoboxwebapi20230517185257.azurewebsites.net/api/Manager/allBrigades`, { headers });
            setBrigades(response.data.brigades);
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

    return (
        <div className={s.brigades}>
            <div className={s.brigades_cards}>
                {Array.isArray(brigades) && brigades.length > 0 ? (
                    brigades.map((brigade) => (
                        <Card key={brigade.id}>
                            <p>ID: {brigade.id}</p>
                            <p>Name: {brigade.userName}</p>
                            <Button type="primary" danger onClick={() => handleDelete(brigade.userName)}>Delete</Button>
                        </Card>
                    ))
                ) : (
                    <p>No brigades found.</p>
                )}
            </div>
        </div>
    );
};

export default AllBrigades;
