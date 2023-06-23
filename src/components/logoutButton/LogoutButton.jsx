import React, { useEffect } from 'react';
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const isTokenAvailable = !!localStorage.getItem('token');

  return isTokenAvailable && (
    <div>
      <Button type="primary" danger onClick={handleLogout}>
        Выйти из аккаунта
      </Button>
    </div>
  );
}

export default LogoutButton;
