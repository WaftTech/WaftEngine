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
import { makeSelectOne } from "../selectors";
import { loadOneRequest, addEditRequest } from "../actions";
import { makeSelectUser } from "../../App/selectors";

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

class LeaveApplication extends Component {
  state = {
    NoOfDays: null,
    SubmittedTo: "",
    SubmittedBy: "",
    Added_by: "",
    IsHalfDay: true,
    From: null,
    To: null,
    FromIsHalfDay: null,
    ToIsHalfDay: null,
    Remarks: [{ Date: moment(new Date()).format("YYYY-MM-DD"), Remark: "" }]
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
    this.setState({ [name]: event.target.value === "true" });
  };
  render() {
    const { Remarks } = this.state;
    const { classes, user } = this.props;
    console.log(user.toJS());
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
                  <FormControl className={classes.formControl}>
                    <InputLabel shrink htmlFor="age-label-placeholder">
                      Employee Name
                    </InputLabel>
                    <Select
                      value={this.state.age}
                      onChange={this.handleChange}
                      input={<Input name="age" id="age-label-placeholder" />}
                      displayEmpty
                      name="age"
                      className={classes.selectEmpty}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    <FormHelperText>Label + placeholder</FormHelperText>
                  </FormControl>

                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Employee Name"
                      id="Added_by"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.Added_by,
                        onChange: this.handleChange("Added_by")
                      }}
                    />
                  </GridItem>

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

                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Submitted To"
                      id="SubmittedTo"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.SubmittedTo,
                        onChange: this.handleChange("SubmittedTo")
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Submitted By"
                      id="SubmittedBy"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.SubmittedBy,
                        onChange: this.handleChange("SubmittedBy")
                      }}
                    />
                  </GridItem>

                  <GridItem xs={4} sm={4} md={4}>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                      margin="normal"
                    >
                      <FormLabel component="legend">Is HalfDay</FormLabel>
                      <RadioGroup
                        aria-label="IsHalfDay"
                        name="IsHalfDay"
                        className={classes.group}
                        value={this.state.IsHalfDay}
                        onChange={this.handleBooleanChange("IsHalfDay")}
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
                    <FormControl margin="normal">
                      <FormLabel component="legend">From IsHalfDay</FormLabel>
                      <RadioGroup
                        aria-label="FromIsHalfDay"
                        name="FromIsHalfDay"
                        className={classes.group}
                        value={this.state.FromIsHalfDay}
                        onChange={this.handleBooleanChange("FromIsHalfDay")}
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
                    <FormControl margin="normal">
                      <FormLabel component="legend">To IsHalfDay</FormLabel>
                      <RadioGroup
                        aria-label="ToIsHalfDay"
                        name="ToIsHalfDay"
                        className={classes.group}
                        value={this.state.ToIsHalfDay}
                        onChange={this.handleBooleanChange("ToIsHalfDay")}
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

                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      id="date"
                      name="from"
                      label="From"
                      type="date"
                      inputProps={{
                        value: moment(this.state.From).format("YYYY-MM-DD"),
                        name: "From",
                        onChange: this.handleChange("From")
                      }}
                      InputLabelProps={{
                        shrink: true
                      }}
                      margin="normal"
                      //this.handleQueryChange
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      id="date"
                      name="to"
                      label="To"
                      type="date"
                      inputProps={{
                        value: moment(this.state.To).format("YYYY-MM-DD"),
                        onChange: this.handleChange("To")
                      }}
                      InputLabelProps={{
                        shrink: true
                      }}
                      margin="normal"
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
  user: makeSelectUser()
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
)(LeaveApplication);
