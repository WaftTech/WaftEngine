import React from 'react';

const PageHeader = props => {
  const { classes, children } = props;
  return (
    <div className="text-xl my-auto font-bold pageheader">{children}</div>
  );
};

export default PageHeader;
