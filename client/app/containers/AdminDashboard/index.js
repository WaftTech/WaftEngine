/**
 *
 * AdminDashboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { compose } from 'redux';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectErrors,
  makeSelectUsers,
  makeSelectInfo,
  makeSelectBlog,
} from './selectors';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import PageHeader from '../../components/PageHeader/PageHeader';
import PageContent from '../../components/PageContent/PageContent';
import LinkBoth from '../../components/LinkBoth';

/* eslint-disable react/prefer-stateless-function */
export class AdminDashboard extends React.PureComponent {
  componentDidMount() {
    this.props.loadUserRequest();
    this.props.loadErrorRequest();
    this.props.loadInfoRequest();
    this.props.loadBlogRequest();
  }

  render() {
    const { users, info, errors, blogs } = this.props;
    return (
      <>
       <div className="flex justify-between mt-3 mb-3">
        <PageHeader>Dashboard</PageHeader>
        </div>
      
        
              {info.map(each => (
                <div key={each._id}>
                  <h4>{each.title}</h4>
                  <div dangerouslySetInnerHTML={{ __html: each.detail }} />
                </div>
              ))}
         
              <div>
                {blogs.map(each => (
                  <LinkBoth
                    key={each._id}
                    to={`https://www.waftengine.org/blog/${each._id}`}
                    // to={`localhost:5120/api/blog/${each._id}`}
                    target="_blank"
                  >
                    <div>
                      <h4>{each.title}</h4>
                    </div>
                  </LinkBoth>
                ))}
              </div>
         
        
              <div className="flex justify-between mx-8">
                <div className="w-1/4 -ml-8 bg-white rounded p-10">
                <LinkBoth to="/admin/blog-manage/add/">Write Post</LinkBoth></div>
                <div className="w-1/4 -ml-4 bg-white rounded p-10"><LinkBoth
                  to="https://www.waftengine.org/documentation"
                  target="_blank"
                >
                  Click documentation to get started
                </LinkBoth>
                </div>
                <div className="w-1/4 -ml-4 -mr-4 bg-white rounded p-10 flex justify-between"><span className="m-auto w-24">Total users </span><span className="m-auto inline-block text-waftprimary text-2xl text-right font-bold ml-4">{users.totaldata}</span></div>
                <div className="w-1/4 -mr-8 bg-white rounded p-10 flex justify-between"><span className="m-auto w-24">Total errors</span> <span className="m-auto inline-block text-waftprimary text-2xl text-right font-bold ml-4">{errors.totaldata}</span></div>
              </div>
         

          <div>
        
          <div className="flex justify-between mx-4 my-4">
                  <div className="w-1/2 -ml-4 bg-white rounded pb-4">
                    <h3 className="p-4 border-b border-grey-lighter">By Roles </h3>
                    <div className="flex flex-wrap justify-between mx-4">
                    {users.data.map(each => (
                     
                      <div key={each._id} className="w-1/2 p-2 bg-grey-lighter my-2 -ml-2 -mr-2 rounded">
                        <div className="flex justify-center text-center h-10"><span className="m-auto w-24">{each.roles.role_title} </span><span className="m-auto inline-block text-waftprimary text-2xl text-right font-bold ml-4">{each.count}</span></div>
                      </div>
                     
                    ))}
                     </div>
                  </div>
               
                
                  <div className="w-1/2 -mr-4 bg-white rounded pb-4">
                   
                    <h3 className="p-4 border-b border-grey-lighter">By Types </h3>
                    <div className="flex flex-wrap justify-between mx-4">
                    {errors.data.map(each => (
                      <div key={each._id} className="w-1/2 p-2 bg-grey-lighter my-2 -ml-2 -mr-2 rounded">
                        <div className="flex justify-between text-center h-10"><span className="m-auto w-24">{each._id} </span><span className="m-auto inline-block text-waftprimary font-bold text-2xl text-right ml-4">{each.count}</span></div>
                      </div>
                    ))}
                  </div>
                  </div>
                  </div>
            
          </div>
       
      </>
    );
  }
}
AdminDashboard.propTypes = {
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
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withReducer = injectReducer({ key: 'adminDashboard', reducer });
const withSaga = injectSaga({ key: 'adminDashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminDashboard);
