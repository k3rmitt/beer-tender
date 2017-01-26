import React from 'react';
// design time component
export default ({style, title, children, className, ...props}) => (
  <div
    style={{
      padding: '5px',
      margin: '5px',
      border: '1px dashed black',
      ...style,
    }}
    {...props}
  >
    <h5 style={{textTransform: 'uppercase'}}>{title}</h5>
    <div className={className}>{children}</div>
  </div>
);
