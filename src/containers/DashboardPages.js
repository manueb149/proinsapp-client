import React, { useContext } from 'react';
import { navbarContext } from '../contexts/NavbarContext';
import StartPage from '../components/Dashboard/Start';
import ViewReportPage from '../components/Report/ViewReports';
import PrintReportPage from '../components/Report/PrintReport';
import EditReportPage from '../components/Report/EditReport';
import DeleteReportPage from '../components/Report/DeleteReport';
import CreateServicePage from '../components/Service/CreateService';
import SummaryPage from '../components/Service/ServiceSummary/ServiceSummary';
import MyServicesPage from '../components/Service/Reports/ViewReports';
import PrintMyServicesPage from '../components/Service/Reports/PrintReport';
import PrintBalancePage from '../components/Balance';
import DefaultValues from '../components/Configure/DefaultValues';
import DataUploadPage from '../components/Configure/DataUpload';
import TrucksUploadPage from '../components/Configure/TrucksUpload';
// import authContext from '../contexts/auth/authContext';

const DashboardPages = () => {

    const NavbarContext = useContext(navbarContext);
    const { activeMenu, activeSubMenu } = NavbarContext;

    return (
        <div>
            {(activeMenu==='main' || activeSubMenu==='') ? <StartPage /> : null}
            {(activeMenu==='service' && activeSubMenu==='create') ? <CreateServicePage /> : null}
            {(activeMenu==='service' && activeSubMenu==='summary') ? <SummaryPage /> : null}
            {(activeMenu==='service' && activeSubMenu==='myServices') ? <MyServicesPage /> : null}
            {(activeMenu==='service' && activeSubMenu==='printMyServices') ? <PrintMyServicesPage /> : null}
            {(activeMenu==='report' && activeSubMenu==='view') ? <ViewReportPage /> : null}
            {(activeMenu==='report' && activeSubMenu==='print') ? <PrintReportPage /> : null}
            {(activeMenu==='report' && activeSubMenu==='edit') ? <EditReportPage /> : null}
            {(activeMenu==='report' && activeSubMenu==='delete') ? <DeleteReportPage /> : null}
            {(activeMenu==='report' && activeSubMenu==='balance') ? <PrintBalancePage /> : null}
            {(activeMenu==='config' && activeSubMenu==='files') ? <DataUploadPage /> : null}
            {(activeMenu==='config' && activeSubMenu==='trucks') ? <TrucksUploadPage /> : null}
            {(activeMenu==='config' && activeSubMenu==='values') ? <DefaultValues /> : null}
            
        </div>
    )
}

export default DashboardPages;
