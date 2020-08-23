import React,{ Component } from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Main from '../../components/Navigation/Main/Main';


class Layout extends Component {
	render(){
		return <div>
					<Toolbar />
					<Main>
						{this.props.children}
					</Main>
				</div>
		
	}
};

export default Layout;