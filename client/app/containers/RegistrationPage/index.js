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
export class RegistrationPage extends React.Component {
  state = {
    query: {},
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
    this.props.history.push("/wt/registration-manage/add");
  };
  handleEdit = id => {
    this.props.history.push(`/wt/registration-manage/edit/${id}`);
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

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  registrationCall = title => {
    if (!!this.state.sortToggle) {
      this.setState({ sortToggle: 0, sortSymbol: "D" });
    } else if (!this.state.sortToggle) {
      this.setState({ sortToggle: 1, sortSymbol: "A" });
    }
    this.props.loadAll({
      sort: `${this.state.sortToggle}${title}`,
      page: this.state.page,
      rowsPerPage: this.state.rowsPerPage
    });
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
        RegistrationNo,
        SenderName,
        ReceiverName,
        Subject,
        RegisterDate,
        Remarks,
        _id
      }) => [
        RegistrationNo,
        SenderName,
        ReceiverName,
        Subject,
        moment(RegisterDate).format("MMM Do YY"),
        Remarks,
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
                <GridItem xs={6} sm={6} md={6}>
                  <TextField
                    name="RegistrationNo"
                    value={this.state.query.RegistrationNo || ""}
                    onChange={this.handleQueryChange}
                    margin="normal"
                    placeholder="Search By Registration No"
                  />
                </GridItem>
                <GridItem xs={6} sm={6} md={6}>
                  <TextField
                    name="Subject"
                    value={this.state.query.Subject || ""}
                    onChange={this.handleQueryChange}
                    margin="normal"
                    placeholder="Search By Subject"
                  />
                </GridItem>
                <GridItem xs={6} sm={6} md={6}>
                  <TextField
                    name="SenderName"
                    value={this.state.query.SenderName || ""}
                    onChange={this.handleQueryChange}
                    margin="normal"
                    placeholder="Search By SenderName"
                  />
                </GridItem>
                <GridItem xs={6} sm={6} md={6}>
                  <TextField
                    name="ReceiverName"
                    value={this.state.query.ReceiverName || ""}
                    onChange={this.handleQueryChange}
                    margin="normal"
                    placeholder="Search By ReceiverName"
                  />
                </GridItem>

                {/* <input
                name="RegisterDate"
                value={this.state.query.RegisterDate || ""}
                onChange={this.handleQueryChange}
                placeholder="Search By RegisterDate"

              /> */}
                <GridItem xs={6} sm={6} md={6}>
                  <TextField
                    id="date"
                    name="RegisterDate"
                    label="RegistrationDate"
                    type="date"
                    value={this.state.query.RegisterDate || ""}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={this.handleQueryChange}
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
                Registration Management
              </h4>
              <p className={classes.cardCategoryWhite}>
                Here are the list of registrations
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  <FormattedMessage {...messages.registrationNo}>
                    <div>
                      {txt => (
                        <span
                          onClick={() =>
                            this.registrationCall("RegistrationNo")
                          }
                        >
                          {txt}
                        </span>
                      )}
                      <h3>{this.state.sortSymbol}</h3>
                    </div>
                  </FormattedMessage>,
                  <FormattedMessage {...messages.senderName}>
                    {txt => (
                      <span onClick={() => this.registrationCall("SenderName")}>
                        {txt}
                      </span>
                    )}
                  </FormattedMessage>,
                  <FormattedMessage {...messages.receiverName}>
                    {txt => (
                      <span
                        onClick={() => this.registrationCall("ReceiverName")}
                      >
                        {txt}
                      </span>
                    )}
                  </FormattedMessage>,
                  <FormattedMessage {...messages.subject}>
                    {txt => (
                      <span onClick={() => this.registrationCall("Subject")}>
                        {txt}
                      </span>
                    )}
                  </FormattedMessage>,
                  <FormattedMessage {...messages.registerDate}>
                    {txt => (
                      <span
                        onClick={() => this.registrationCall("RegisterDate")}
                      >
                        {txt}
                      </span>
                    )}
                  </FormattedMessage>,
                  <FormattedMessage {...messages.remarks}>
                    {txt => (
                      <span onClick={() => this.registrationCall("Remarks")}>
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
              <h3>{this.state.sortSymbol}</h3>
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

RegistrationPage.propTypes = {
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

const withReducer = injectReducer({ key: "registrationPage", reducer });
const withSaga = injectSaga({ key: "registrationPage", saga });

const withStyle = withStyles(styles);

export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect
)(RegistrationPage);
