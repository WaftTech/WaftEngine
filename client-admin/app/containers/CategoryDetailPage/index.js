/**
 *
 * CategoryDetailPage
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectReducer from "utils/injectReducer";
import injectSaga from "utils/injectSaga";
import { IMAGE_BASE } from "containers/App/constants";
import noImage from "assets/img/logo.svg";
import { loadCategoryRequest } from "./actions";
import { makeSelectCategory, makeSelectOrganization } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";

/* eslint-disable react/prefer-stateless-function */
export class CategoryDetailPage extends React.Component {
  componentDidMount() {
    const {
      params: { slug }
    } = this.props.match;
    this.props.loadCategory(slug);
  }
  render() {
    const { category, organization } = this.props;
    const categoryObj = category.toJS();
    const organizationObj = organization.toJS();
    const categoryImage =
      (categoryObj.CategoryImage &&
        categoryObj.CategoryImage.path &&
        `${IMAGE_BASE}${categoryObj.CategoryImage.path}`) ||
      noImage;
    return (
      <div className="container">
        <br />
        <br />
        <br />
        <h2>{categoryObj.CategoryName}</h2>

        <div className="img">
          <img src={categoryImage} />
        </div>
        <div className="organization">
          {organizationObj.map(each => (
            <div key={each._id}>
              <h4>
                <Link to={`/organization/${each.slug}`}>
                  {each.Organization}
                </Link>
              </h4>
              <div
                dangerouslySetInnerHTML={{ __html: each.AboutOrganization }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

CategoryDetailPage.propTypes = {
  loadCategory: PropTypes.func.isRequired
};

const withReducer = injectReducer({ key: "categoryDetailPage", reducer });
const withSaga = injectSaga({ key: "categoryDetailPage", saga });

const mapStateToProps = createStructuredSelector({
  category: makeSelectCategory(),
  organization: makeSelectOrganization()
});

const mapDispatchToProps = dispatch => ({
  loadCategory: id => dispatch(loadCategoryRequest(id))
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect
)(CategoryDetailPage);
