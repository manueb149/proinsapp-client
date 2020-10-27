import React from "react";
// Defaults HOC: Header, Sidebar and Main
import Default from "./DefaultIndex";
// Import navbar component
import Navbar from "./Navbar";
// Import context for dropdown menu
import NavbarContext from '../contexts/NavbarContext';
import PagesContext from '../contexts/PagesContext';
// Default container styled-component
import DefaultContainer from "../layout/Globals/Container.style";
// Se importa Main, aquí debe ir una fnción que muestre el main según onClink del sidebar
// import Start from '../components/Dashboard/Start';
import Pages from './DashboardPages';

const Dashboard = () => {
	return (
		<DefaultContainer>
			<div className="container-fluid">
				<Default.Header />
				<div className="row">
					<PagesContext>
						<NavbarContext>
							<Default.Sidebar>
								<Navbar />
							</Default.Sidebar>
							<Default.Main>
								<Pages />
							</Default.Main>
						</NavbarContext>
					</PagesContext>
				</div>
			</div>
		</DefaultContainer>
	);
};

export default Dashboard;
