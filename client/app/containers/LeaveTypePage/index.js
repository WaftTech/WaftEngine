import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import moment from "moment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Search from "@material-ui/icons/Search";

// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Button from "../../components/CustomButtons/Button";
import Table from "../../components/Table/Table";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";

import injectSaga from "../../utils/injectSaga";
import injectReducer from "../../utils/injectReducer";
import reducer from "./reducer";
import saga from "./saga";
import { loadAllRequest, deleteOneRequest } from "./actions";
import { makeSelectAll, makeSelectPage } from "./selectors";
import { FormattedMessage } from "react-intl";
import messages from "./messages";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
});

/* eslint-disable react/prefer-stateless-function */
export class LeaveType extends React.Component {
  state = {
    query: {},
    name: "",
    sortToggle: 0,
    sortSymbol: "D",
    page: 1,
    rowsPerPage: 10
  };
  componentDidMount() {
    this.props.loadAll({ query: {} });
  }

  handleQueryChange = e => {
    e.persist();
    this.setState(state => ({
      query: {
        ...state.query,
        [e.target.name]: e.target.value
      }
    }));
  };
  handleAdd = () => {
    this.props.history.push("/wt/leaveType-manage/add");
  };
  handleEdit = id => {
    this.props.history.push(`/wt/leaveType-manage/edit/${id}`);
  };
  handleDelete = id => {
    // shoe modal && api call
    this.props.deleteOne(id);
    // this.props.history.push(`/wt/link-manage/edit/${id}`);
  };
  handleSearch = () => {
    this.props.loadAll({
      query: this.state.query,
      page: this.state.page,
      rowsPerPage: this.state.rowsPerPage
    });
    this.setState({ query: {} });
  };

