import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../api/BASE_URL';
import axios from 'axios';
import { Card, Button, message } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import s from './BrigadePage.module.scss';
import HomeButton from '../homeButton/HomeButton';

const { Meta } = Card;

const headers = {
  "Authorization": `Bearer ${localStorage.getItem('token')}`,
  "Content-Type": "application/json"
};

const BrigadeInactive = () => {
  const [applications, setApplications] = useState([]);

  const handleAccept = async (applicationId) => {
    try {
      await axios.put(`${API_BASE_URL}/Brigade/applications/acceptApplication?applicationId=${applicationId}`, null, { headers });
      fetchData();
    } catch (error) {
      console.error('Error accepting application:', error);
      message.error('Failed to accept application. Please try again.');
    }
  };

  const handleComplete = async (applicationId) => {
    try {
      await axios.put(`${API_BASE_URL}/Brigade/applications/completeApplication?applicationId=${applicationId}`, null, { headers });
      fetchData();
    } catch (error) {
      console.error('Error completing application:', error);
      message.error('Failed to complete application. Please try again.');
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Brigade/brigade/applications`, { headers });
      setApplications(response.data.applications);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className={s.brigade_page}>
      <div className="container">
        <div className={s.cards}>
          {applications
            .filter((application) => application.status === 0)
            .map((application) => (
              <Card key={application.id}>
                <div>
                  <p>Описание: {application.description}</p>
                  <p>Адрес: {application.adress}</p>
                  <Button type="primary" onClick={() => handleAccept(application.id)}>
                    Принять
                  </Button>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </section>
  );
};

export default BrigadeInactive;
