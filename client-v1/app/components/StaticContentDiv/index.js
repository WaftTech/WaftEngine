import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeSelectContent } from '../../containers/App/selectors';
import { loadContentRequest } from '../../containers/App/actions';

class StaticContent extends React.Component {
  componentDidMount() {
    this.props.loadContent(this.props.contentKey);
  }

  render() {
    const { staticcontent } = this.props;
    const contentObj = staticcontent.toJS();

    if (!contentObj[this.props.contentKey]) return null;
    return <div dangerouslySetInnerHTML={{ __html: contentObj[this.props.contentKey] }} />;
  }
}
StaticContent.propTypes = {
  loadContent: PropTypes.func.isRequired /*  */,
  staticcontent: PropTypes.object,
  contentKey: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  staticcontent: makeSelectContent(),
});

const mapDispatchToProps = dispatch => ({
  loadContent: payload => dispatch(loadContentRequest(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(StaticContent);
