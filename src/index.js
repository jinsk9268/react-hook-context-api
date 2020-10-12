import React from 'react';
import ReactDOM from 'react-dom';
// import App from './practice-1/App';
import App from './practice-2/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
