import React from 'react';
import Skeleton from 'react-loading-skeleton';

const Loading = () => (
  <>
    {[1, 2, 3].map(each => (
      <div key={each} className="border-b border-dotted py-5 block md:flex">
        <div className="w-full md:w-1/4">
          <Skeleton count={3} height={30} />
          <span className="mt-5">
            <Skeleton width={100} height={10} />
          </span>
        </div>
        <div className="w-full md:w-1/2 p-4 pt-0">
          <span className="text-gray-700 mr-2">
            <Skeleton />
          </span>
          <div
            className="leading-normal text-base text-left"
            style={{ height: '95px', overflow: 'hidden' }}
          >
            <Skeleton count={7} />
          </div>
        </div>
        <div className="w-full md:w-1/4 h-48 object-cover overflow-hidden p-8 pt-0">
          <Skeleton height={120} width={161} />
        </div>
      </div>
    ))}
  </>
);

export default Loading;
