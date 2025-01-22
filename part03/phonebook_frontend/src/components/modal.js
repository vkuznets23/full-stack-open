import React from "react";
import "../styles/Modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Render nothing if the modal is not open

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
