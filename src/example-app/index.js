import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';

import './lib/normalize.css';
import './lib/styles.css';

// this will intialise the component library example that runs
// independently of any other react instances on the page
import '../index';

const dev = process.env.NODE_ENV !== 'production';

const rootElement = document.getElementById('app');

function render() {
    ReactDOM.render(
        <AppContainer>
            <App />
        </AppContainer>,
    rootElement
  );
}

if (dev && module.hot) {
  // hot reload the component hierarchy when changes are made
    module.hot.accept('./components/App', () => {
        render(require('./components/App').default);
    });
}

render();
