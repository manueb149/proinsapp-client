import React, { useContext } from 'react';
// Default header styled-component
import HeaderContainer from '../../layout/Globals/Header.style';
import logo from '../../assets/logo_h.png';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/auth/authContext'

const Header = (props) => {

	const authContext = useContext(AuthContext);
	const { user } = authContext;

	return (
		<div className='row header'>
			<HeaderContainer>
				<div className='col-12'>
					<div className="header-inner">
						<Link to='/dashboard'>
							<Image src={logo} alt="logo" fluid />
						</Link>
						{user ?
							(<div className="username">
								{user.name}
							</div>)
						: null}
						{/* Component inherited */}
						{props.children}
						{/* Component inherited */}
						<div className="user-conf">
							<i className="fa fa-user-circle"></i>
						</div>
					</div>
				</div>
			</HeaderContainer>
		</div>
	);
};

export default Header;
