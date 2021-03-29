import PropTypes from 'prop-types';
import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { loadContentRequest } from '../../containers/App/actions';
import { IMAGE_BASE } from '../../containers/App/constants';
import {
  makeSelectContent,
  makeSelectUserIsAdmin
} from '../../containers/App/selectors';
import './module.css';

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
        {is_Admin &&
          contentObj &&
          contentObj.ids &&
          contentObj.ids[this.props.contentKey] &&
          (contentObj &&
            contentObj.is_page &&
            contentObj.is_page[this.props.contentKey] === false ? (
              <Link
                to={`/admin/section-content/edit/${contentObj.ids[this.props.contentKey]
                  }`}
                target="_blank"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-white shadow rounded-full absolute text-gray-600 hover:text-primary">
                  <FaEdit className="text-sm" title="Edit" />
                </div>
              </Link>
            ) : (
              <Link
                to={`/admin/page-content/edit/${contentObj.ids[this.props.contentKey]
                  }`}
                target="_blank"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-white shadow rounded-full absolute text-gray-600 hover:text-primary">
                  <FaEdit className="text-sm" title="Edit" />
                </div>
              </Link>
            ))}
        {contentObj &&
          contentObj.image &&
          contentObj.image[this.props.contentKey] &&
          contentObj.image[this.props.contentKey].path && (
            <div>
              <img
                src={`${IMAGE_BASE}${contentObj.image[this.props.contentKey].path
                  }`}
              />
            </div>
          )}
        <div
          className="ckEditor"
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
