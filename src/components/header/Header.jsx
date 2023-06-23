import React from 'react';
import { Layout, Typography, Menu } from 'antd';
import { Link } from 'react-router-dom';
import LogoutButton from '../logoutButton/LogoutButton';
import { MenuItem } from '@mui/base';

const { Title } = Typography;
const { Header } = Layout;

const TransparentHeader = () => {
  return (
    <Header>
      <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px', justifyContent: 'center' }}>
        <Menu.Item key="1" className="hoverable-tab">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" className="hoverable-tab">
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item key="3" className="hoverable-tab">
          <Link to="/register">Register</Link>
        </Menu.Item>
        <Menu.Item key="4" className="hoverable-tab">
          <LogoutButton/>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default TransparentHeader;
