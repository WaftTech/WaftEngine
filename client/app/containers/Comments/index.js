import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { push } from 'connected-react-router';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import lid from '../../assets/img/lid.svg';
import avatar from '../../assets/img/user.svg';
import DeleteDialog from '../../components/DeleteDialog';
import { DATE_FORMAT } from '../App/constants';
import { makeSelectUser } from '../App/selectors';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectComment,
  makeSelectCommentLoading,
  makeSelectOne
} from './selectors';


const key = 'comments';

export const Comments = props => {
  const { commentLoading, comments, one, blog_id, user } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    props.clearOne();
    if (blog_id) {
      props.loadCommentRequest(blog_id);
    }
    props.setOneValue({ key: 'blog_id', value: blog_id });
  }, [blog_id]);

  const [open, setOpen] = useState(false);
  const [delOpen, setdelOpen] = useState(false);
  const [deleteId, setdeleteId] = useState('');

  const handleComment = name => e => {
    e.persist();
    props.setOneValue({ key: name, value: e.target.value });
  };

  const handlePostComment = () => {
    props.postCommentRequest();
    setOpen(false);
  };

  const handleEditComment = id => {
    setOpen(true);
    props.loadOneRequest(id);
  };

  const handleClose = () => {
    setOpen(false);
    props.clearOne();
  };

  const handledelOpen = id => {
    setdelOpen(true);
    setdeleteId(id);
  };

  const handledelClose = () => {
    setdelOpen(false);
  };

  const handleDeleteComment = id => {
    props.deleteCommentRequest(id);
    setdelOpen(false);
  };

  return commentLoading ? (
    <div class="circular_loader waftloader"></div>
  ) : (
      <div>
        <h2 className="mt-4" htmlFor="comment">
          Comments ({comments && comments.totaldata})
      </h2>
        <DeleteDialog
          open={delOpen}
          doClose={handledelClose}
          doDelete={() => handleDeleteComment(deleteId)}
        />
        <div className="mt-2 p-4 shadow relative rounded pb-10 border border-gray-500 mb-10">
          <textarea
            className="appearance-none w-full outline-none resize-none"
            name="comment"
            id="comments"
            rows="5"
            placeholder="Write your comment"
            value={open ? '' : one.title}
            onChange={handleComment('title')}
          />
          <button
            className="absolute right-0 bottom-0 mr-1 mb-1 py-2 px-6 rounded mt-4 text-sm text-white bg-primary uppercase btn-theme"
            onClick={handlePostComment}
          >
            Submit
        </button>
        </div>

        {comments &&
          comments.comment &&
          comments.comment.map(each => (
            <div key={each._id}>
              <div className="flex py-4 border-b border-dotted sans-serif">
                {/* <img src={(user && user.avatar) || null} alt="username" /> */}
                <img src={avatar} alt="" className="opacity-25 w-10 h-10" />
                <div className="pl-4 flex-1">
                  <div className="flex">
                    <div className="w-1/2">
                      <h5 className="text-sm font-bold">
                        {typeof each.added_by === 'string' &&
                          each.added_by === user.id
                          ? user.name
                          : each.added_by.name}
                      </h5>
                      <span className="text-xs">
                        {moment(each.added_at).format(DATE_FORMAT)}{' '}
                      </span>
                    </div>

                    {(typeof each.added_by === 'string' &&
                      each.added_by === user.id) ||
                      each.added_by._id === user.id ? (
                        <div className="flex">
                          <span
                            className="w-8 h-8 inline-flex justify-center items-center leading-none cursor-pointer hover:bg-blue-100 rounded-full relative edit-icon"
                            onClick={() => handleEditComment(each._id)}
                          >
                            <FaPencilAlt className="pencil" />
                            <span className="bg-blue-500 dash" />
                          </span>

                          <span
                            className="ml-4 w-8 h-8 inline-flex justify-center items-center leading-none cursor-pointer hover:bg-red-100 rounded-full relative trash-icon"
                            onClick={() => handledelOpen(each._id)}
                          >
                            <img className="trash-lid" src={lid} alt="trash-id" />
                            <span className="w-3 h-3 rounded-b-sm bg-red-500 mt-1" />
                          </span>
                        </div>
                      ) : (
                        ''
                      )}
                  </div>
                  <p>{each.title}</p>
                </div>
              </div>
            </div>
          ))}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="comment-edit-dialog"
        >
          <DialogTitle id="comment-edit-dialog">
            <div>
              <textarea
                name="edit-comment"
                id="edit_comment"
                cols="45"
                rows="5"
                value={one.title}
                onChange={handleComment('title')}
              />
              <button
                className="py-2 px-6 rounded mt-4 text-sm text-blue bg-primary uppercase btn-theme"
                onClick={handlePostComment}
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
  comments: PropTypes.object.isRequired,
  commentLoading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  one: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  comments: makeSelectComment(),
  one: makeSelectOne(),
  commentLoading: makeSelectCommentLoading(),
  user: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);
export default compose(withConnect)(Comments);
