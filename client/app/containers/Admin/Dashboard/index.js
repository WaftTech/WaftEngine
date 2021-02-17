/**
 *
 * Dashboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectErrors,
  makeSelectUsers,
  makeSelectInfo,
  makeSelectBlog,
  makeSelectUserByRegister,
  makeSelectBlogsByUser,
  makeSelectRecentUser,
  makeSelectUserByDays,
} from './selectors';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import PageHeader from '../../../components/PageHeader/PageHeader';
import LinkBoth from '../../../components/LinkBoth';
import Dialog from '../../../components/Dialog/index';

import {
  FaStickyNote,
  FaExclamationCircle,
  FaUser,
  FaNewspaper,
} from 'react-icons/fa';

import LineChart from './Charts/LineChart';

/* eslint-disable react/prefer-stateless-function */
export class Dashboard extends React.PureComponent {
  componentDidMount() {
    this.props.loadUserRequest();
    this.props.loadErrorRequest();
    this.props.loadInfoRequest();
    this.props.loadBlogRequest();
    this.props.loadUserByRegisterRequest();
    this.props.loadBlogsByUserRequest();
    this.props.loadRecentUserRequest();
    this.props.loadUserByDaysRequest();
  }

  state = { open: false };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  convertDateData = dates => {
    let newData = [];
    if (dates.length > 0) {
      for (let index = 0; index < dates.length; index++) {
        const element = dates[index];
        let obj = {
          date: `${element._id}/${element.month}/${element.day}`,
          users: element.amt,
        };
        newData.push(obj);
      }
    }
    return newData;
  };

