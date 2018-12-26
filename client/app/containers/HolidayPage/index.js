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
export class Holiday extends React.Component {
  state = { query: {}, name: "", sortToggle: 0, sortSymbol: "D" };
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
    this.props.history.push("/wt/holiday-manage/add");
  };
  handleEdit = id => {
    this.props.history.push(`/wt/holiday-manage/edit/${id}`);
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

  holidaySort = title => {
    if (!!this.state.sortToggle) {
      this.setState({ sortToggle: 0, sortSymbol: "D" });
    } else if (!this.state.sortToggle) {
      this.setState({ sortToggle: 1, sortSymbol: "A" });
    }
    this.props.loadAll({ sort: `${this.state.sortToggle}${title}` });
  };
  render() {
    const { classes, allLinks } = this.props;
    const allLinksObj = allLinks.toJS();
    const tableData = allLinksObj.map(
      ({
        _id,
        date,
        title,
        applicableTo,
        isActive,
        isHalfDay,
        addedBy,
        addedDate
      }) => [
        moment(date).format("MMMM Do YYYY"),
        title,
        applicableTo,
        "" + isActive,
        "" + isHalfDay,
        addedBy.name,
        moment(addedDate).format("MMMM Do YYYY"),

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
                <GridItem xs={4} sm={4} md={2}>
                  <TextField
                    name="title"
                    value={this.state.query.title || ""}
                    onChange={this.handleQueryChange}
                    margin="normal"
                    placeholder="Search By Title"
                  />
                </GridItem>
                <GridItem xs={4} sm={4} md={2}>
                  <TextField
                    name="applicableTo"
                    value={this.state.query.applicableTo || ""}
                    onChange={this.handleQueryChange}
                    margin="normal"
                    placeholder="Search By Applicable To"
                  />
                </GridItem>
                {/* <GridItem xs={4} sm={4} md={4}>
                  <TextField
                    name="isActive"
                    value={this.state.query.isActive || ""}
                    onChange={this.handleQueryChange}
                    margin="normal"
                    placeholder="Search By Is Active"
                  />
                </GridItem> */}
                <GridItem xs={4} sm={4} md={2}>
                  <TextField
                    name="isHalfDay"
                    value={this.state.query.isHalfDay || ""}
                    onChange={this.handleQueryChange}
                    margin="normal"
                    placeholder="Search By Is HalfDay"
                  />
                </GridItem>
                {/* <GridItem xs={4} sm={4} md={4}>
                  <TextField
                    name="addedBy"
                    value={this.state.query.addedBy || ""}
                    onChange={this.handleQueryChange}
                    margin="normal"
                    placeholder="Search By Is Added By"
                  />
                </GridItem> */}
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    id="date"
                    name="date"
                    label="Date"
                    type="date"
                    value={this.state.query.date || ""}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={this.handleQueryChange}
                  />
                </GridItem>
                {/* <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    id="addedDate"
                    name="addedDate"
                    label="Added Date"
                    type="date"
                    value={this.state.query.addedDate || ""}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={this.handleQueryChange}
                  />
                </GridItem> */}
              </GridContainer>

              <Button
                className="search"
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
              <h4 className={classes.cardTitleWhite}>Holiday Management</h4>
              <p className={classes.cardCategoryWhite}>
                Here are the list of Holiday
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  <FormattedMessage {...messages.date}>
                    {txt => (
                      <span onClick={() => this.holidaySort("date")}>
                        {txt}
                      </span>
                    )}
                  </FormattedMessage>,
                  <FormattedMessage {...messages.title}>
                    {txt => (
                      <span onClick={() => this.holidaySort("title")}>
                        {txt}
                      </span>
                    )}
                  </FormattedMessage>,
                  <FormattedMessage {...messages.applicableTo}>
                    {txt => (
                      <span onClick={() => this.holidaySort("applicableTo")}>
                        {txt}
                      </span>
                    )}
                  </FormattedMessage>,
                  <FormattedMessage {...messages.isActive}>
                    {txt => (
                      <span onClick={() => this.holidaySort("isActive")}>
                        {txt}
                      </span>
                    )}
                  </FormattedMessage>,
                  <FormattedMessage {...messages.isHalfDay}>
                    {txt => (
                      <span onClick={() => this.holidaySort("isHalfDay")}>
                        {txt}
                      </span>
                    )}
                  </FormattedMessage>,
                  <FormattedMessage {...messages.addedBy}>
                    {txt => (
                      <span onClick={() => this.holidaySort("addedBy")}>
                        {txt}
                      </span>
                    )}
                  </FormattedMessage>,
                  <FormattedMessage {...messages.addedDate}>
                    {txt => (
                      <span onClick={() => this.holidaySort("addedDate")}>
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

Holiday.propTypes = {
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

const withReducer = injectReducer({ key: "holidayPage", reducer });
const withSaga = injectSaga({ key: "holidayPage", saga });

const withStyle = withStyles(styles);

export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect
)(Holiday);
