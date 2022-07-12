import React from "react";
import './loadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="modal-wrapper">
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;