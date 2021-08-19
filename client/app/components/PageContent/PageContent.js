import React from 'react';

const PageContent = props => {
  const { loading, children } = props;
  return (
    <div
      className={`${loading ? 'bg-white border p-4 rounded mb-10' : 'bg-white border p-4 rounded mb-10'
        }`}
    >
      {children}
    </div>
  );
};

export default PageContent;