  leaveTypeSort = title => {
    if (!!this.state.sortToggle) {
      this.setState({ sortToggle: 0, sortSymbol: "D" }, () =>
        this.props.loadAll({
          sort: `${this.state.sortToggle}${title}`,
          page: this.state.page,
          rowsPerPage: this.state.rowsPerPage
        })
      );
    } else if (!this.state.sortToggle) {
      this.setState({ sortToggle: 1, sortSymbol: "A" }, () =>
        this.props.loadAll({
          sort: `${this.state.sortToggle}${title}`,
          page: this.state.page,
          rowsPerPage: this.state.rowsPerPage
        })
      );
    }
  };
  //Pagination
  handleChangePage = (event, page) => {
    this.setState({ page: page + 1 }, () => {
      this.props.loadAll({
        page: this.state.page,
        rowsPerPage: this.state.rowsPerPage
      });
    });
  };
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value }, () => {
      this.props.loadAll({
        // page: this.state.page,
        rowsPerPage: this.state.rowsPerPage
      });
    });
  };

  render() {
    const { classes, allLinks, pageItem } = this.props;
    const allLinksObj = allLinks.toJS();
    const pageObj = pageItem.toJS();
    const { page = 1, size = 10, totaldata = 20 } = pageObj;
    const tableData = allLinksObj.map(
      ({
        _id,
        LeaveName,
        LeaveNameNepali,
        NoOfDays,
        ApplicableGender,
        IsTransferrable,
        IsPaidLeave,
        IsReplacementLeave,
        ApplicableReligion,
        IsCarryOver
      }) => [
        LeaveName,
        LeaveNameNepali,
        NoOfDays,
        ApplicableGender,
        "" + IsTransferrable,
        "" + IsPaidLeave,
        "" + IsReplacementLeave,
        ApplicableReligion,
        IsCarryOver,

        <React.Fragment>
          <Tooltip
            id="tooltip-top"
            title="Edit Task"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              aria-label="Edit"
              className={classes.tableActionButton}
              onClick={() => this.handleEdit(_id)}
            >
              <Edit
                className={classes.tableActionButtonIcon + " " + classes.edit}
              />
            </IconButton>
          </Tooltip>
          <Tooltip
            id="tooltip-top-start"
            title="Remove"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              aria-label="Close"
              className={classes.tableActionButton}
              onClick={() => this.handleDelete(_id)}
            >
              <Close
                className={classes.tableActionButtonIcon + " " + classes.close}
              />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      ]
    );
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Search and Filter</h4>
              <GridContainer>
                <GridItem xs={4} sm={4} md={4}>
                  <TextField
                    name="LeaveName"
                    value={this.state.query.LeaveName || ""}
                    onChange={this.handleQueryChange}
                    margin="normal"
                    placeholder="Search By LeaveType"
                  />
                </GridItem>
                <GridItem xs={4} sm={4} md={4}>
                  <TextField
                    name="NoOfDays"
                    value={this.state.query.NoOfDays || ""}
                    onChange={this.handleQueryChange}
                    margin="normal"
                    placeholder="Search By Number Of Days"
                  />
                </GridItem>
                <GridItem xs={4} sm={4} md={4}>
                  <TextField
                    name="ApplicableGender"
                    value={this.state.query.ApplicableGender || ""}
                    onChange={this.handleQueryChange}
                    margin="normal"
                    placeholder="Search By Applicable Gender"
                  />
                </GridItem>
                <GridItem xs={4} sm={4} md={4}>
                  <TextField
                    name="IsTransferrable"
                    value={this.state.query.IsTransferrable || ""}
                    onChange={this.handleQueryChange}
                    margin="normal"
                    placeholder="Search By Is Transferrable"
                  />
                </GridItem>
                <GridItem xs={4} sm={4} md={4}>
                  <TextField
                    name="IsPaidLeave"
                    value={this.state.query.IsPaidLeave || ""}
                    onChange={this.handleQueryChange}
                    margin="normal"
                    placeholder="Search By Is Paid Leave"
                  />
                </GridItem>
                <GridItem xs={4} sm={4} md={4}>
                  <TextField
                    name="IsReplacementLeave"
                    value={this.state.query.IsReplacementLeave || ""}
                    onChange={this.handleQueryChange}
                    margin="normal"
                    placeholder="Search By Is Replacement Leave"
                  />
                </GridItem>
                <GridItem xs={4} sm={4} md={4}>
                  <TextField
                    name="ApplicableReligion"
                    value={this.state.query.ApplicableReligion || ""}
                    onChange={this.handleQueryChange}
                    margin="normal"
                    placeholder="Search By Applicable Religion"
                  />
                </GridItem>
                <GridItem xs={4} sm={4} md={4}>
                  <TextField
                    name="IsCarryOver"
                    value={this.state.query.IsCarryOver || ""}
                    onChange={this.handleQueryChange}
                    margin="normal"
                    placeholder="Search By Carry Over"
                  />
                </GridItem>
              </GridContainer>

              <Button
                color="primary"
                aria-label="edit"
                justIcon
                round
                onClick={this.handleSearch}
              >
                <Search />
              </Button>
            </CardHeader>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>LeaveType Management</h4>
              <p className={classes.cardCategoryWhite}>
                Here are the list of LeaveType
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  <FormattedMessage {...messages.leaveName}>
                    {txt => (
                      <span onClick={() => this.leaveTypeSort("LeaveName")}>
                        {txt}
                      </span>
                    )}
                  </FormattedMessage>,
                  <FormattedMessage {...messages.leaveNameNepali} />,
                  <FormattedMessage {...messages.noOfDays}>
                    {txt => (
                      <span onClick={() => this.leaveTypeSort("NoOfDays")}>
                        {txt}
                      </span>
                    )}
                  </FormattedMessage>,
                  <FormattedMessage {...messages.applicableGender}>
                    {txt => (
                      <span onClick={() => this.leaveTypeSort("To")}>
                        {txt}
                      </span>
                    )}
                  </FormattedMessage>,
                  <FormattedMessage {...messages.isTransferrable}>
                    {txt => (
                      <span onClick={() => this.leaveTypeSort("IsCurrent")}>
                        {txt}
                      </span>
                    )}
                  </FormattedMessage>,
                  <FormattedMessage {...messages.isPaidLeave}>
                    {txt => (
                      <span onClick={() => this.leaveTypeSort("IsActive")}>
                        {txt}
                      </span>
                    )}
                  </FormattedMessage>,
                  <FormattedMessage {...messages.isReplacementLeave}>
                    {txt => (
                      <span
                        onClick={() => this.leaveTypeSort("IsReplacementLeave")}
                      >
                        {txt}
                      </span>
                    )}
                  </FormattedMessage>,
                  <FormattedMessage {...messages.applicableReligion}>
                    {txt => (
                      <span
                        onClick={() => this.leaveTypeSort("ApplicableReligion")}
                      >
                        {txt}
                      </span>
                    )}
                  </FormattedMessage>,
                  <FormattedMessage {...messages.isCarryOver}>
                    {txt => (
                      <span onClick={() => this.leaveTypeSort("IsCarryOver")}>
                        {txt}
                      </span>
                    )}
                  </FormattedMessage>
                ]}
                tableData={tableData}
                page={page}
                size={size}
                totaldata={totaldata}
                handleChangePage={this.handleChangePage}
                handleChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
              <Button
                variant="fab"
                color="primary"
                aria-label="Add"
                className={classes.button}
                round={true}
                onClick={this.handleAdd}
              >
                <AddIcon />
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

LeaveType.propTypes = {
  loadAll: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  allLinks: makeSelectAll(),
  pageItem: makeSelectPage()
});

const mapDispatchToProps = dispatch => ({
  loadAll: payload => dispatch(loadAllRequest(payload)),
  deleteOne: id => dispatch(deleteOneRequest(id))
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "leaveTypePage", reducer });
const withSaga = injectSaga({ key: "leaveTypePage", saga });

const withStyle = withStyles(styles);

export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect
)(LeaveType);
