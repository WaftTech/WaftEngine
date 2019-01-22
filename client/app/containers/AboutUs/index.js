import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectAboutUs } from './selectors';
import { loadAboutUsRequest } from './actions';
import saga from './saga';
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
        {/* <h1>About Us</h1>
        <p>
          This website aims to list all offers and deals applicable in Nepal. This product is
          brought to you by <a href="https://www.wafttech.com">WaftTech</a>.
        </p> */}
        {aboutUsObj.Description && (
          <div dangerouslySetInnerHTML={{ __html: aboutUsObj.Description }} />
        )}
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
