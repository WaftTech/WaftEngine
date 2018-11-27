import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import CKEditor from 'react-ckeditor-component';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// core components
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import CustomInput from 'components/CustomInput/CustomInput';
import Button from 'components/CustomButtons/Button';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';

import noImage from 'assets/img/logo.png';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectOne } from '../selectors';
import { loadOneRequest, addEditRequest } from '../actions';
const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

class AddEdit extends Component {
  state = {
    data: {
      email: 'manoj',
      email_verified: true,
      name: '',
      roles: [],
      avtar: noImage,
    },
  };
  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOne(this.props.match.params.id);
    }
  }
  handleChange = name => event => {
    event.persist();
    this.setState(state => ({
      data: { ...state.data, [name]: event.target.value },
    }));
  };
  handleCheckedChange = name => event => {
    event.persist();
    this.setState(state => ({
      data: { ...state.data, [name]: event.target.checked },
    }));
  };
  handleSave = () => {
    this.props.addEdit(this.state.data);
  };
  handleGoBack = () => {
    this.props.history.push('/wt/user-manage');
  };
  render() {
    const { data } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>User</h4>
                <p className={classes.cardCategoryWhite}>User info</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="User Email"
                      id="email"
                      inputProps={{
                        value: data.email,
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Name"
                      id="name"
                      inputProps={{
                        value: data.name,
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <img
                      className=""
                      width="200px"
                      height="200px"
                      src={data.avtar}
                      alt="ProfileImage"
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <InputLabel style={{ color: '#AAAAAA' }}>Status</InputLabel>
                    <GridItem xs={12} sm={12} md={8} />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={data.email_verified || false}
                          tabIndex={-1}
                          value="isActive"
                          color="primary"
                        />
                      }
                      label="Is Email Verified"
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary">Save</Button>
                <Button color="primary">Back</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

const withStyle = withStyles(styles);

const withReducer = injectReducer({ key: 'userManagePage', reducer });
const withSaga = injectSaga({ key: 'userManagePage', saga });

const mapStateToProps = createStructuredSelector({
  oneOrganization: makeSelectOne(),
});

const mapDispatchToProps = dispatch => ({
  loadOne: payload => dispatch(loadOneRequest(payload)),
  addEdit: payload => dispatch(addEditRequest(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(AddEdit);
