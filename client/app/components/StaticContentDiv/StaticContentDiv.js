import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  makeSelectContent,
  makeSelectUserIsAdmin,
} from '../../containers/App/selectors';
import { loadContentRequest } from '../../containers/App/actions';
import { IMAGE_BASE } from '../../containers/App/constants';

/* eslint-disable react/no-danger */
class StaticContent extends React.PureComponent {
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
    const { contentObj, is_Admin } = this.props;

    if (!contentObj[this.props.contentKey]) return null; // maybe add a loader here
    return (
      <>
        {/* should be super admin */}
        {is_Admin && (
          <Link
            to={`/admin/content-manage/edit/${this.props.contentKey}`}
            target="_blank"
          >
            <button className="underline text-blue-600">Edit</button>
          </Link>
        )}
        {contentObj &&
          contentObj.image &&
          contentObj.image[this.props.contentKey].path && (
            <div>
              <img
                src={`${IMAGE_BASE}${
                  contentObj.image[this.props.contentKey].path
                }`}
              />
            </div>
          )}
        <div
          dangerouslySetInnerHTML={{
            __html: contentObj[this.props.contentKey],
          }}
        />
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  contentObj: makeSelectContent(),
  is_Admin: makeSelectUserIsAdmin(),
});

const mapDispatchToProps = dispatch => ({
  loadContent: payload => dispatch(loadContentRequest(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(StaticContent);
