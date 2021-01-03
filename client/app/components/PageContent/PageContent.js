import React from 'react';

const PageContent = props => {
  const { loading, children } = props;
  return (
    <div
      className={`${loading ? 'bg-white border p-4 rounded' : 'bg-white border p-4 rounded'
        }`}
    >
      {children}
    </div>
  );
};

export default PageContent;
