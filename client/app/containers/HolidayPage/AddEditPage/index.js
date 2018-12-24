import React, { Component } from "react";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import moment from "moment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";

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

class HolidayAddEdit extends Component {
  state = {
    date: null,
    title: "",
    applicableTo: "All",
    isActive: true,
    isHalfDay: true,
    addedBy: ""
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
                <h4 className={classes.cardTitleWhite}>Add/Edit Holiday</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Title"
                      id="title"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.title,
                        onChange: this.handleChange("title")
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Added By"
                      id="addedBy"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.addedBy,
                        onChange: this.handleChange("addedBy")
                      }}
                    />
                  </GridItem>

                  <GridItem xs={4} sm={4} md={4}>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">Applicable To</FormLabel>
                      <RadioGroup
                        aria-label="applicableTo"
                        name="applicableTo"
                        className={classes.group}
                        value={this.state.applicableTo}
                        onChange={this.handleChange("applicableTo")}
                      >
                        <FormControlLabel
                          value="All"
                          control={<Radio />}
                          label="All"
                        />
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
                      <FormLabel component="legend">Is Active</FormLabel>
                      <RadioGroup
                        aria-label="isActive"
                        name="isActive"
                        className={classes.group}
                        value={this.state.isActive}
                        onChange={this.handleBooleanChange("isActive")}
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
                      <FormLabel component="legend">Is HalfDay</FormLabel>
                      <RadioGroup
                        aria-label="isHalfDay"
                        name="isHalfDay"
                        className={classes.group}
                        value={this.state.isHalfDay}
                        onChange={this.handleBooleanChange("isHalfDay")}
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
                      name="date"
                      label="Date"
                      type="date"
                      inputProps={{
                        value: moment(this.state.date).format("YYYY-MM-DD"),
                        name: "date",
                        onChange: this.handleChange("date")
                      }}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
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

const withReducer = injectReducer({ key: "holidayPage", reducer });
const withSaga = injectSaga({ key: "holidayPage", saga });

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
)(HolidayAddEdit);
