import React from 'react';

import classes from './Input.module.css';

const Input = props => {
	return (
		<div className={classes.InputDiv} style={{display: props.show ? 'flex' : 'none'}}>
			<label>{props.label} </label>
			<input type="text" onChange={props.changed} value={props.value}/>
		</div>
	);
};

export default Input;