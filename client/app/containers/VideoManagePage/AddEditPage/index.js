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
      video_library: '',
      code: '',
      videos: [
        {
          title: '',
          url: '',
        },
      ],
    },
  };
  handleChange = name => event => {
    event.persist();
    this.setState(state => ({
      data: { ...state.data, [name]: event.target.value },
    }));
  };
  handleVideoChange = (name, index) => event => {
    event.persist();
    this.setState(state => {
      let {
        data: { videos },
      } = state;
      videos[index][name] = event.target.value;
      return {
        data: { ...state.data, videos },
      };
    });
  };

  handleGoBack = () => {
    this.props.history.push('/wt/video-manage');
  };
  handleSave = () => {
    this.props.addEdit(this.state.data);
  };

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOne(this.props.match.params.id);
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.one !== nextProps.one) {
      const oneObj = nextProps.one.toJS();
      const video_id = (oneObj.videos && oneObj.videos._id) || '';

      this.setState(state => ({
        data: { ...state.data, ...oneObj },
        video_id,
      }));
    }
  }
  render() {
    const { data, video_id } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Video Library</h4>
                <p className={classes.cardCompanyWhite}>Videos' info</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Video Library Name"
                      id="video-library"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: data.video_library,
                        onChange: this.handleChange('video_library'),
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Video Code"
                      id="video-code"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: data.code,
                        onChange: this.handleChange('code'),
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  {data.videos.map((each, index) => (
                    <GridItem key={`video-${index}`} xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Video Title"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          value: each.title,
                          onChange: this.handleVideoChange('title', index),
                        }}
                      />
                      <CustomInput
                        labelText="Video URL"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          value: each.url,
                          onChange: this.handleVideoChange('url', index),
                        }}
                      />
                    </GridItem>
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

const withReducer = injectReducer({ key: 'videoManagePage', reducer });
const withSaga = injectSaga({ key: 'videoManagePageAddEdit', saga });

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
