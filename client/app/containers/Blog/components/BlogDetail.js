import React, { useState } from 'react';
import moment from 'moment';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
  FacebookShareCount
} from 'react-share';

import Dialog from '@material-ui/core/Dialog';
import LinkBoth from '../../../components/LinkBoth';
import { IMAGE_BASE,DATE_FORMAT } from '../../App/constants';
import BlogDetailSkeleton from '../Skeleton/BlogDetail';
import BlogComments from '../../Comments';

// @material
// import DialogTitle from '@material-ui/core/DialogTitle';

function BlogDetail(props) {
  const { blog, loading } = props;
  const url = window.location.href;
  return loading ? (
    <BlogDetailSkeleton />
  ) : (
      <>
        <div>

          <p className="text-gray-700">
            {blog && moment(blog.added_at).format(DATE_FORMAT)}
          </p>
          <h2 className="capitalize text-4xl mb-2 leading-tight">{blog.title}</h2>

          {blog && blog.author && (
            <div className="inline-block">
              <span>Written by </span>
              {/* <img src={`${blog.author.avatar}`} alt={`${blog.author.name}`} /> */}
              <LinkBoth
                className="text-red-600 underline leading-normal text-sm capitalize"
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
                  className="text-blue-700 hover:text-indigo-800 leading-normal text-sm no-underline capitalize"
                  key={index}
                  to={`/blog/category/${each.slug_url}`}
                >
                  {`${index === 0 ? '' : ', '}${each.title}`}
                </LinkBoth>
              ))}
            </div>
          )}

          <div className="flex items-center py-4">
            <FacebookShareButton className="ml-2" url={url}>
              <FacebookIcon size={36} round />
            </FacebookShareButton>
            <span className="inline-block ml-1 bg-gray-200 rounded border w-8 h-8 text-center text-blue-700 leading-relaxed"> <FacebookShareCount url={url} /></span>
            <LinkedinShareButton className="ml-2" url={url}>
              <LinkedinIcon size={36} round />
            </LinkedinShareButton>
            <TwitterShareButton className="ml-2" url={url}>
              <TwitterIcon size={36} round />
            </TwitterShareButton>
            <EmailShareButton className="ml-2" url={url}>
              <EmailIcon size={36} round />
            </EmailShareButton>
            <WhatsappShareButton className="ml-2" url={url}>
              <WhatsappIcon size={36} round />
            </WhatsappShareButton>
          </div>

          <div className="blog_img">
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
            className="text-lg leading-relaxed py-5"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />

          {blog && blog.tags && blog.tags.length > 0 && (
            <div className="inline-block mb-5">
              {blog.tags.map((each, index) => (
                <LinkBoth
                  className="bg-gray-300 hover:bg-blue-500 hover:text-white leading-normal text-sm no-underline rounded px-2 py-1 mr-2"
                  key={index}
                  to={`/blog/tag/${each}`}
                >
                  {`${index === 0 ? '' : ''}${each}`}
                </LinkBoth>
              ))}
            </div>
          )}
        </div>
        {blog && <BlogComments blog_id={blog._id} />}
      </>
    );
}

export default BlogDetail;
