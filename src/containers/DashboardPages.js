import React, { useContext } from 'react';
import { navbarContext } from '../contexts/NavbarContext';
import StartPage from '../components/Dashboard/Start';
import CreateReportPage from '../components/Report/CreateReport';
import CreateServicePage from '../components/Service/CreateService';
import DataUploadPage from '../components/Configure/dataUpload';

const DashboardPages = () => {

    const NavbarContext = useContext(navbarContext);
    const { activeMenu, activeSubMenu } = NavbarContext;
    // console.log(activeMenu);

    return (
        <div>
            {(activeMenu==='main' || activeSubMenu==='') ? <StartPage /> : null}
            {(activeMenu==='service' && activeSubMenu==='create') ? <CreateServicePage /> : null}
            {(activeMenu==='report' && activeSubMenu==='view') ? <CreateReportPage /> : null}
            {(activeMenu==='config' && activeSubMenu==='upload') ? <DataUploadPage /> : null}
        </div>
    )
}

export default DashboardPages;
