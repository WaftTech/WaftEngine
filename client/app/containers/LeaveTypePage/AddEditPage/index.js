import React, { Component } from "react";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import moment from "moment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
import { connect } from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

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
import { makeSelectOne } from "../selectors";
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

class LeaveTypeAddEdit extends Component {
  state = {
    LeaveName: "",
    LeaveNameNepali: "",
    ApplicableGender: "Female",
    IsTransferrable: true,
    IsPaidLeave: true,
    IsReplacementLeave: true,
    NoOfDays: null,
    ApplicableReligion: "",
    IsCarryOver: ""
  };

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
  }
  handleEditorChange = (e, name) => {
    const newContent = e.editor.getData();
    this.setState({ [name]: newContent });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleNumberChange = name => event => {
    this.setState({ [name]: Number(event.target.value) });
  };

  handleGoBack = () => {
    this.props.history.push("/wt/leaveType-manage");
  };
  handleSave = () => {
    this.props.addEdit(this.state);
  };

  handleBooleanChange = name => event => {
    this.setState({ [name]: event.target.value === "true" });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Add/Edit LeaveType</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Leave Name"
                      id="leaveName"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.LeaveName,
                        onChange: this.handleChange("LeaveName")
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Leave Name Nepali"
                      id="LeaveNameNepali"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.LeaveNameNepali,
                        onChange: this.handleChange("LeaveNameNepali")
                      }}
                    />
                  </GridItem>

                  <GridItem xs={4} sm={4} md={4}>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">Is Transferrable</FormLabel>
                      <RadioGroup
                        aria-label="isTransferrable"
                        name="isTransferrable"
                        className={classes.group}
                        value={this.state.IsTransferrable}
                        onChange={this.handleBooleanChange("IsTransferrable")}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="True"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="False"
                        />
                      </RadioGroup>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={4} sm={4} md={4}>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">Is Paid</FormLabel>
                      <RadioGroup
                        aria-label="isPaid"
                        name="isPaid"
                        className={classes.group}
                        value={this.state.IsPaidLeave}
                        onChange={this.handleBooleanChange("IsPaidLeave")}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="True"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="False"
                        />
                      </RadioGroup>
                    </FormControl>
                  </GridItem>

                  <GridItem xs={4} sm={4} md={4}>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">
                        Applicable Gender
                      </FormLabel>
                      <RadioGroup
                        aria-label="applicableGender"
                        name="ApplicableGender"
                        className={classes.group}
                        value={this.state.ApplicableGender}
                        onChange={this.handleChange("ApplicableGender")}
                      >
                        <FormControlLabel
                          value="Male"
                          control={<Radio />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="Female"
                          control={<Radio />}
                          label="Female"
                        />
                        <FormControlLabel
                          value="others"
                          control={<Radio />}
                          label="Others"
                        />
                      </RadioGroup>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={4} sm={4} md={4}>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">Is Replacement</FormLabel>
                      <RadioGroup
                        aria-label="isReplacement"
                        name="isReplacement1"
                        className={classes.group}
                        value={this.state.IsReplacementLeave}
                        onChange={this.handleBooleanChange(
                          "IsReplacementLeave"
                        )}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="True"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="False"
                        />
                      </RadioGroup>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={4} sm={4} md={4}>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">
                        Applicable Religion
                      </FormLabel>
                      <RadioGroup
                        aria-label="applicableGender"
                        name="ApplicableGender"
                        className={classes.group}
                        value={this.state.ApplicableReligion}
                        onChange={this.handleChange("ApplicableReligion")}
                      >
                        <FormControlLabel
                          value="All"
                          control={<Radio />}
                          label="All"
                        />
                        <FormControlLabel
                          value="Hindu"
                          control={<Radio />}
                          label="Hindu"
                        />
                        <FormControlLabel
                          value="Muslim"
                          control={<Radio />}
                          label="Muslim"
                        />
                        <FormControlLabel
                          value="Christian"
                          control={<Radio />}
                          label="Christian"
                        />
                        <FormControlLabel
                          value="Buddisht"
                          control={<Radio />}
                          label="Buddisht"
                        />
                        <FormControlLabel
                          value="Other"
                          control={<Radio />}
                          label="Other"
                        />
                      </RadioGroup>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={4} sm={4} md={4}>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">Is CarryOver</FormLabel>
                      <RadioGroup
                        aria-label="IsCarryOver"
                        name="IsCarryOver"
                        className={classes.group}
                        value={this.state.IsCarryOver}
                        onChange={this.handleChange("IsCarryOver")}
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label="true"
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio />}
                          label="false"
                        />
                      </RadioGroup>
                    </FormControl>
                  </GridItem>
                  {/* Number of days */}
                  <GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Number of Days"
                        id="NoOfDays"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: this.state.NoOfDays,
                          onChange: this.handleNumberChange("NoOfDays")
                        }}
                      />
                    </GridItem>
                  </GridItem>
                  <GridItem />
                </GridContainer>
              </CardBody>
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

const withReducer = injectReducer({ key: "leaveTypePage", reducer });
const withSaga = injectSaga({ key: "leaveTypePage", saga });

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
export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect
)(LeaveTypeAddEdit);

{
  /* <input onChange={this.handleChange} />
<input onChange={event => this.handleChange(event)} /> */
}