  render() {
    const {
      classes,
      users,
      info,
      errors,
      blogs,
      userByRegister,
      blogsByUser,
      recentUser,
      userByDays,
    } = this.props;

    return (
      <>
        <div className="flex justify-between my-3">
          <PageHeader>Dashboard </PageHeader>
        </div>
        <div className="bg-white rounded p-4">
          {info.map(each => (
            <div key={each._id}>
              <h3 className="border-b text-2xl font-bold border-gray-300 pb-2">
                {each.title}
              </h3>
              <div
                className="mt-2 flex flex-wrap justify-between p-4 rounded"
                dangerouslySetInnerHTML={{ __html: each.detail }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mx-8 my-4">
          <div className="w-1/4 -ml-8 bg-white rounded p-5 text-center hover:text-black">
            <LinkBoth
              to="/admin/blog-manage/add/"
              className="text-gray-800 no-underline hover:text-black font-bold"
            >
              <FaStickyNote className="text-5xl mx-auto" />
              <div className="mt-1">Write Post</div>
            </LinkBoth>
          </div>
          <div className="w-1/4 bg-white rounded p-5 text-center hover:text-black">
            <LinkBoth
              className="text-gray-800 no-underline hover:text-black font-bold"
              to="https://waftengine.org/documentation"
              target="_blank"
            >
              <FaNewspaper className="text-5xl mx-auto" />
              <div className="mt-1">View Doc</div>
            </LinkBoth>
          </div>
          <div className="w-1/4 bg-white rounded p-5 flex justify-between hover:text-black">
            <span className="text-gray-800 m-auto w-24 text-center font-bold">
              <FaUser className="text-5xl mx-auto" />
              <div className="mt-1">Total Users</div>
            </span>
            <span className="m-auto inline-block text-black text-2xl font-bold ml-4 w-8 h-8 text-center rounded-full bg-waftprimary-light leading-loose">
              {users.totaldata}
            </span>
          </div>
          <div className="w-1/4 -mr-8 bg-white rounded p-5 flex justify-between hover:text-black">
            <span className="text-gray-800 m-auto w-24 text-center font-bold">
              <FaExclamationCircle className="text-5xl mx-auto" />
              <div className="mt-1">Total Errors</div>
            </span>
            <span className="m-auto inline-block text-black text-2xl font-bold ml-4 w-8 h-8 text-center rounded-full bg-waftprimary-light leading-loose">
              {errors.totaldata}
            </span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mx-4 my-4">
            <div className="w-1/2 -ml-4 bg-white rounded pb-4">
              <h3 className="p-4 font-bold text-2xl border-b border-gray-300">
                By Roles{' '}
              </h3>
              <div className="flex flex-wrap justify-between mx-4">
                {users &&
                  users.data &&
                  users.data.role &&
                  users.data.role.map(each => (
                    <div
                      key={each._id}
                      className="w-1/2 p-2 bg-gray-200 my-2 -ml-2 -mr-2 rounded"
                    >
                      <div className="flex justify-between px-2 h-10 items-center">
                        <span>{each.role_title}: </span>
                        <span className="inline-block text-waftprimary text-2xl text-right font-bold">
                          {each.count}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="w-1/2 -mr-4 bg-white rounded pb-4">
              <h3 className="p-4 font-bold text-2xl border-b border-gray-300">
                By Types{' '}
              </h3>
              <div className="flex flex-wrap justify-between mx-4">
                {errors.data && errors.data.length ? (
                  errors.data.map(each => (
                    <div
                      key={each._id}
                      className="w-1/2 p-2 bg-gray-200 my-2 -ml-2 -mr-2 rounded"
                    >
                      <div className="flex justify-between h-10 items-center px-2">
                        <span className="w-24 text-sm">{each._id}</span>
                        <span className="inline-block text-waftprimary font-bold text-2xl text-right ">
                          {each.count}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-between">
                    <h2 className="w-full m-auto h-full text-xl font-bold text-red-500">
                      No Errors
                    </h2>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mx-4 my-4">
            <div className="w-1/2 -ml-4 bg-white rounded pb-4">
              <h3 className="p-4 font-bold text-2xl border-b border-gray-300">
                By Registration method
              </h3>
              <div className="flex flex-wrap justify-between mx-4">
                {userByRegister &&
                  userByRegister.map(each => (
                    <div
                      key={each._id}
                      className="w-1/2 p-2 bg-gray-200 my-2 -ml-2 -mr-2 rounded"
                    >
                      <div className="flex justify-between px-2 h-10 items-center">
                        <span>{`${each._id}`}: </span>
                        <span className="inline-block text-waftprimary text-2xl text-right font-bold">
                          {each.amt}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="w-1/2 -mr-4 bg-white rounded pb-4">
              <h3 className="p-4 font-bold text-2xl border-b border-gray-300">
                Blogs by Users{' '}
              </h3>
              <div className="flex flex-wrap justify-between mx-4">
                {blogsByUser.blog && blogsByUser.blog.length ? (
                  blogsByUser.blog.map(each => (
                    <div
                      key={each._id}
                      className="w-1/2 p-2 bg-gray-200 my-2 -ml-2 -mr-2 rounded"
                    >
                      <div className="flex justify-between h-10 items-center px-2">
                        <span className="w-24 text-sm">{each.author}</span>
                        <span className="inline-block text-waftprimary font-bold text-2xl text-right ">
                          {each.amt}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-between">
                    <h2 className="w-full m-auto h-full text-xl font-bold text-red-500">
                      No Blogs
                    </h2>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mx-4 my-4">
            <div className="w-1/2 -ml-4 bg-white rounded pb-4">
              <h3 className="p-4 font-bold text-2xl border-b border-gray-300">
                Recent users
              </h3>
              <div className="flex flex-wrap justify-between mx-4">
                {recentUser &&
                  recentUser.map(each => (
                    <div
                      key={each.email}
                      className="w-1/2 p-2 bg-gray-200 my-2 -ml-2 -mr-2 rounded"
                    >
                      <div className="flex justify-between px-2 h-10 items-center">
                        {`${each.name}`}:{each.email}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="w-1/2 -mr-4 bg-white rounded pb-4">
              <h3 className="p-4 font-bold text-2xl border-b border-gray-300">
                Users by days{' '}
              </h3>
              <div className="flex flex-wrap justify-between mx-4">
                <LineChart
                  data={this.convertDateData(userByDays)}
                  XAxisKey="date"
                  Line1Key="users"
                />
              </div>
            </div>
          </div>
        </div>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          title={<h2> Demo Dialog </h2>}
          body={
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          }
          actions={
            <button
              type="button"
              className="bg-red-400 p-2 text-white"
              onClick={this.handleClose}
            >
              Close
            </button>
          }
        />
      </>
    );
  }
}
Dashboard.propTypes = {
  loadUserRequest: PropTypes.func.isRequired,
  loadErrorRequest: PropTypes.func.isRequired,
  loadInfoRequest: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  info: PropTypes.array.isRequired,
  blogs: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  users: makeSelectUsers(),
  errors: makeSelectErrors(),
  info: makeSelectInfo(),
  blogs: makeSelectBlog(),
  userByRegister: makeSelectUserByRegister(),
  blogsByUser: makeSelectBlogsByUser(),
  recentUser: makeSelectRecentUser(),
  userByDays: makeSelectUserByDays(),
});

const withConnect = connect(mapStateToProps, { ...mapDispatchToProps, push });

const withReducer = injectReducer({ key: 'adminDashboard', reducer });
const withSaga = injectSaga({ key: 'adminDashboard', saga });

export default compose(withReducer, withSaga, withConnect)(Dashboard);
