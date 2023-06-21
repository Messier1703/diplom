import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

function RegisterButton() {
  return (
    <Link to="/register">
      <Button type="primary">Зарегестрироваться</Button>
    </Link>
  );
}

export default RegisterButton;
