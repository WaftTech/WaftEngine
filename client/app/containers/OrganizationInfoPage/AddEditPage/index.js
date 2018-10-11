import React, { Component } from 'react';
import CKEditor from 'react-ckeditor-component';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
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
import { DAYS, IMAGE_BASE } from 'containers/App/constants';
import noImage from 'assets/img/logo.png';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOne,
  makeSelectState,
  makeSelectDistrict,
  makeSelectVdc,
} from '../selectors';
import {
  loadOneRequest,
  addEditRequest,
  loadStateRequest,
  loadDistrictRequest,
  loadVdcRequest,
} from '../actions';

const styles = {
  formControl: {
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {},
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class AddEdit extends Component {
  state = {
    data: {
      FeatureofOrganization: '',
      AboutOrganization: '',
      OrganizationEmail: '',
      IsFeature: false,
      District: '',
      PhoneNo: '',
      IsActive: false,
      VDCMunicipality: '',
      State: '',
      StreetAddress: '',
      Lattitude: '',
      Longitude: '',
      Website: '',
      Links: '',
      ProfileImage: null,
      IsVerified: false,
      Added_at: '',
      Organization: '',
      OpenningDays: [],
      OpenningTime: '',
      Services: '',
      Category: '',
      ProfileImage1: null,
    },
    images: { ProfileImage: noImage, ProfileImage1: noImage },
  };
  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOne(this.props.match.params.id);
    }
    if (this.props.states.size === 0) {
      this.props.loadState();
    }
    if (this.props.districts.size === 0) {
      this.props.loadDistrict();
    }
    if (this.props.vdcs.size === 0) {
      this.props.loadVdc();
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.oneOrganization !== nextProps.oneOrganization) {
      const oneOrganizationObj = nextProps.oneOrganization.toJS();
      const ProfileImage =
        (oneOrganizationObj.ProfileImage &&
          oneOrganizationObj.ProfileImage.path &&
          `${IMAGE_BASE}${oneOrganizationObj.ProfileImage.path}`) ||
        noImage;
      const ProfileImage1 =
        (oneOrganizationObj.ProfileImage1 &&
          oneOrganizationObj.ProfileImage1.path &&
          `${IMAGE_BASE}${oneOrganizationObj.ProfileImage1.path}`) ||
        noImage;
      this.setState(state => ({
        data: { ...state.data, ...oneOrganizationObj },
        images: { ProfileImage, ProfileImage1 },
      }));
    }
  }
  handleEditorChange = (e, name) => {
    const newContent = e.editor.getData();
    this.setState(state => ({ data: { ...state.data, [name]: newContent } }));
  };
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
    this.props.history.push('/wt/organization-info');
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
    const { classes, states, districts, vdcs } = this.props;
    const statesObj = states.toJS();
    const districtsObj = districts.toJS();
    const vdcsObj = vdcs.toJS();
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Organization</h4>
                <p className={classes.cardCategoryWhite}>Organization info</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Organization"
                      id="organization-name"
                      inputProps={{
                        onChange: this.handleChange('Organization'),
                        value: data.Organization,
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Category"
                      id="organization-category"
                      inputProps={{
                        onChange: this.handleChange('Category'),
                        value: data.Category,
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Phone No."
                      id="organization-phone"
                      inputProps={{
                        onChange: this.handleChange('PhoneNo'),
                        value: data.PhoneNo,
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Organization Email"
                      id="organization-email"
                      inputProps={{
                        onChange: this.handleChange('OrganizationEmail'),
                        value: data.OrganizationEmail,
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="select-multiple-days">
                        Opening Days
                      </InputLabel>
                      <Select
                        multiple
                        value={data.OpenningDays}
                        onChange={this.handleChange('OpenningDays')}
                        input={<Input id="select-multiple-days" />}
                        renderValue={selected => (
                          <div className={classes.chips}>
                            {selected.map(value => (
                              <Chip
                                key={value}
                                label={value}
                                className={classes.chip}
                              />
                            ))}
                          </div>
                        )}
                        MenuProps={MenuProps}
                      >
                        {DAYS.map(name => (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Organization Time"
                      id="organization-opentime"
                      inputProps={{
                        onChange: this.handleChange('OpenningTime'),
                        value: data.OpenningTime,
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="address-state">State</InputLabel>
                      <Select
                        value={data.State}
                        onChange={this.handleChange('State')}
                        inputProps={{
                          name: 'state',
                          id: 'address-state',
                        }}
                      >
                        {Object.keys(statesObj).map(each => (
                          <MenuItem
                            key={statesObj[each]._id}
                            value={statesObj[each].StateName}
                          >
                            {statesObj[each].StateName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="address-district">
                        District
                      </InputLabel>
                      <Select
                        value={data.District}
                        onChange={this.handleChange('District')}
                        inputProps={{
                          name: 'district',
                          id: 'address-district',
                        }}
                      >
                        {data.State &&
                          Object.keys(districtsObj).map(each => {
                            if (
                              statesObj[districtsObj[each].StateID]
                                .StateName === data.State
                            ) {
                              return (
                                <MenuItem
                                  key={districtsObj[each]._id}
                                  value={districtsObj[each].DistrictName}
                                >
                                  {districtsObj[each].DistrictName}
                                </MenuItem>
                              );
                            }
                            return null;
                          })}
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="address-vdc">
                        VDC/Municipality
                      </InputLabel>
                      <Select
                        value={data.VDCMunicipality}
                        onChange={this.handleChange('VDCMunicipality')}
                        inputProps={{
                          name: 'vdc',
                          id: 'address-vdc',
                        }}
                      >
                        {data.District &&
                          Object.keys(vdcsObj).map(each => {
                            if (
                              districtsObj[vdcsObj[each].DistrictID]
                                .DistrictName === data.District
                            ) {
                              return (
                                <MenuItem
                                  key={vdcsObj[each]._id}
                                  value={vdcsObj[each].Name}
                                >
                                  {vdcsObj[each].Name}
                                </MenuItem>
                              );
                            }
                          })}
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Street Address"
                      id="street-address"
                      inputProps={{
                        onChange: this.handleChange('StreetAddress'),
                        value: data.StreetAddress,
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Lattitude"
                      id="lattitude"
                      inputProps={{
                        onChange: this.handleChange('Lattitude'),
                        value: data.Lattitude,
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Longitude"
                      id="longitude"
                      inputProps={{
                        onChange: this.handleChange('Longitude'),
                        value: data.Longitude,
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: '#AAAAAA' }}>
                      Services
                    </InputLabel>
                    <CKEditor
                      name="services"
                      content={data.Services}
                      events={{
                        change: e => this.handleEditorChange(e, 'Services'),
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: '#AAAAAA' }}>
                      About Organization
                    </InputLabel>
                    <CKEditor
                      name="about"
                      content={data.AboutOrganization}
                      events={{
                        change: e =>
                          this.handleEditorChange(e, 'AboutOrganization'),
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: '#AAAAAA' }}>
                      Features of Organization
                    </InputLabel>
                    <CKEditor
                      name="features"
                      content={data.FeatureofOrganization}
                      events={{
                        change: e =>
                          this.handleEditorChange(e, 'FeatureofOrganization'),
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Website"
                      id="organization-website"
                      inputProps={{
                        onChange: this.handleChange('Website'),
                        value: data.Website,
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Links"
                      id="organization-links"
                      inputProps={{
                        onChange: this.handleChange('Links'),
                        value: data.Links,
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
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
                          checked={data.IsVerified || false}
                          onClick={this.handleCheckedChange('IsVerified')}
                          value="IsVerified"
                          color="primary"
                        />
                      }
                      label="Is Verified"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={data.IsActive || false}
                          onClick={this.handleCheckedChange('IsActive')}
                          value="IsActive"
                          color="primary"
                        />
                      }
                      label="Is Active"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={data.IsFeature || false}
                          onClick={this.handleCheckedChange('IsFeature')}
                          value="IsFeature"
                          color="primary"
                        />
                      }
                      label="Is Featured"
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <Dropzone
                      onDrop={files => this.onDrop(files, 'ProfileImage')}
                      multiple={false}
                    >
                      <img
                        className=""
                        width="200px"
                        height="200px"
                        src={images.ProfileImage}
                        alt="ProfileImage"
                      />
                    </Dropzone>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <Dropzone
                      onDrop={files => this.onDrop(files, 'ProfileImage1')}
                      multiple={false}
                    >
                      <img
                        className=""
                        width="200px"
                        height="200px"
                        src={images.ProfileImage1}
                        alt="ProfileImage1"
                      />
                    </Dropzone>
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

const withReducer = injectReducer({ key: 'organizationInfoPage', reducer });
const withSaga = injectSaga({ key: 'organizationInfoPage', saga });

const mapStateToProps = createStructuredSelector({
  oneOrganization: makeSelectOne(),
  states: makeSelectState(),
  districts: makeSelectDistrict(),
  vdcs: makeSelectVdc(),
});

const mapDispatchToProps = dispatch => ({
  loadOne: payload => dispatch(loadOneRequest(payload)),
  loadState: () => dispatch(loadStateRequest()),
  loadDistrict: () => dispatch(loadDistrictRequest()),
  loadVdc: () => dispatch(loadVdcRequest()),
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
