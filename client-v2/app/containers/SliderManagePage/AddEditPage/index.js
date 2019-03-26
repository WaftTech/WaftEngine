import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import Dropzone from 'react-dropzone';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components
import TextField from '@material-ui/core/TextField';
import CustomInput from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardBody from '@material-ui/core/CardContent';
import CardFooter from '@material-ui/core/CardActions';
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectOne } from '../selectors';
import * as mapDispatchToProps from '../actions';
import { IMAGE_BASE } from '../../App/constants';

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

class AddEdit extends React.PureComponent {
  static propTypes = {
    loadOneRequest: PropTypes.func.isRequired,
    addEditRequest: PropTypes.func.isRequired,
    setOneValue: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    // classes: PropTypes.object.isRequired,
    one: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadOneRequest(this.props.match.params.id);
  }

  handleChange = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.value });
  };

  handleGoBack = () => {
    this.props.push('/admin/slider-manage');
  };

  handleSave = () => {
    this.props.addEdit(this.props.one);
  };

  // onDrop = (files, name) => event => {
  //   this.props.setOneValue({ key: name, value: files });
  // };

  render() {
    const { one } = this.props;
    return (
      <div>
        <Card>
          <CardHeader color="primary" title="Slider" subheader="Slider info" />
          <CardBody>
            <div>
              <TextField
                name="slider_name"
                id="slider-name"
                fullWidth
                placeholder="Slider Name"
                inputProps={{
                  value: one.slider_name,
                  onChange: this.handleChange('slider_name'),
                }}
              />
            </div>
            <div>
              <TextField
                name="slider_key"
                id="slider-key"
                fullWidth
                placeholder="Slider Key"
                inputProps={{
                  value: one.slider_key,
                  onChange: this.handleChange('slider_key'),
                }}
              />
            </div>
            {/* <div>
                    <Dropzone onDrop={files => this.onDrop(files, 'images')} multiple={true} />
                  </div> */}
            {/* <div>
                  {one.images.map((each, index) => (
                    <div key={`${index}-added`} >
                    <img src={each.preview}/>
                    <CustomInput
                      name="caption"
                      id="caption"
                      fullWidth={true}
                      placeholder="Caption"
                      inputProps={{
                        value: each.caption,
                        onChange: this.handleChange('caption'),
                      }}
                    />
                    </div>
                  ))}
                </div> */}
          </CardBody>
          <CardFooter>
            <Fab color="primary" onClick={this.handleSave}>
              Save
            </Fab>
            <Fab color="secondary" onClick={this.handleGoBack}>
              Back
            </Fab>
          </CardFooter>
        </Card>
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

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);
export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(AddEdit);
