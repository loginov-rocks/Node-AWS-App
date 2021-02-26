import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from 'components/App/App';
import { AUTH_DATA_STORAGE_KEY } from 'constants/auth';
import { store } from 'store/store';
import Auth from 'utils/auth';

import * as serviceWorker from './serviceWorker';
import 'index.css';

const auth = new Auth(axios, window.localStorage, AUTH_DATA_STORAGE_KEY);
auth.useAuth();

axios.interceptors.response.use(
    response => {
      return response;
    },
    function(error) {
      if (error.response.status === 400) {
        alert(error.response.data?.message);
      }
      if (error.response.status === 401) {
        alert(error.response.data?.message);
      }
      if (error.response.status === 403) {
        alert(error.response.data?.message);
      }
      return Promise.reject(error.response);
    },
);

ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <CssBaseline/>
        <App auth={auth}/>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
