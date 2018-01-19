import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

import toastr from './../node_modules/toastr/build/toastr.min.css'
import toastrJs from './../node_modules/toastr/build/toastr.min.js'

ReactDOM.render((
    <Router>
        <App />
    </Router>), document.getElementById('root'));
registerServiceWorker();
