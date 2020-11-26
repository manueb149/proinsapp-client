import React, { useContext } from 'react';
import { navbarContext } from '../contexts/NavbarContext';
import StartPage from '../components/Dashboard/Start';
import CreateReportPage from '../components/Report/CreateReport';
import CreateServicePage from '../components/Service/CreateService';
import DataUploadPage from '../components/Configure/DataUploa';
import TrucksUploadPage from '../components/Configure/TrucksUpload';

const DashboardPages = () => {

    const NavbarContext = useContext(navbarContext);
    const { activeMenu, activeSubMenu } = NavbarContext;

    return (
        <div>
            {(activeMenu==='main' || activeSubMenu==='') ? <StartPage /> : null}
            {(activeMenu==='service' && activeSubMenu==='create') ? <CreateServicePage /> : null}
            {(activeMenu==='report' && activeSubMenu==='view') ? <CreateReportPage /> : null}
            {(activeMenu==='config' && activeSubMenu==='upload') ? <DataUploadPage /> : null}
            {(activeMenu==='config' && activeSubMenu==='trucks') ? <TrucksUploadPage /> : null}
        </div>
    )
}

export default DashboardPages;
