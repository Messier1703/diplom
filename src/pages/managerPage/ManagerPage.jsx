import React, { useState } from 'react';
import { Tabs } from 'antd';
import { Header } from 'antd/es/layout/layout';
import s from './ManagerPage.module.scss';
import AllApplications from '../../components/allApplications/AllApplications';
import AllClients from '../../components/allClients/AllClients';
import BrigadeRegistration from '../auth/brigadeRegistration/BrigadeRegistration';
import HomeButton from '../../components/homeButton/HomeButton';
import TransparentHeader from '../../components/header/Header';

const { TabPane } = Tabs;

function ManagerPage() {
    const [activeTab, setActiveTab] = useState('1');

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    return (
        <div className={s.admin}>
            <TransparentHeader/>
            <div className="container">
                <div className={s.admin_tabs_wrapper}>
                    <Tabs activeKey={activeTab} onChange={handleTabChange} centered className={s.admin_tabs}>
                        <TabPane tab="Управление заявками" key="1">
                            <AllApplications />
                        </TabPane>
                        <TabPane tab="Все клиенты" key="2">
                            <AllClients />
                        </TabPane>
                        <TabPane tab="Зарегестрировать бригаду" key="3">
                            <BrigadeRegistration />
                        </TabPane>
                    </Tabs>
                    <HomeButton />
                </div>
            </div>
        </div>
    );
}

export default ManagerPage;