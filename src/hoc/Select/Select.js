import React from 'react';

import classes from './Select.module.css';

const select = props => {

	const changed = (event) => {props.changeHandler(event.target.value)};

	return (
		<div className={classes.Component}>
			<label className={classes.Label}> Select Graph</label>
			<select className={classes.Select} onChange={changed}>
				{props.options}
			</select>
		</div>
	);
};

export default select;