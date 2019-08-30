/**
 *
 * BlogPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

//@material
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as mapDispatchToProps from './actions';
import {
  makeSelectBlog,
  makeSelectLoading,
  makeSelectOne,
  makeSelectComment,
} from './selectors';
import { makeSelectUser } from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import { IMAGE_BASE } from '../App/constants';
import Loading from '../../components/Loading';
import RecentBlogs from './components/RecentBlogs';
import RelatedBlogs from './components/RelatedBlogs';
import Archives from './components/Archives';
import LinkBoth from '../../components/LinkBoth';

export class BlogPage extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    loadBlogRequest: PropTypes.func.isRequired,
    loadRecentBlogsRequest: PropTypes.func.isRequired,
    blog: PropTypes.shape({}).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        slug_url: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    open: false,
  };

  componentDidMount() {
    this.props.clearOne();
    this.props.loadRecentBlogsRequest();
    this.props.loadArchivesRequest();
    this.props.loadRelatedBlogsRequest(this.props.match.params.slug_url);
    this.props.loadBlogRequest(this.props.match.params.slug_url);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.slug_url !== this.props.match.params.slug_url) {
      this.props.loadRelatedBlogsRequest(nextProps.match.params.slug_url);
      this.props.loadBlogRequest(nextProps.match.params.slug_url);
    }
    if (nextProps.blog._id !== this.props.blog._id) {
      nextProps.loadCommentRequest(nextProps.blog._id);
      nextProps.setOneValue({key: 'blog_id', value: nextProps.blog._id});
    }
  }

  handleNewComment = () => {
    console.log('new comment recieved');
  };

  handleComment = name => e => {
    e.persist();
    this.props.setOneValue({ key: name, value: e.target.value });
  };

  handlePostComment = () => {
    this.props.postCommentRequest();
    this.setState({ open: false });
  };

  handleEditComment = id => {
    this.setState({ open: true});
    this.props.loadOneRequest(id);
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.clearOne();
  };

  handleDeleteComment = (id) => {
    this.props.deleteCommentRequest(id);
  };

  render() {
    const { blog, loading, location, match, one, comments, user } = this.props;
    console.log(blog, 'blog');
    if (loading) {
      return <Loading />;
    }
    return (
      <>
        <Helmet>
          <title>{blog.title}</title>
        </Helmet>
        <div className="container mx-auto my-10 px-5">
          <div className="flex flex-wrap w-full lg:-mx-5">
            <div className="w-full lg:w-3/4 lg:px-5">
              <h2 className="capitalize">
                <span>{blog.title}</span>
              </h2>
              <br />
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
              <br />
              <div dangerouslySetInnerHTML={{ __html: blog.description }} />
              <br />
              {blog && blog.tags && blog.tags.length > 0 && (
                <div>
                  Tags:{' '}
                  {blog.tags.map((each, index) => (
                    <LinkBoth
                      className="text-blue hover:text-waftprimary leading-normal text-base no-underline"
                      key={index}
                      to={`/blog/tag/${each}`}
                    >
                      {`${index === 0 ? '' : ', '}${each}`}
                    </LinkBoth>
                  ))}
                </div>
              )}
              <br />
              {blog && blog.author && (
                <div>
                  Authored By:{' '}
                  <LinkBoth
                    className="text-blue hover:text-waftprimary leading-normal text-base no-underline"
                    to={`/blog/author/${blog.author._id}`}
                  >
                    {blog.author.name}
                  </LinkBoth>
                </div>
              )}
              <br />
              {blog && blog.category && blog.category.length > 0 && (
                <div>
                  Categorized By:{' '}
                  {blog.category.map((each, index) => (
                    <LinkBoth
                      className="text-blue hover:text-waftprimary leading-normal text-base no-underline"
                      key={index}
                      to={`/blog-category/${each.slug_url}`}
                    >
                      {`${index === 0 ? '' : ', '}${each.title}`}
                    </LinkBoth>
                  ))}
                </div>
              )}
              <br />
              <div>
                <label htmlFor="comment">Comments({comments.totaldata})</label>
                {comments &&
                  comments.comment &&
                  comments.comment.map(each => (
                    <div key={each._id}>
                      <div className="font-bold mt-4">{typeof each.added_by === 'string' && each.added_by === user.id ? user.name : each.added_by.name}</div>
                      <div className="flex">
                        <div>{each.title}</div>
                        {(typeof each.added_by === 'string' && each.added_by === user.id || each.added_by._id === user.id) ? (
                          <div>
                            <button
                              className="ml-8 text-gray"
                              onClick={() => this.handleEditComment(each._id)}
                            >
                              Edit
                            </button>
                            <button
                              className="ml-2 text-gray"
                              onClick={() => this.handleDeleteComment(each._id)}
                            >
                            Delete
                          </button>
                        </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  ))}
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="comment-edit-dialog"
                >
                  <DialogTitle
                    id="comment-edit-dialog"
                  >
                  <div>
                    <textarea
                      name="edit-comment"
                      id="edit_comments"
                      cols="45"
                      rows="5"
                      value={one.title}
                      onChange={this.handleComment('title')}
                    />
                    <button
                      className="text-white py-2 px-4 rounded mt-4 btn-waft"
                      onClick={this.handlePostComment}
                    >
                      Save
                    </button>
                  </div>
                  </DialogTitle>
                </Dialog>
                <div className="mt-2">
                  <textarea
                    name="comment"
                    id="comments"
                    cols="45"
                    rows="5"
                    placeholder="Your comment here"
                    value={this.state.open ? '' : one.title}
                    onChange={this.handleComment('title')}
                  />
                </div>
                <button
                  className="text-white py-2 px-4 rounded mt-4 btn-waft"
                  onClick={this.handlePostComment}
                >
                  post
                </button>
              </div>
            </div>

            <div className="w-full mt-4 lg:mt-0 lg:w-1/4 bg-gray-400 p-3 border rounded">
              <RecentBlogs />
              <RelatedBlogs />
              <Archives />
            </div>
          </div>
        </div>
      </>
    );
  }
}

const withReducer = injectReducer({ key: 'blogPage', reducer });
const withSaga = injectSaga({ key: 'blogPage', saga });

const mapStateToProps = createStructuredSelector({
  blog: makeSelectBlog(),
  loading: makeSelectLoading(),
  one: makeSelectOne(),
  comments: makeSelectComment(),
  user: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BlogPage);
