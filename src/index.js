import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './routes/AppRouter';

import 'normalize.css/normalize.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/scss/bootstrap.scss';
import 'mdbreact/dist/css/mdb.css';
import './styles/styles.scss';



ReactDOM.render(<AppRouter />, document.getElementById('app'));
