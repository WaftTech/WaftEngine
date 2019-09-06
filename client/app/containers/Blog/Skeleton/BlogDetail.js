import React from 'react';
import Skeleton from 'react-loading-skeleton';

const Loading = () => (
  <>
    <div className="w-full flex-1 lg:px-5">
      <Skeleton width={100} height={20} />
      <Skeleton height={40} />
      <span className="pb-5 block"> <Skeleton width={200} height={40} /></span>
      <span className="pr-5 inline-block border-r border-gray-600"> <Skeleton className="pr-5" width={100} height={10} /></span>
      <span className="pl-5 inline-block"> <Skeleton className="pl-10" width={100} height={10} /></span>
      <br />
      <br />
      <Skeleton className="mb-2" count={10} height={20} />
      <Skeleton className="mb-2" height={20} width={300} />
      <br />
      <br />
      <Skeleton className="mb-2" count={10} height={20} />
      <Skeleton className="mb-2" height={20} width={300} />
      <br />
      <br />
    </div>
  </>
);

export default Loading;
