import React from 'react';

const PageLoader: React.FC = () => (
  <div className="page-loader" aria-label="Loading page">
    <div className="page-loader-spinner" />
    <span className="page-loader-text">loading...</span>
  </div>
);

export default React.memo(PageLoader);
