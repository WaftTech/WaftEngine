import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeSelectContent } from '../../containers/App/selectors';
import { loadContentRequest } from '../../containers/App/actions';

/* eslint-disable react/no-danger */
class StaticContent extends React.Component {
  static propTypes = {
    contentKey: PropTypes.string.isRequired,
    loadContent: PropTypes.func.isRequired,
    contentObj: PropTypes.object.isRequired,
  };

  componentDidMount() {
    if (this.props.contentObj[this.props.contentKey]) {
      return;
    }
    this.props.loadContent(this.props.contentKey);
  }

  render() {
    const { contentObj } = this.props;

    if (!contentObj[this.props.contentKey]) return null; // maybe add a loader here
    return (
      <div
        dangerouslySetInnerHTML={{ __html: contentObj[this.props.contentKey] }}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  contentObj: makeSelectContent(),
});

const mapDispatchToProps = dispatch => ({
  loadContent: payload => dispatch(loadContentRequest(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(StaticContent);
