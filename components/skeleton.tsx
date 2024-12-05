import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-300 rounded-md w-3/4 mx-auto"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded-md w-5/6 mx-auto"></div>
        <div className="h-4 bg-gray-300 rounded-md w-4/6 mx-auto"></div>
      </div>
      <div className="h-32 bg-gray-300 rounded-md w-full"></div>
      <div className="flex justify-center space-x-4">
        <div className="h-10 bg-gray-300 rounded-md w-1/4"></div>
        <div className="h-10 bg-gray-300 rounded-md w-1/4"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;

