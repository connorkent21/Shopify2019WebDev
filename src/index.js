import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './master.css';
import Search from './components/Search';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Search />, document.getElementById('root'));

serviceWorker.unregister();
