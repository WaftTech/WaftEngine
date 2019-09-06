import React from 'react';
import moment from 'moment';

import LinkBoth from '../../../components/LinkBoth';
import { IMAGE_BASE } from '../../App/constants';
import BlogDetailSkeleton from '../Skeleton/BlogDetail';


function BlogDetail(props) {
  const { blog, loading } = props;

  return loading ? (
    <BlogDetailSkeleton />
  ) : (
      <div className="w-full flex-1 lg:px-5">

        <p className="sans-serif text-gray-700">
          {blog && moment(blog.added_at).format('MMM DD, YYYY')}
        </p>
        <h2 className="capitalize text-4xl sans-serif mb-2">{blog.title}</h2>

        {blog && blog.author && (
          <div className="inline-block">
            <span>Written by </span>
            {/* <img src={`${blog.author.avatar}`} alt={`${blog.author.name}`} /> */}
            <LinkBoth
              className="text-waftprimary leading-normal text-sm capitalize"
              to={`/blog/author/${blog.author._id}`}
            >
              {blog.author.name}
            </LinkBoth>
          </div>
        )}

        {blog && blog.category && blog.category.length > 0 && (
          <div className="inline-block border-l border-gray-600 ml-2 pl-2">
            {blog.category.map((each, index) => (
              <LinkBoth
                className="text-black hover:text-waftprimary leading-normal text-sm no-underline capitalize"
                key={index}
                to={`/blog/category/${each.slug_url}`}
              >
                {`${index === 0 ? '' : ', '}${each.title}`}
              </LinkBoth>
            ))}
          </div>
        )}

        <div className="blog_img mt-5">
          {blog && blog.image && blog.image.fieldname ? (
            <img
              src={`${IMAGE_BASE}${blog.image.path}`}
              className="object-cover"
              alt={`${blog.title}`}
              style={{
                width: '100%',
                height: '250px',
                objectFit: 'cover',
              }}
            />
          ) : null}
        </div>
        <div
          className="blog py-5"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />

        {blog && blog.tags && blog.tags.length > 0 && (
          <div className="inline-block mb-5">
            {blog.tags.map((each, index) => (
              <LinkBoth
                className="text-black bg-gray-300 hover:bg-blue hover:text-white leading-normal text-sm no-underline sans-serif rounded px-2 py-1 mr-2"
                key={index}
                to={`/blog/tag/${each}`}
              >
                {`${index === 0 ? '' : ''}${each}`}
              </LinkBoth>
            ))}
          </div>
        )}
      </div>
    );
}

export default BlogDetail;
