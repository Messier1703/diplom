import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

function LoginButton() {
  return (
    <Link to="/login">
      <Button type="primary">Логин</Button>
    </Link>
  );
}

export default LoginButton;
