import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

function HomeButton() {
  return (
    <div 
    style={{
      padding: "25px"
    }}
    >
    <Link to="/">
      <Button type="primary" danger>Вернуться</Button>
    </Link>
    </div>
  );
}

export default HomeButton;
