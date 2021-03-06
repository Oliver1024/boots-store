import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'Router';

// Toastify for alert messages
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'css/app.scss';
import 'css/style.scss';

import 'commons/auth'

ReactDOM.render(
    <div>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
        />
        <Router />
    </div>


    , document.getElementById('root'));

