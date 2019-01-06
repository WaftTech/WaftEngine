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
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";

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
import {
  makeSelectOne,
  makeSelectEmployee,
  makeSelectLeaveType,
  makeSelectLeaveDays
} from "../selectors";
import {
  loadOneRequest,
  addEditRequest,
  loadEmployeeRequest,
  loadLeaveTypeRequest,
  loadTotalLeaveDaysRequest
} from "../actions";

const styles = theme => ({
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
  },

  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class LeaveApplication extends Component {
  state = {
    NoOfDays: null,
    Added_by: "",
    IsHalfDay: true,
    From: null,
    To: null,
    FromIsHalfDay: null,
    ToIsHalfDay: null,
    EmployID: "",
    LeaveTypeID: "",
    Remarks: [{ Date: moment(new Date()).format("YYYY-MM-DD"), Remark: "" }],
    singleDay: false
  };

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOne(this.props.match.params.id);
    }
    this.props.loadEmployee(); //load Employee
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
  handleDateChange = name => event => {
    if (this.state.singleDay) {
      this.setState(
        { From: event.target.value, To: event.target.value },
        () => {
          if (this.state.From && this.state.To) {
            const {
              EmployID,
              LeaveTypeID,
              From,
              To,
              FromIsHalfDay,
              ToIsHalfDay
            } = this.state;

            this.props.loadTotalLeaveDays({
              leaveDetail: {
                EmployeeID: EmployID,
                LeaveType: LeaveTypeID,
                FromDate: From,
                ToDate: To,
                FromIsHalfDay,
                ToIsHalfDay
              }
            });
          }
        }
      );
    } else {
      this.setState({ [name]: event.target.value }, () => {
        if (this.state.From && this.state.To) {
          const {
            EmployID,
            LeaveTypeID,
            From,
            To,
            FromIsHalfDay,
            ToIsHalfDay
          } = this.state;

          this.props.loadTotalLeaveDays({
            leaveDetail: {
              EmployeeID: EmployID,
              LeaveType: LeaveTypeID,
              FromDate: From,
              ToDate: To,
              FromIsHalfDay,
              ToIsHalfDay
            }
          });
        }
      });
    }
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleDropChange = event => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      // this.props.loadLeaveType(this.state.EmployID);
      // leaveTypeArray=LeaveTypeID.toJS();
      const leaveDays = this.props.totalLeaveDays.toJS();
      this.setState({ NoOfDays: leaveDays.NoOfDays });
    });
  };
  handleleaveTypeChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleCheckChange = name => event => {
    this.setState({ [name]: event.target.checked }, () => {
      if (this.state.singleDay) {
        this.setState({ To: this.state.From });
      }
    });
  };

  handleRemarkChange = index => event => {
    event.persist();
    this.setState(state => {
      let { Remarks } = state;
      Remarks[index].Remark = event.target.value;
      return { Remarks };
    });
  };
  handleNumberChange = name => event => {
    this.setState({ [name]: Number(event.target.value) });
  };

  handleGoBack = () => {
    this.props.history.push("/wt/leaveApplication-manage");
  };
  handleSave = () => {
    this.props.addEdit(this.state);
  };

  handleBooleanChange = name => event => {
    this.setState({ [name]: event.target.checked }, () => {
      if (this.state.singleDay) {
        this.setState({ To: this.state.From }, () => {
          if (
            this.state.singleDay
              ? this.state.From
              : this.state.From && this.state.To
          ) {
            const {
              EmployID,
              LeaveTypeID,
              From,
              To,
              FromIsHalfDay,
              ToIsHalfDay
            } = this.state;

            this.props.loadTotalLeaveDays({
              leaveDetail: {
                EmployeeID: EmployID,
                LeaveType: LeaveTypeID,
                FromDate: From,
                ToDate: To,
                FromIsHalfDay,
                ToIsHalfDay
              }
            });
          }
        });
      }
    });
  };

  render() {
    const { Remarks } = this.state;
    const { classes, employeeList, LeaveTypeID, totalLeaveDays } = this.props;
    const employeeArray = employeeList.toJS();
    const leaveTypeArray = LeaveTypeID.toJS();
    const leaveDays = totalLeaveDays.toJS();
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  Add/Edit Leave Application
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={6} sm={6} md={6}>
                    <FormControl className={classes.formControl}>
                      <InputLabel shrink htmlFor="employee-label-placeholder">
                        Employee Name
                      </InputLabel>
                      <Select
                        value={this.state.EmployID}
                        onChange={this.handleDropChange}
                        name="EmployID"
                        className={classes.selectEmpty}
                      >
                        {employeeArray.map(employee => (
                          <MenuItem
                            value={employee._id}
                            key={employee._id}
                            name={employee.name}
                          >
                            <em>{employee.name}</em>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={6} sm={6} md={6}>
                    <FormControl className={classes.formControl}>
                      <InputLabel shrink htmlFor="employee-label-placeholder">
                        Leave Type
                      </InputLabel>
                      <Select
                        value={this.state.LeaveTypeID}
                        onChange={this.handleleaveTypeChange}
                        name="LeaveTypeID"
                        className={classes.selectEmpty}
                      >
                        {leaveTypeArray.map(leaveType => (
                          <MenuItem
                            value={leaveType.LeaveType._id}
                            key={leaveType.LeaveType._id}
                            name={leaveType.LeaveType.LeaveName}
                          >
                            <em>{leaveType.LeaveType.LeaveName}</em>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={2} sm={2} md={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.singleDay}
                          onChange={this.handleCheckChange("singleDay")}
                          value="singleDay"
                        />
                      }
                      label="Is Single Day"
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3}>
                    <TextField
                      id="date"
                      name="from"
                      label="Start Date"
                      type="date"
                      inputProps={{
                        value: moment(this.state.From).format("YYYY-MM-DD"),
                        name: "From",
                        onChange: this.handleDateChange("From")
                      }}
                      InputLabelProps={{
                        shrink: true
                      }}
                      margin="normal"
                      //this.handleQueryChange
                    />
                  </GridItem>
                  <GridItem xs={2} sm={2} md={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.FromIsHalfDay}
                          onChange={this.handleBooleanChange("FromIsHalfDay")}
                          value={this.state.FromIsHalfDay}
                        />
                      }
                      label="Is HalfDay"
                    />
                  </GridItem>

                  {!this.state.singleDay ? (
                    <React.Fragment>
                      <GridItem xs={3} sm={3} md={3}>
                        <TextField
                          id="date"
                          name="to"
                          label="End Date"
                          type="date"
                          inputProps={{
                            value: moment(this.state.To).format("YYYY-MM-DD"),
                            onChange: this.handleDateChange("To")
                          }}
                          InputLabelProps={{
                            shrink: true
                          }}
                          margin="normal"
                        />
                      </GridItem>
                      <GridItem xs={2} sm={2} md={2}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={this.state.ToIsHalfDay}
                              onChange={this.handleBooleanChange("ToIsHalfDay")}
                              value={this.state.ToIsHalfDay}
                            />
                          }
                          label="Is HalfDay"
                        />
                      </GridItem>
                    </React.Fragment>
                  ) : (
                    <div />
                  )}

                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      id="NoOfDays"
                      label="Number of Days"
                      className={classes.textField}
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                        value: leaveDays.NoOfDays
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={12}>
                    {Remarks.map((each, index) => (
                      <CustomInput
                        key={`remark-${index}`}
                        labelText="Remarks"
                        id="Remarks"
                        name="Remarks"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: each.Remark,
                          onChange: this.handleRemarkChange(index)
                        }}
                        margin="normal"
                      />
                    ))}
                  </GridItem>
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

const withReducer = injectReducer({ key: "leaveApplicationPage", reducer });
const withSaga = injectSaga({ key: "leaveApplicationPage", saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  employeeList: makeSelectEmployee(),
  LeaveTypeID: makeSelectLeaveType(),
  totalLeaveDays: makeSelectLeaveDays()
});

const mapDispatchToProps = dispatch => ({
  loadOne: payload => dispatch(loadOneRequest(payload)),
  addEdit: payload => dispatch(addEditRequest(payload)),
  loadEmployee: payload => dispatch(loadEmployeeRequest(payload)),
  loadLeaveType: payload => dispatch(loadLeaveTypeRequest(payload)),
  loadTotalLeaveDays: payload => dispatch(loadTotalLeaveDaysRequest(payload))
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
)(LeaveApplication);
