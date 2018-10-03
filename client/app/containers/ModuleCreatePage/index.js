/**
 *
 * ModuleCreatePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectModuleCreatePage from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class ModuleCreatePage extends React.Component {
  render() {
    return <div>
      <form>
        <textarea />
        <textarea />
        <input />
        <input />
        <input type="checkbox" />
        <button>Preview</button>
        <button>Save</button>
      </form>
    </div>;
  }
}

ModuleCreatePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  modulecreatepage: makeSelectModuleCreatePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'moduleCreatePage', reducer });
const withSaga = injectSaga({ key: 'moduleCreatePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ModuleCreatePage);
