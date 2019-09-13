import React from 'react';
import Skeleton from 'react-loading-skeleton';

const Loading = () => (
  <>
    <div className="w-full flex-1">
      <Skeleton width={100} height={15} />
      <Skeleton className="" height={40} />
      {/* <span className="pb-5 block"> <Skeleton width={200} height={40} /></span> */}
      <span className="pr-5 inline-block border-r border-gray-300"> <Skeleton className="pr-5" width={100} height={10} /></span>
      <span className="pl-5 inline-block mt-4"> <Skeleton className="pl-10" width={100} height={10} /></span>
      <Skeleton height={300} />
      <br />
      <br />

      <Skeleton className="mt-2" count={10} height={20} />
      <Skeleton className="mt-2" height={20} width={300} />
      <br />
      <br />
      <Skeleton className="mt-2" count={10} height={20} />
      <Skeleton className="mt-2" height={20} width={300} />
      <br />
      <br />
    </div>
  </>
);

export default Loading;
