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
import { makeSelectAll } from "./selectors";
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
export class LeaveApplication extends React.Component {
  state = { query: {}, sortToggle: 0, sortSymbol: "D" };
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
    this.props.history.push("/wt/LeaveApplication-manage/add");
  };
  handleEdit = id => {
    this.props.history.push(`/wt/LeaveApplication-manage/edit/${id}`);
  };
  handleDelete = id => {
    // shoe modal && api call
    this.props.deleteOne(id);
    // this.props.history.push(`/wt/link-manage/edit/${id}`);
  };
  handleSearch = () => {
    this.props.loadAll({ query: this.state.query });
    this.setState({ query: {} });
  };

  LeaveApplicationSort = title => {
    if (!!this.state.sortToggle) {
      this.setState({ sortToggle: 0, sortSymbol: "D" });
    } else if (!this.state.sortToggle) {
      this.setState({ sortToggle: 1, sortSymbol: "A" });
    }
    this.props.loadAll({ sort: `${this.state.sortToggle}${title}` });
  };
  render() {
    const { classes, allLinks, employeeList } = this.props;
    const allLinksObj = allLinks.toJS();

    const tableData = allLinksObj.map(
      ({
        _id,
        Added_by,
        EmployID,
        LeaveTypeID,
        From,
        To,
        NoOfDays,
        Status,
        FromIsHalfDay,
        ToIsHalfDay
      }) => [
        Added_by.name,
        EmployID.name,
        LeaveTypeID.LeaveName,
        moment(From).format("YYYY-MM-DD"),
        moment(To).format("YYYY-MM-DD"),
        NoOfDays,
        Status,
        FromIsHalfDay,
        ToIsHalfDay,

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
                    name="Added_by"
                    value={this.state.query.Added_by || ""}
                    onChange={this.handleQueryChange}
                    margin="normal"
                    placeholder="Search By Added By"
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
                    name="SubmittedTo"
                    value={this.state.query.SubmittedTo || ""}
                    onChange={this.handleQueryChange}
                    margin="normal"
                    placeholder="Search By Submitted To"
                  />
                </GridItem>
                <GridItem xs={4} sm={4} md={4}>
                  <TextField
                    name="SubmittedBy"
                    value={this.state.query.SubmittedBy || ""}
                    onChange={this.handleQueryChange}
                    margin="normal"
                    placeholder="Search By Submitted By"
                  />
                </GridItem>
                <GridItem xs={4} sm={4} md={4}>
                  <TextField
                    name="IsHalfDay"
                    value={this.state.query.IsHalfDay || ""}
                    onChange={this.handleQueryChange}
                    margin="normal"
                    placeholder="Search By Is HalfDay"
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
              <h4 className={classes.cardTitleWhite}>
                LeaveApplication Management
              </h4>
              <p className={classes.cardCategoryWhite}>
                Here are the list of LeaveApplication
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  <FormattedMessage {...messages.added_by}>
                    {txt => (
                      <span
                        onClick={() => this.LeaveApplicationSort("Added_by")}
                      >
                        {txt}
                      </span>
                    )}
                  </FormattedMessage>,
                  <FormattedMessage {...messages.Employee}>
                    {txt => (
                      <span
                        onClick={() => this.LeaveApplicationSort("SubmittedTo")}
                      >
                        {txt}
                      </span>
                    )}
                  </FormattedMessage>,
                  <FormattedMessage {...messages.LeaveType}>
                    {txt => (
                      <span
                        onClick={() => this.LeaveApplicationSort("LeaveType")}
                      >
                        {txt}
                      </span>
                    )}
                  </FormattedMessage>,
                  <FormattedMessage {...messages.fromIsHalfDay}>
                    {txt => (
                      <span
                        onClick={() =>
                          this.LeaveApplicationSort("FromIsHalfDay")
                        }
                      >
                        {txt}
                      </span>
                    )}
                  </FormattedMessage>,
                  <FormattedMessage {...messages.toIsHalfDay}>
                    {txt => (
                      <span
                        onClick={() => this.LeaveApplicationSort("ToIsHalfDay")}
                      >
                        {txt}
                      </span>
                    )}
                  </FormattedMessage>,
                  <FormattedMessage {...messages.noOfDays}>
                    {txt => (
                      <span
                        onClick={() => this.LeaveApplicationSort("NoOfDays")}
                      >
                        {txt}
                      </span>
                    )}
                  </FormattedMessage>,
                  <FormattedMessage {...messages.status}>
                    {txt => (
                      <span onClick={() => this.LeaveApplicationSort("Status")}>
                        {txt}
                      </span>
                    )}
                  </FormattedMessage>
                ]}
                tableData={tableData}
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

LeaveApplication.propTypes = {
  loadAll: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  allLinks: makeSelectAll()
});

const mapDispatchToProps = dispatch => ({
  loadAll: payload => dispatch(loadAllRequest(payload)),
  deleteOne: id => dispatch(deleteOneRequest(id))
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "leaveApplicationPage", reducer });
const withSaga = injectSaga({ key: "leaveApplicationPage", saga });

const withStyle = withStyles(styles);

export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect
)(LeaveApplication);
