import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { IMAGE_BASE } from 'containers/App/constants';
import noImage from 'assets/img/logo.png';
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
      CategoryName: '',
      IsActive: false,
      CategoryImage: null,
    },
    images: {
      CategoryImage: noImage,
    },
  };
  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOne(this.props.match.params.id);
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.oneOrganization !== nextProps.oneOrganization) {
      const oneOrganizationObj = nextProps.oneOrganization.toJS();
      const CategoryImage =
        (oneOrganizationObj.CategoryImage &&
          oneOrganizationObj.CategoryImage.path &&
          `${IMAGE_BASE}${oneOrganizationObj.CategoryImage.path}`) ||
        noImage;
      this.setState(state => ({
        data: { ...state.data, ...oneOrganizationObj },
        images: { CategoryImage },
      }));
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
    this.props.history.push('/wt/category-manage');
  };
  onDrop = (files, name) => {
    const file = files[0];
    this.setState(state => ({
      data: { ...state.data, [name]: file },
      images: { ...state.images, [name]: file.preview },
    }));
  };
  render() {
    const { data, images } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Category</h4>
                <p className={classes.cardCategoryWhite}>Category info</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Category Name"
                      id="category-name"
                      inputProps={{
                        onChange: this.handleChange('CategoryName'),
                        value: data.CategoryName,
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Dropzone
                      onDrop={files => this.onDrop(files, 'CategoryImage')}
                      multiple={false}
                    >
                      <img
                        className=""
                        width="200px"
                        height="200px"
                        src={images.CategoryImage}
                        alt="CategoryImage"
                      />
                    </Dropzone>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: '#AAAAAA' }}>
                      Activity Type
                    </InputLabel>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={data.IsActive || false}
                          tabIndex={-1}
                          onClick={this.handleCheckedChange('IsActive')}
                          value="IsActive"
                          color="primary"
                        />
                      }
                      label="Is Active"
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

const withReducer = injectReducer({ key: 'categoryManagePage', reducer });
const withSaga = injectSaga({ key: 'categoryManagePage', saga });

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
