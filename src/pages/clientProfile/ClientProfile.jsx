import React, { useState } from 'react';
import { Tabs } from 'antd';
import s from './ClientProfile.module.scss';
import AllClients from '../../components/allClients/AllClients';
import AllBrigades from '../../components/allBrigades/AllBrigades';
import AllApplications from '../../components/allApplications/AllApplications';
import BrigadeRegistration from '../auth/brigadeRegistration/BrigadeRegistration';
import ManagerRegistration from '../auth/managerRegistration/ManagerRegistration';
import HomeButton from '../../components/homeButton/HomeButton';
import ClientApplications from '../../components/clientApplications/ClientApplications';
import PostApplication from '../postApplication/PostApplication';
import TransparentHeader from '../../components/header/Header';
import ActiveApplications from '../../components/activeApplications/ActiveApplications';
import InactiveApplications from '../../components/inactiveApplications/InactiveApplications';
import UnconfirmedApplications from '../../components/unconfirmedApplications/UnconfirmedApplications';

const { TabPane } = Tabs;

function ClientProfile() {
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
                            <ActiveApplications />
                        </TabPane>
                        <TabPane tab="Неактивные заявки" key="2">
                            <InactiveApplications />
                        </TabPane>
                        <TabPane tab="Подтвердить выполнение" key="3">
                            <UnconfirmedApplications />
                        </TabPane>
                        <TabPane tab="Оставить заявку" key="4">
                            <PostApplication />
                        </TabPane>
                    </Tabs>
                    <HomeButton />
                </div>
            </div>
        </div>
    );
}

export default ClientProfile;