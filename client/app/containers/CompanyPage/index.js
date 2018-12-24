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
import CustomInput from "components/CustomInput/CustomInput";
import reducer from "./reducer";
import saga from "./saga";
import { loadOneRequest, addEditRequest } from "./actions";
import { makeSelectOne } from "./selectors";
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
export class Company extends React.Component {
  state = {
    query: {},
    isEditing: false,
    companyName: "",
    address: "",
    contactNumber: "",
    email: "",
    web: "",
    companyNameNepali: "",
    addressNepali: "",
    contactPerson: "",
    contactPersonNepali: ""
  };
  componentDidMount() {
    this.props.loadOne();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.one !== nextProps.one) {
      const oneObj = nextProps.one.toJS();
      this.setState(state => ({
        ...oneObj
      }));
    }
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
    this.props.history.push("/wt/company-manage/add");
  };
  handleEdit = id => {
    this.props.history.push(`/wt/company-manage/edit/${id}`);
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleSave = () => {
    this.props.addEdit(this.state);
  };
  render() {
    const { classes, one } = this.props;
    const oneObj = one.toJS();
    console.log(oneObj);
    const {
      _id,
      companyName,
      address,
      contactNumber,
      email,
      web,
      companyNameNepali,
      addressNepali,
      contactPerson,
      contactPersonNepali
    } = oneObj;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Company Management</h4>
              <p className={classes.cardCategoryWhite}>
                Here is the detail of Company
              </p>
            </CardHeader>
            <CardBody>
              <GridItem>
                <CustomInput
                  labelText="Company Name"
                  id="companyName"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: this.state.companyName,
                    onChange: this.handleChange("companyName")
                  }}
                />
                <CustomInput
                  labelText="Address"
                  id="address"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: this.state.address,
                    onChange: this.handleChange("address")
                  }}
                />
                <CustomInput
                  labelText="Contact Number"
                  id="contactNumber"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: this.state.contactNumber,
                    onChange: this.handleChange("contactNumber")
                  }}
                />
                <CustomInput
                  labelText="Email"
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: this.state.email,
                    onChange: this.handleChange("email")
                  }}
                />
                <CustomInput
                  labelText="Web"
                  id="web"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: this.state.web,
                    onChange: this.handleChange("web")
                  }}
                />
                <CustomInput
                  labelText="Company Name Nepali"
                  id="companyNameNepali"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: this.state.companyNameNepali,
                    onChange: this.handleChange("companyNameNepali")
                  }}
                />
                <CustomInput
                  labelText="Address Nepali"
                  id="addressNepali"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: this.state.addressNepali,
                    onChange: this.handleChange("addressNepali")
                  }}
                />
                <CustomInput
                  labelText="Contact Person"
                  id="contactPerson"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: this.state.contactPerson,
                    onChange: this.handleChange("contactPerson")
                  }}
                />
                <CustomInput
                  labelText="Contact Person Nepali"
                  id="contactPersonNepali"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: this.state.contactPersonNepali,
                    onChange: this.handleChange("contactPersonNepali")
                  }}
                />
              </GridItem>

              <Button color="primary" onClick={this.handleSave}>
                Save
              </Button>
              {/* <IconButton
                aria-label="Edit"
                className={classes.tableActionButton}
                onClick={() =>
                  this.setState({ isEditing: !this.state.isEditing })
                }
              >
                <Edit
                  className={classes.tableActionButtonIcon + " " + classes.edit}
                />
              </IconButton> */}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

Company.propTypes = {
  loadOne: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne()
});

const mapDispatchToProps = dispatch => ({
  loadOne: payload => dispatch(loadOneRequest(payload)),
  addEdit: payload => dispatch(addEditRequest(payload))
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "companyPage", reducer });
const withSaga = injectSaga({ key: "companyPage", saga });

const withStyle = withStyles(styles);

export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect
)(Company);
