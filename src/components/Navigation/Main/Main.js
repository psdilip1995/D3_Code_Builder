import React from 'react';

import classes from './Main.module.css';

const main = props => (
	<div className={classes.Main}>
		{props.children}
	</div>
);

export default main;