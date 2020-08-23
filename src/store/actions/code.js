import * as actionTypes from './actionTypes';

export const generateCode = codeData => {
	return {
		type: actionTypes.GENERATE_CODE,
		codeData: codeData
	};
};