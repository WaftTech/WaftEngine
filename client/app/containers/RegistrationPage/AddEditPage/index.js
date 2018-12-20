import React, { Component } from "react";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
// core components
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import reducer from "../reducer";
import saga from "../saga";
import { makeSelectOne, makeSelectError } from "../selectors";
import { loadOneRequest, addEditRequest } from "../actions";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class AddEdit extends Component {
  constructor(props) {
    super(props);
    const one = props.one.toJS();
    this.state = {
      RegistrationNo: "",
      RegistrationDate: "",
      Subject: "",
      ReceiverName: "",
      SenderName: "",
      ...one
    };
  }
  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOne(this.props.match.params.id);
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.one !== nextProps.one) {
      const oneObj = nextProps.one.toJS();
      this.setState(state => ({
        ...oneObj
      }));
    }
    console.log(this.props.errors.toJS());
  }
  handleEditorChange = (e, name) => {
    const newContent = e.editor.getData();
    this.setState({ [name]: newContent });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleChecked = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  handleGoBack = () => {
    this.props.history.push("/wt/registration-manage");
  };
  handleSave = () => {
    this.props.addEdit(this.state);
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  Add/Edit Registration
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Registration No"
                      id="registration-no"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.RegistrationNo,
                        onChange: this.handleChange("RegistrationNo")
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Subject"
                      id="subject"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.Subject,
                        onChange: this.handleChange("Subject")
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Sender Name"
                      id="sender-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.SenderName,
                        onChange: this.handleChange("SenderName")
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Receiver Name"
                      id="receiver-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.ReceiverName,
                        onChange: this.handleChange("ReceiverName")
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Remarks"
                      id="remarks"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.Remarks,
                        onChange: this.handleChange("Remarks")
                      }}
                    />
                  </GridItem>
                </GridContainer>
                {/* <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                  <TextField
                        id="date"
                        label="RegistrationDate"
                        type="date"
                        value={this.state.RegistrationDate}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={this.handleChange("RegistrationDate")}
                      />
                    <CustomInput
                      labelText="RegistrationDate"
                      id="registration-date"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'date',
                        value: this.state.RegistrationDate,
                        onChange: this.handleChange("RegistrationDate"),
                        InputLabelProps:{
                          shrink: true,
                        }
                      }}
                    />
                  </GridItem>
                </GridContainer> */}
              </CardBody>
              <div>{this.props.errors.toJS().RegistrationNo}</div>

              <CardFooter>
                <Button color="primary" onClick={this.handleSave}>
                  Save
                </Button>
                <Button color="primary" onClick={this.handleGoBack}>
                  Back
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

const withStyle = withStyles(styles);

const withReducer = injectReducer({ key: "registrationPage", reducer });
const withSaga = injectSaga({ key: "registrationPage", saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  errors: makeSelectError()
});

const mapDispatchToProps = dispatch => ({
  loadOne: payload => dispatch(loadOneRequest(payload)),
  addEdit: payload => dispatch(addEditRequest(payload))
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect
)(AddEdit);
