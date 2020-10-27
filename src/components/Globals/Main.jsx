import React from 'react';

// Default header styled-component
import MainContainer from '../../layout/Globals/Main.style';

const Main = (props) => {
	return (
		<div className='col-mn col-lg-10 col-md-9 col-sm-12'>
			<MainContainer>
				{/* Component inherited */}
				{props.children}
				{/* Component inherited */}
			</MainContainer>
		</div>
	);
};

export default Main;
