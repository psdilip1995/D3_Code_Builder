import React from 'react';
import {connect} from 'react-redux';

import classes from './Toolbar.module.css';

//{props.graphTypes[props.selectedGraph]}

const toolbar = props => {
	const title = props.graphTypes.filter(obj => obj.type===props.selectedGraph)[0]['label'];

	return <header className={classes.Toolbar}>
				{title}
			</header>;
};
//
const mapStateToProps = state => {
	return {
		graphTypes 		: state.builder.graphTypes,
		selectedGraph	: state.builder.selectedGraph
	};
};
const mapDispatchToProps = dispatch => {
	return {
		
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(toolbar);