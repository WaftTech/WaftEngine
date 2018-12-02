/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from "react";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { Button, Paper, Grid } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import {
  CalendarToday,
  LocationOn,
  Timelapse,
  Call,
  Email,
  OpenInNew
} from "@material-ui/icons";
import { IMAGE_BASE } from "containers/App/constants";
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import { loadFourorgRequest } from "./actions";
import { makeSelectFourorg } from "./selectors";
import { makeSelectCategories } from "./SearchComponent/selectors";
import reducer from "./reducer";
import saga from "./saga";
import SearchComponent from "./SearchComponent";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const dayMapper = {
  sunday: "sun",
  monday: "mon",
  tuesday: "tue",
  wednesday: "wed",
  thursday: "thur",
  friday: "fri",
  saturday: "sat"
};

const Masthead = styled.div`
  height: 350px;
  padding-top: 20px;
  color: #fff;
  margin-bottom: 50px;
  background-size: cover;
`;

const CategoryItem = styled.div`
  margin-bottom: 20px;
  margin-right: 20px;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  text-align: center;
  position: relative;


  .info {
    position: absolute;
    width: 100%;
    bottom: 10px;
    color: #fff;
  }
  h5 {
    margin-bottom: 0px;
  }
  .img {
    position: relative;
    transform: scale(1);
    transition: all 0.2s ease-in-out;
    height:150px;
  }
  img {
    max-width: 100%;
  }
  .img:before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    left:0; right:0; top:0; bottom:0;
    background-image: linear-gradient(
      -180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.69) 100%
    );
  }

  &:hover {
    cursor: pointer;
  }
  &:hover .img {
    transform: scale(1.1);makeSelectFourorg
  }
`;

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.Component {
  state = {
    value: 0
  };

  componentDidMount() {
    this.props.loadFourorg();
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleSearch = () => {
    this.props.history.push("/search-results");
  };
  render() {
    const { value } = this.state;
    const { categories, fourorg } = this.props;
    const categoriesObj = categories.toJS();
    const fourorgObj = fourorg.toJS();
    console.log(fourorgObj);
    return (
      <React.Fragment>
        <Masthead>
          <SearchComponent search={this.handleSearch} />
        </Masthead>
        <div className="container" />
      </React.Fragment>
    );
  }
}

const withReducer = injectReducer({ key: "homePage", reducer });
const withSaga = injectSaga({ key: "homePage", saga });

const mapStateToProps = createStructuredSelector({
  categories: makeSelectCategories(),
  fourorg: makeSelectFourorg()
});

const mapDispatchToProps = dispatch => ({
  loadFourorg: () => dispatch(loadFourorgRequest())
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
)(HomePage);
