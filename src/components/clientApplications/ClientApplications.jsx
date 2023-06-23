import React, { useEffect, useState } from 'react';
import { Card, Spin, Alert } from 'antd';
import axios from 'axios';

const headers = {
  "Authorization": `Bearer ${localStorage.getItem('token')}`,
  "Content-Type": "application/json"
};

const { Meta } = Card;

const ClientApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://ecoboxwebapi20230517185257.azurewebsites.net/api/Client/applications', { headers });
        setApplications(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch applications.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>All Applications</h1>
      {loading ? (
        <Spin size="large" />
      ) : error ? (
        <Alert message={error} type="error" />
      ) : (
        applications.map((application) => (
          <Card key={application.id}>
            <Meta
              title={application.title}
              description={application.description}
              address={application.address}
            />
          </Card>
        ))
      )}
    </div>
  );
};

export default ClientApplications;
