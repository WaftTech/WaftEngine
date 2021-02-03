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
import LinkBoth from '../../../components/LinkBoth';
import { IMAGE_BASE, DATE_FORMAT } from '../../App/constants';
import BlogDetailSkeleton from '../Skeleton/BlogDetail';
import BlogComments from '../../Comments';


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
          {blog && <BlogComments id={blog._id} commentFor="blog" />}
        </div>
      </>
    );
}

export default BlogDetail;
