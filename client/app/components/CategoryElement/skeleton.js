import React from 'react';
import Skeleton from 'react-loading-skeleton';

const Loading = ({ size }) => (
  <>
    <h2 className="pt-5 pb-4 text-2xl">
      <Skeleton height={20} width={300} />
    </h2>
    <div className="-mx-6 article-group">
      {Array(size - 1)
        .fill(null)
        .map((x, i) => i)
        .map((each, index) => (
          <div key={each} className={`px-6 mb-8 item-${index + 1}`}>
            <div className="flex article-container">
              <div className="article-img-container">
                <div className="max-w-none object-cover article-img">
                  <Skeleton
                    height={300}
                    className="max-w-none object-cover article-img"
                  />
                </div>
              </div>
              <div className="pl-5 leading-tight article-text">
                <span className="text-gray-700 text-sm sans-serif article-date">
                  <Skeleton height={10} width={100} />
                </span>
                <div className="font-bold text-xl block text-black hover:text-waftprimary pointer no-underline article-title">
                  <Skeleton
                    count={Math.floor(Math.random() * 2) + 1}
                    width={500}
                  />
                </div>
                <span className="text-gray-700 text-sm sans-serif author-name">
                  <Skeleton height={10} width={150} />
                </span>

                <p className="text-gray-600 leading-relaxed short-description">
                  <Skeleton height={8} count={4} width={150} />
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  </>
);

export default Loading;
