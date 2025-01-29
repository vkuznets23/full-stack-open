import React, { useState } from 'react';

const Togglable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  return (
    <div>
      {visible && <div>{typeof children === 'function' ? children(toggleVisibility) : children}</div>}
      <button onClick={toggleVisibility}>
        {visible ? 'Hide' : buttonLabel || 'Show'}
      </button>
    </div>
  );
};

export default Togglable;