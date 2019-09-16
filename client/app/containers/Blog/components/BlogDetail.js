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
} from 'react-share';

import LinkBoth from '../../../components/LinkBoth';
import { IMAGE_BASE } from '../../App/constants';
import BlogDetailSkeleton from '../Skeleton/BlogDetail';
import BlogComments from '../../Comments';

//@material
import Dialog from '@material-ui/core/Dialog';
// import DialogTitle from '@material-ui/core/DialogTitle';

function BlogDetail(props) {
  const { blog, loading } = props;

  const [open, setOpen] = useState(false);

  const handleShare = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return loading ? (
    <BlogDetailSkeleton />
  ) : (
    <>
      <div>
        <button
          className="py-2 px-6 rounded mt-4 text-sm text-white bg-blue-600 hover:bg-blue-700 btn-theme"
          onClick={handleShare}
        >
          Share
        </button>
        <Dialog open={open} onClose={handleClose}>
          <div className="flex">
            <FacebookShareButton url="www.google.com">
              <FacebookIcon size={50} round={true} />
            </FacebookShareButton>
            <LinkedinShareButton url="www.google.com">
              <LinkedinIcon size={50} round={true} />
            </LinkedinShareButton>
            <TwitterShareButton url="www.google.com">
              <TwitterIcon size={50} round={true} />
            </TwitterShareButton>
            <EmailShareButton url="www.google.com">
              <EmailIcon size={50} round={true} />
            </EmailShareButton>
            <WhatsappShareButton url="www.google.com">
              <WhatsappIcon size={50} round={true} />
            </WhatsappShareButton>
          </div>
        </Dialog>
        <p className="sans-serif text-gray-700">
          {blog && moment(blog.added_at).format('MMM DD, YYYY')}
        </p>
        <h2 className="capitalize text-4xl sans-serif mb-2">{blog.title}</h2>

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
                className="text-indigo-600 hover:text-indigo-800 leading-normal text-sm no-underline capitalize"
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
                className="bg-gray-300 hover:bg-blue-500 hover:text-white leading-normal text-sm no-underline sans-serif rounded px-2 py-1 mr-2"
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
