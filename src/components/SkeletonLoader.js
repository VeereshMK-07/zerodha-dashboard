import React from "react";
import "./SkeletonLoader.css";

const SkeletonLoader = () => {
  return (
    <div className="skeleton-container">
      {/* Title */}
      <div className="skeleton title"></div>

      {/* Cards */}
      <div className="skeleton-cards">
        <div className="skeleton card"></div>
        <div className="skeleton card"></div>
        <div className="skeleton card"></div>
      </div>

      {/* Chart */}
      <div className="skeleton chart"></div>

      {/* Table rows */}
      <div className="skeleton-table">
        <div className="skeleton row"></div>
        <div className="skeleton row"></div>
        <div className="skeleton row"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;