import React from 'react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-1 h-6 px-2">
      <div className="dot-typing"></div>
    </div>
  );
};

export default LoadingIndicator;