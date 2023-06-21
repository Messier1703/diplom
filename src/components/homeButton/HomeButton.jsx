import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

function HomeButton() {
  return (
    <Link to="/home">
      <Button type="primary">Вернуться на главную страницу</Button>
    </Link>
  );
}

export default HomeButton;
