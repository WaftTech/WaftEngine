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
  // FacebookShareCount,
} from 'react-share';

import Dialog from '@material-ui/core/Dialog';
import LinkBoth from '../../../components/LinkBoth';
import { IMAGE_BASE, DATE_FORMAT } from '../../App/constants';
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
          <h1 className="text-4xl lg:text-5xl font-bold pt-4 leading-tight">
            {blog && blog.title}
          </h1>
          {/* {blog && blog.category && blog.category.length > 0 && (
            <div className="inline-block border-l border-gray-600 ml-2 pl-2">
              {blog.category.map((each, index) => (
                <LinkBoth
                  className="text-blue-700 hover:text-indigo-800 leading-normal text-sm no-underline capitalize"
                  key={index}
                  to={`/news/category/${each.slug_url}`}
                >
                  {`${index === 0 ? '' : ', '}${each.title}`}
                </LinkBoth>
              ))}
            </div>
          )} */}

          {/* <div className="flex pt-2">
            <div className="md:w-1/2">
              <p className="text-gray-700">
                {blog && moment(blog.added_at).format('MMM DD, YYYY')}
              </p> 
            </div>
          </div>*/}

          {blog && blog.image && blog.image.fieldname ? (
            <img className="mt-4"
              src={`${IMAGE_BASE}${blog.image.path}`}
              alt={`${blog.title}`}
            />
          ) : null}
          <div
            className="ckEditor font-mukta"
            dangerouslySetInnerHTML={{ __html: blog && blog.description }}
          />

          {/* {blog && blog.tags && blog.tags.length > 0 && (
            <div className="inline-block mb-5">
              {blog.tags.map((each, index) => (
                <LinkBoth
                  className="bg-gray-300 hover:bg-blue-500 hover:text-white leading-normal text-sm no-underline rounded px-2 py-1 mr-2"
                  key={index}
                  to={`/news/tag/${each}`}
                >
                  {`${index === 0 ? '' : ''}${each}`}
                </LinkBoth>
              ))}
            </div>
          )} */}

          {blog && <BlogComments id={blog._id} commentFor="blog" />}
        </div>
      </>
    );
}

export default BlogDetail;
