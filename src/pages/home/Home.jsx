import React from 'react';
import { Typography, Row, Col, Button, Card } from 'antd';
import { Link } from 'react-router-dom';
import s from './Home.module.scss';
import AppHeader from '../../components/header/Header';
import LogoutButton from '../../components/logoutButton/LogoutButton';
import TransparentHeader from '../../components/header/Header';

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <div>
      <TransparentHeader />
      <section className={s.first}>
        <div className="container">
          <div className={s.first_content}>
            <h1 className={s.first_title}>Ecoboxes</h1>
            <p className={s.first_desc}>Сервис, который поможет очистить планету.</p>
          </div>
        </div>
      </section>

      <div className={s.advantages}>
        <div className="container">

          <div className={s.wrapper}>
            <h2>Бесплатная доставка</h2>
            <p>Мы предоставляем бесплатную доставку экоящиков прямо к вашей двери.</p>
          </div>
          <div className={s.wrapper}>
            <h2>Экологически дружественные</h2>
            <p>Наши экоящики изготовлены из перерабатываемых материалов и помогают бороться с загрязнением окружающей среды.</p>
          </div>
          <div className={s.wrapper}>
            <h2>Простота использования</h2>
            <p>Наши экоящики легко собираются и могут быть использованы для сортировки и утилизации различных типов отходов.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
