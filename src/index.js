import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import builderReducer from './store/reducers/builder';
import codeReducer from './store/reducers/code';
import { Provider } from 'react-redux';
import { createStore ,combineReducers } from 'redux';

const rootReducer = combineReducers({
	builder: builderReducer,
	code: codeReducer
});

const store = createStore(rootReducer);

const app = (
	<Provider store={store}>
		<App/>
	</Provider>
);

ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
