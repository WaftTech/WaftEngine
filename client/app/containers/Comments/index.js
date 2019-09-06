/**
 *
 * Comments
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

// @material
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import {
  makeSelectComment,
  makeSelectCommentLoading,
  makeSelectOne,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const key = 'comments';

export const Comments = props => {
  const { loading, comments } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  if (nextProps.blog._id !== this.props.blog._id) {
    nextProps.loadCommentRequest(nextProps.blog._id);
    nextProps.setOneValue({ key: 'blog_id', value: nextProps.blog._id });
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
    this.setState({ open: true });
    this.props.loadOneRequest(id);
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.clearOne();
  };

  handleDeleteComment = id => {
    this.props.deleteCommentRequest(id);
  };

  return (
    <div>
      <h2 className="mt-4" htmlFor="comment">
        Comments({comments.totaldata})
      </h2>

      <div className="mt-2 p-4 shadow relative rounded pb-10 border border-gray-500 mb-10">
        <textarea
          className="appearance-none w-full outline-none resize-none"
          name="comment"
          id="comments"
          rows="5"
          placeholder="Write your comment"
          value={this.state.open ? '' : one.title}
          onChange={this.handleComment('title')}
        />
        <button
          className="absolute right-0 bottom-0 mr-1 mb-1 py-2 px-6 rounded mt-4 text-sm text-white bg-blue-600 hover:bg-blue-700 btn-theme"
          onClick={this.handlePostComment}
        >
          Submit
        </button>
      </div>

      {comments &&
        comments.comment &&
        comments.comment.map(each => (
          <div key={each._id}>
            <div className="flex py-4 border-b border-dotted sans-serif">
              <img src={user} alt="username" />
              <div className="pl-4 flex1">
                <h5 className="font-bold">
                  {typeof each.added_by === 'string' &&
                    each.added_by === user.id
                    ? user.name
                    : each.added_by.name}
                </h5>
                <p>{each.title}</p>
                {(typeof each.added_by === 'string' &&
                  each.added_by === user.id) ||
                  each.added_by._id === user.id ? (
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
          </div>
        ))}
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="comment-edit-dialog"
      >
        <DialogTitle id="comment-edit-dialog">
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
              className="py-2 px-6 rounded mt-4 text-sm text-white bg-blue-600 hover:bg-blue-700 btn-theme"
              onClick={this.handlePostComment}
            >
              Save
            </button>
          </div>
        </DialogTitle>
      </Dialog>
    </div>
  );
};

Comments.propTypes = {
  loading: PropTypes.bool.isRequired,
  comments: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  comments: makeSelectComments(),
  one: makeSelectOne(),
  loading: makeSelectArchiveLoading(),
});

const mapDispatchToProps = dispatch => ({
  loadArchive: payload => dispatch(loadCommentsRequest(payload)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(Comments);
