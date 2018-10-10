import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
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
      ArticleName: '',
      Description: '',
      PublishFrom: '',
      IsActive: false,
      IsFeature: false,
      ArticleImage: null,
    },
    images: {
      ArticleImage: noImage,
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
      const ArticleImage =
        (oneOrganizationObj.ArticleImage &&
          oneOrganizationObj.ArticleImage.path &&
          `${IMAGE_BASE}${oneOrganizationObj.ArticleImage.path}`) ||
        noImage;
      this.setState(state => ({
        data: { ...state.data, ...oneOrganizationObj },
        images: { ArticleImage },
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
  handleEditorChange = (e, name) => {
    const newContent = e.editor.getData();
    this.setState(state => ({ data: { ...state.data, [name]: newContent } }));
  };
  handleSave = () => {
    this.props.addEdit(this.state.data);
  };
  handleGoBack = () => {
    this.props.history.push('/wt/articles-manage');
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
                <h4 className={classes.cardTitleWhite}>Article</h4>
                <p className={classes.cardCategoryWhite}>Article info</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Article Name"
                      id="ads-name"
                      inputProps={{
                        onChange: this.handleChange('ArticleName'),
                        value: data.ArticleName,
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
                      Article Description
                    </InputLabel>
                    <CKEditor
                      name="about"
                      content={data.Description}
                      events={{
                        change: e => this.handleEditorChange(e, 'Description'),
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Published From"
                      id="ads-from-date"
                      inputProps={{
                        onChange: this.handleChange('PublishFrom'),
                        value: data.PublishFrom,
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
                  <GridItem xs={12} sm={12} md={12}>
                    <Dropzone
                      onDrop={files => this.onDrop(files, 'ArticleImage')}
                      multiple={false}
                    >
                      <img
                        className=""
                        width="200px"
                        height="200px"
                        src={images.ArticleImage}
                        alt="ArticleImage"
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

const withReducer = injectReducer({ key: 'articleListPage', reducer });
const withSaga = injectSaga({ key: 'articleListPage', saga });

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
