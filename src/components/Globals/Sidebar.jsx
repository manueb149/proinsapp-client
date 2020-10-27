import React from 'react';

// Default header styled-component
import SidebarContainer from '../../layout/Globals/Sidebar.style';

const Sidebar = (props) => {
	return (
		<div className='col-sb col-lg-2 col-md-3 col-sm-12'>
			<SidebarContainer>
				{/* Component inherited */}
				{props.children}
				{/* Component inherited */}
			</SidebarContainer>
		</div>
	);
};

export default Sidebar;