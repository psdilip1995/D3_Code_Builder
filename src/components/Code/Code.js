import React from 'react';

import InputData from './Data/InputData';
import CodeSnippet from './CodeSnippet/CodeSnippet';

import classes from './Code.module.css';

const code = props => {
	return (
		<div className={classes.Code}>
			<InputData />
			<CodeSnippet />
		</div>
	);
};

export default code;