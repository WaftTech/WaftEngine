import React from 'react';
import Skeleton from 'react-loading-skeleton';

const Loading = () => (
  <>
    <ul className="list-none pl-0">
      {[1, 2, 3].map((each, index) => (
        <li className="info ">
          <Skeleton />
        </li>
      ))}
    </ul>
  </>
);

export default Loading;
