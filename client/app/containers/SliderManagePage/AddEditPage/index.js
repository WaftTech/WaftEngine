import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Dropzone from 'react-dropzone';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import TextField from '@material-ui/core/TextField';
// core components
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import CustomInput from 'components/CustomInput/CustomInput';
import Button from 'components/CustomButtons/Button';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectOne } from '../selectors';
import { loadOneRequest, addEditRequest } from '../actions';
import { IMAGE_BASE } from '../../App/constants';
import defaultImage from 'assets/img/logo.svg';

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
      slider_name: '',
      slider_key: '',
      image: [],
      captions: []
    },
    images: {
      image: defaultImage,
    },
  };
  handleChange = name => event => {
    event.persist();
    this.setState(state => ({
      data: { ...state.data, [name]: event.target.value },
    }));
  };

  handleGoBack = () => {
    this.props.history.push('/wt/slider-manage');
  };
  handleSave = () => {
    this.props.addEdit(this.state.data);
  };

  onDrop = (files, name) => {
    this.setState(state => ({
      data: { ...state.data, [name]: [...state.data[name], ...files] },
    }));
  };

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOne(this.props.match.params.id);
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.one !== nextProps.one) {
      const oneObj = nextProps.one.toJS();
      const Image = oneObj.Image && oneObj.Image.path && `${IMAGE_BASE}${oneObj.Image.path}`;

      this.setState(state => ({
        data: { ...state.data, ...oneObj },
        images: { Image },
      }));
    }
  }
  render() {
    const { data, images } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Slider</h4>
                <p className={classes.cardCompanyWhite}>Slider info</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Slider Name"
                      id="slider-name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: data.slider_name,
                        onChange: this.handleChange('slider_name'),
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Slider Key"
                      id="slider-key"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: data.slider_key,
                        onChange: this.handleChange('slider_key'),
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Dropzone onDrop={files => this.onDrop(files, 'image')} multiple={true} />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  {data.image.map((each, index) => (
                    <div key={`${index}-added`} >
                    <img src={each.preview}/>
                    <CustomInput
                      labelText="Captions"
                      id="caption"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: data.caption,
                        onChange: this.handleChange('caption'),
                      }}
                    />
                    </div>
                  ))}
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

const withReducer = injectReducer({ key: 'sliderManagePage', reducer });
const withSaga = injectSaga({ key: 'sliderManagePageAddEdit', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
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
