import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/home');
  };

  const isTokenAvailable = !!localStorage.getItem('token');

  return isTokenAvailable && (
    <Button type="danger" onClick={handleLogout} style={{ backgroundColor: 'red', borderColor: 'red' }}>
      Logout
    </Button>
  );
}

export default LogoutButton;
