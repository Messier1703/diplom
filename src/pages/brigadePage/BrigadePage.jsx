import React, { useState } from 'react';
import { Tabs } from 'antd';
import { Header } from 'antd/es/layout/layout';
import s from './ManagerPage.module.scss';
import AllApplications from '../../components/allApplications/AllApplications';
import AllClients from '../../components/allClients/AllClients';
import BrigadeRegistration from '../auth/brigadeRegistration/BrigadeRegistration';
import HomeButton from '../../components/homeButton/HomeButton';
import TransparentHeader from '../../components/header/Header';
import BrigadeActive from '../../components/brigadeActive/BrigadeActive';
import BrigadeInactive from '../../components/brigadeInactive/BrigadeActive';

const { TabPane } = Tabs;

function BrigadePage() {
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
                        <TabPane tab="Активные заявки" key="1">
                            <BrigadeActive />
                        </TabPane>
                        <TabPane tab="Неактивные заявки" key="2">
                            <BrigadeInactive />
                        </TabPane>
                    </Tabs>
                    <HomeButton />
                </div>
            </div>
        </div>
    );
}

export default BrigadePage;