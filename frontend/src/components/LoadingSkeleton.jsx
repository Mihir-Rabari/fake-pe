import React from 'react';

function LoadingSkeleton({ type = 'card', count = 1 }) {
  const skeletons = {
    card: (
      <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    ),
    table: (
      <div className="bg-white rounded-lg border border-gray-200 animate-pulse">
        <div className="p-4 border-b border-gray-200">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-4 border-b border-gray-100 flex gap-4">
            <div className="h-3 bg-gray-200 rounded flex-1"></div>
            <div className="h-3 bg-gray-200 rounded flex-1"></div>
            <div className="h-3 bg-gray-200 rounded flex-1"></div>
          </div>
        ))}
      </div>
    ),
    text: (
      <div className="animate-pulse space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
    )
  };

  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="mb-4">
          {skeletons[type]}
        </div>
      ))}
    </>
  );
}

export default LoadingSkeleton;
