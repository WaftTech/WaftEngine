/**
 *
 * LoginForm
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import QueueAnim from 'rc-queue-anim';
import styled from 'styled-components';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import backgroundImage from 'assets/images-demo/covers/riccardo-oliva-231656-unsplash-cut-progressive.jpg';
import reducer from './reducer';
import saga from './saga';
import LoginForm2 from './components/LoginForm2';

const BackgorundImageDiv = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
`;

const FormCard = () => (
  <section className="form-card-page form-card row no-gutters">
    <BackgorundImageDiv className="form-card__img form-card__img--left col-lg-6" />
    <div className="form-card__body col-lg-6 p-5 px-lg-8 d-flex align-items-center">
      <LoginForm2 />
    </div>
  </section>
);

/* eslint-disable react/prefer-stateless-function */
export class LoginForm extends React.Component {
  render() {
    return (
      <QueueAnim type="bottom" className="ui-animate">
        <div>
          <FormCard />
        </div>
      </QueueAnim>
    );
  }
}

LoginForm.propTypes = {};

const mapStateToProps = createStructuredSelector({});

// const mapDispatchToProps = dispatch => ({

// });

const withConnect = connect(
  mapStateToProps,
  // mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'loginForm', reducer });
const withSaga = injectSaga({ key: 'loginForm', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginForm);
