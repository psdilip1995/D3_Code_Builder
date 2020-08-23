import * as actionTypes from '../actions/actionTypes';

const javaScriptCode = ``;

const initialState = {
	javaScriptCode : javaScriptCode
};

const generateCode = (state, action) => {
	return {
		...state,
		javaScriptCode: action.codeData
	};
};

const reducer = (state=initialState, action) => {
	switch(action.type){
		case(actionTypes.GENERATE_CODE) : return generateCode(state,action);
		default: return state
	}
};

export default reducer;