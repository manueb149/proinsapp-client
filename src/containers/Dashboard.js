import React from "react";
// Defaults HOC: Header, Sidebar and Main
import Default from "./DefaultIndex";
// Import navbar component
import Navbar from "./Navbar";
// Import contexts
import NavbarContext from '../contexts/NavbarContext';
import ServiceDataContext from '../contexts/ServiceDataContext';
import DefaultValuesContext from '../contexts/DefaultValuesContext';
// Default container styled-component
import DefaultContainer from "../layout/Globals/Container.style";
import Pages from './DashboardPages';

const Dashboard = () => {
	return (
		<DefaultContainer>
			<div className="container-fluid">
				<Default.Header />
				<div className="row">
					<DefaultValuesContext>
						<ServiceDataContext>
							<NavbarContext>
								<Default.Sidebar>
									<Navbar />
								</Default.Sidebar>
								<Default.Main>
									<Pages />
								</Default.Main>
							</NavbarContext>
						</ServiceDataContext>
					</DefaultValuesContext>
				</div>
			</div>
		</DefaultContainer>
	);
};

export default Dashboard;
