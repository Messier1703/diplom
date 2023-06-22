import React from 'react';
import { Typography, Row, Col, Button, Card } from 'antd';
import { Link } from 'react-router-dom';
import s from './Home.module.scss';
import AppHeader from '../../components/header/Header';
import LogoutButton from '../../components/logoutButton/LogoutButton';

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <div>
      <section className={s.first}>
        <div className="container">
          <div className={s.first_content}>
            <h1 className={s.first_title}>Ecoboxes</h1>
            <p className={s.first_desc}>Сервис, который поможет очистить планету.</p>
          </div>
        </div>
      </section>

      <section className={s.advantages}>
        <div className="container">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card className={s.card}>
                <h2>Бесплатная доставка</h2>
                <p>Мы предоставляем бесплатную доставку экоящиков прямо к вашей двери.</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card className={s.card}>
                <h2>Экологически дружественные</h2>
                <p>Наши экоящики изготовлены из перерабатываемых материалов и помогают бороться с загрязнением окружающей среды.</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card className={s.card}>
                <h2>Простота использования</h2>
                <p>Наши экоящики легко собираются и могут быть использованы для сортировки и утилизации различных типов отходов.</p>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      <section className={s.actions}>
        <div className="container">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Link to="/login">
                <Card title="Вход" className={s.card}>
                  <p>Нажмите здесь, чтобы войти в свою учетную запись.</p>
                </Card>
              </Link>
            </Col>
            <Col span={12}>
              <Link to="/register">
                <Card title="Регистрация" className={s.card}>
                  <p>Присоединяйтесь к нам и начните использовать сервис Ecoboxes.</p>
                </Card>
              </Link>
            </Col>
          </Row>
        </div>
      </section>
      <LogoutButton/>
    </div>
  );
};

export default Home;
