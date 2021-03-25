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
import BarChart from './Charts/BarChart';
import PieChart from './Charts/PieChart';

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

  convertAuthorData = data => {
    let newData = [];
    if (data.length > 0) {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let obj = {
          Author: element.author,
          amt: element.amt,
        };
        newData.push(obj);
      }
    }
    return newData;
  };

  convertRolesData = data => {
    let newData = [];
    if (data.length > 0) {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let obj = {
          name: element.role_title,
          count: element.count,
        };
        newData.push(obj);
      }
    }
    return newData;
  };

  convertRegisterData = data => {
    let newData = [];
    if (data.length > 0) {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let obj = {
          name: element._id,
          count: element.amt,
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
        <div className="border bg-white rounded p-4 my-3">
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
        <div className="grid grid-cols-2 gap-4">
          <div className="border bg-white rounded">
            <h3 className="px-4 py-2 text-lg border-b">Roles </h3>
            <div className="flex flex-wrap justify-between mx-4">
              {users && users.data && users.data.role && (
                <PieChart
                  dataKey="count"
                  nameKey="name"
                  data={this.convertRolesData(users.data.role)}
                />
              )}
            </div>
          </div>
          <div className="border bg-white rounded">
            <h3 className="px-4 py-2 text-lg border-b">Sign Ups</h3>
            <div className="flex flex-wrap justify-between mx-4">
              {userByRegister && (
                <PieChart
                  dataKey="count"
                  nameKey="name"
                  data={this.convertRegisterData(userByRegister)}
                />
              )}
            </div>
          </div>

          <div className="border bg-white rounded">
            <h3 className="px-4 py-2 text-lg border-b">Blogs </h3>
            <div className="flex flex-wrap justify-between mx-4">
              {blogsByUser.blog && blogsByUser.blog.length ? (
                <BarChart
                  data={this.convertAuthorData(blogsByUser.blog)}
                  key1="amt"
                  XAxisKey="Author"
                />
              ) : (
                <div className="flex justify-between">
                  <h2 className="w-full m-auto h-full font-bold text-red-500">
                    No Blogs
                  </h2>
                </div>
              )}
            </div>
          </div>

          <div className="border bg-white rounded">
            <h3 className="px-4 py-2 text-lg border-b">Recent Users</h3>
            <div className="flex flex-wrap justify-between mx-4">
              {recentUser &&
                recentUser.map(each => (
                  <div key={each.email} className="flex border-b py-2">
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                      {each.image && each.image.path ? (
                        <img
                          src={`${IMAGE_BASE}${each.image.path}`}
                          className="w-8 h-8 rounded-full overflow-hidden"
                        />
                      ) : (
                        <FaUser className="text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1 pl-5">
                      <h4 className="mb-0">{`${each.name}`}:</h4>
                      <span className="text-sm text-gray-500">
                        {each.email}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="col-span-2 border bg-white rounded">
            <h3 className="px-4 py-2 text-lg border-b">Users by Days </h3>
            <div className="flex flex-wrap justify-between mx-4">
              <LineChart
                data={this.convertDateData(userByDays)}
                XAxisKey="date"
                Line1Key="users"
              />
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
