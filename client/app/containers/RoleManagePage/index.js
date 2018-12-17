import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

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
import { loadAllRequest } from "./actions";
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
export class RoleManagePage extends React.Component {
  componentDidMount() {
    this.props.loadAll();
  }
  handleAdd = () => {
    this.props.history.push("/wt/role-manage/add");
  };
  handleEdit = id => {
    this.props.history.push(`/wt/role-manage/edit/${id}`);
  };
  handleDelete = id => {
    // shoe modal && api call
    // this.props.history.push(`/wt/link-manage/edit/${id}`);
  };
  render() {
    const { classes, allLinks } = this.props;
    const allLinksObj = allLinks.toJS();
    const tableData = allLinksObj.map(
      ({ _id, RolesTitle, Description, IsActive }) => [
        RolesTitle,
        Description,
        "" + IsActive,
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
              <h4 className={classes.cardTitleWhite}> <FormattedMessage {...messages.roleManagement} /></h4>
              <p className={classes.cardCategoryWhite}>
              <FormattedMessage {...messages.listOfRoles} />
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  <FormattedMessage {...messages.roleTitle} />,
                  <FormattedMessage {...messages.roleDescription} />,
                  <FormattedMessage {...messages.roleIsActive} />,
                  <FormattedMessage {...messages.roleAction} />
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

RoleManagePage.propTypes = {
  loadAll: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  allLinks: makeSelectAll()
});

const mapDispatchToProps = dispatch => ({
  loadAll: () => dispatch(loadAllRequest())
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "roleManagePage", reducer });
const withSaga = injectSaga({ key: "roleManagePage", saga });

const withStyle = withStyles(styles);

export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect
)(RoleManagePage);
