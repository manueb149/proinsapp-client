import React, { useContext } from 'react';
import { navbarContext } from '../contexts/NavbarContext';
import StartPage from '../components/Dashboard/Start';
import ViewReportPage from '../components/Report/ViewReports';
import CreateServicePage from '../components/Service/CreateService';
import DataUploadPage from '../components/Configure/DataUpload';
import TrucksUploadPage from '../components/Configure/TrucksUpload';
import SummaryPage from '../components/Service/ServiceSummary/ServiceSummary';
import DefaultValues from '../components/Configure/DefaultValues';

const DashboardPages = () => {

    const NavbarContext = useContext(navbarContext);
    const { activeMenu, activeSubMenu } = NavbarContext;

    return (
        <div>
            {(activeMenu==='main' || activeSubMenu==='') ? <StartPage /> : null}
            {(activeMenu==='service' && activeSubMenu==='create') ? <CreateServicePage /> : null}
            {(activeMenu==='service' && activeSubMenu==='summary') ? <SummaryPage /> : null}
            {(activeMenu==='report' && activeSubMenu==='view') ? <ViewReportPage /> : null}
            {(activeMenu==='config' && activeSubMenu==='files') ? <DataUploadPage /> : null}
            {(activeMenu==='config' && activeSubMenu==='trucks') ? <TrucksUploadPage /> : null}
            {(activeMenu==='config' && activeSubMenu==='values') ? <DefaultValues /> : null}
            
        </div>
    )
}

export default DashboardPages;
