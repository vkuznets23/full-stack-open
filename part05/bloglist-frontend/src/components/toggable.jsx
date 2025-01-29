import React, { useState } from 'react';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
        {/* Only show children if the component is visible */}
      {visible && (
        <div>
          {props.children}
        </div>
      )}
      {/* Button that toggles visibility of the content */}
      <button onClick={toggleVisibility}>
        {visible ? 'Cancel' : 'Create New Blog'}
      </button>
    </div>
  );
};

export default Togglable;