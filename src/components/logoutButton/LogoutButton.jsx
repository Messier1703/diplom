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
    <div style={{padding: "25px"}}>
    <Button type="primary" danger onClick={handleLogout}>
      Выйти из аккаунта
    </Button>
    </div>
  );
}

export default LogoutButton;
