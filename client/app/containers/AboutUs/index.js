import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectAboutUs } from './selectors';
import { loadAboutUsRequest } from './actions';
import saga from './saga';
import StaticContentDiv from '../../components/StaticContentDiv';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import injectReducer from 'utils/injectReducer';

class Greeting extends React.Component {
  componentDidMount() {
    this.props.loadAboutUs();
  }
  render() {
    const { aboutUs } = this.props;
    const aboutUsObj = aboutUs.toJS();
    return (
      <div className="container">
        <StaticContentDiv contentKey="aboutusheader" />
      
      </div>
    );
  }
}
const withReducer = injectReducer({ key: 'aboutUs', reducer });
const withSaga = injectSaga({ key: 'aboutUs', saga });

const mapStateToProps = createStructuredSelector({
  aboutUs: makeSelectAboutUs(),
});

const mapDispatchToProps = dispatch => ({
  loadAboutUs: () => dispatch(loadAboutUsRequest()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Greeting);
