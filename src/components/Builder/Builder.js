import React from 'react';

import Graph from './Graph/Graph';
import Controls from './Controls/Controls';

import classes from './Builder.module.css';

const builder = props => (
	<div className={classes.Builder}>
		<Graph/> 
		<Controls />
	</div>
);

export default builder;