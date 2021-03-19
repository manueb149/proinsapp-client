import React, { useContext, useEffect } from "react";
// Defaults HOC: Header, Sidebar and Main
import Default from "./DefaultIndex";
// Import navbar component
import Navbar from "./Navbar";
// Import contexts
import NavbarContext from '../contexts/NavbarContext';
import ReportContext from '../contexts/ReportContext';
import DefaultValuesContext from '../contexts/DefaultValuesContext';
import ServiceDataContext from '../contexts/ServiceDataContext';
import ServiceModelsContext from "../contexts/ServiceModalsContext";
import ServiceReportContext from "../contexts/ServiceReportContext";
import AuthContext from "../contexts/auth/authContext";
import InsurersContext from "../contexts/InsurersContext";
// Default container styled-component
import DefaultContainer from "../layout/Globals/Container.style";
import Pages from './DashboardPages';



const Dashboard = () => {

	// Extraer la información de autenticación
	const authContext = useContext(AuthContext);
	const { userAuthenticated, user, authenticated } = authContext;

	useEffect(() => {
		userAuthenticated();
		// eslint-disable-next-line
	}, [])

	return (
		<DefaultContainer>
			<div className="container-fluid">
				<Default.Header />
				<div className="row">
					<DefaultValuesContext>
						<ServiceDataContext>
							<ServiceModelsContext>
								<ServiceReportContext>
									<InsurersContext>
										<NavbarContext>
											<ReportContext>
												<Default.Sidebar>
													{(user && authenticated) ? <Navbar /> : ""}
												</Default.Sidebar>
												<Default.Main>
													<Pages />
												</Default.Main>
											</ReportContext>
										</NavbarContext>
									</InsurersContext>
								</ServiceReportContext>
							</ServiceModelsContext>
						</ServiceDataContext>
					</DefaultValuesContext>
				</div>
			</div>
		</DefaultContainer>
	);
};

export default Dashboard;
