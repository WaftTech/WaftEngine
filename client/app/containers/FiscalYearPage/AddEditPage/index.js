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

class FiscalAddEdit extends Component {
  state = { FiscalYear: "", From: null, To: null };
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
    this.props.history.push("/wt/fiscal-manage");
  };
  handleSave = () => {
    this.props.addEdit(this.state);
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
  handleFromChange = event => {
    event.persist();
    const {
      target: { value, name }
    } = event;
    this.setState({ [name]: value });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Add/Edit Fiscal</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Fiscal Year"
                      id="fiscal-year"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.FiscalYear,
                        onChange: this.handleChange("FiscalYear")
                      }}
                    />

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
                      //this.handleQueryChange
                    />
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
                    />
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

const withReducer = injectReducer({ key: "fiscalYearPage", reducer });
const withSaga = injectSaga({ key: "fiscalYearPage", saga });

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
)(FiscalAddEdit);

{
  /* <input onChange={this.handleChange} />
<input onChange={event => this.handleChange(event)} /> */
}
