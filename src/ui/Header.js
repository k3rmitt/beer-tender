import React from 'react';
import Pint from '../pint.svg';

export default () => (
  <div className="container">
    <div className="container">
      <h1>
        <img
          alt="a pint of beer as logo"
          src={Pint}
          style={{width: '50px', height: '50px'}}
        />
        <span>BeerTender</span>
      </h1>
    </div>
  </div>
);
