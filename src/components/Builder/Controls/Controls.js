import React from 'react';
import {connect} from 'react-redux';

import Select from '../../../hoc/Select/Select';
import DownloadCodeButton from '../DownloadCodeButton/DownloadCodeButton';
import * as actions from '../../../store/actions';

import classes from './Controls.module.css';

const controls = props => {

	const options = props.graphTypes.map(graphType => <option value={graphType.type} key={graphType.type}>{graphType.label}</option>);
	//
	const optionChanged = (newOption) => {
		//console.log("changed to "+value);
		props.onOptionChange(newOption);
	};
	
	return <div className={classes.Controls}>
				<Select options={options} changeHandler={optionChanged}/>
				<DownloadCodeButton />
			</div>;
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
		onOptionChange : (selectedGraph) => dispatch(actions.drawGraph(selectedGraph))
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(controls);