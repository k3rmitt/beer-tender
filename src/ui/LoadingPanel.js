import React from 'react';
import './LoadingPanel.css';
import Pint from '../pint.svg';

export default () => (
  <div className="beer-tender-loading-panel">
    <div className="beer-tender-loading-inner">
      <img alt="beer pint" src={Pint} />
    </div>
  </div>
);
