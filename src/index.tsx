import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CoreContextWrapper from './core/CoreContext';

ReactDOM.render(
  <CoreContextWrapper>
    <App />
  </CoreContextWrapper>,
  document.getElementById('root')
);
