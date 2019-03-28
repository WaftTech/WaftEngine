/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardBody from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import MediaElement from '../../../components/MediaElement';

import reducer from '../reducer';
import saga from '../saga';
import { makeSelectOne, makeSelectMedia } from '../selectors';
import * as mapDispatchToProps from '../actions';
import { IMAGE_BASE } from '../../App/constants';

const styles = theme => ({
  paper: {
    position: 'absolute',
    // width: '90%',
    // height: '70%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
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
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

class AddEdit extends React.PureComponent {
  static propTypes = {
    loadOneRequest: PropTypes.func.isRequired,
    loadMediaRequest: PropTypes.func.isRequired,
    addEditRequest: PropTypes.func.isRequired,
    setOneValue: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    classes: PropTypes.object.isRequired, 
    one: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    media: PropTypes.shape({
      data: PropTypes.array.isRequired,
      page: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired,
      totaldata: PropTypes.number.isRequired,
    }),
  };

  state = { open: false, index: -1 };

  componentDidMount() {
    this.props.loadOneRequest(this.props.match.params.id);
    this.props.loadMediaRequest();
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.value });
  };

  handleImageCaptionChange = index => event => {
    event.persist();
    const tempImages = [...this.props.one.images];
    tempImages[index].caption = event.target.value;
    this.props.setOneValue({ key: 'images', value: tempImages });
  };

  handleImageImageChange = id => {
    const tempImages = [...this.props.one.images];
    tempImages[this.state.index].image = id;
    this.props.setOneValue({ key: 'images', value: tempImages });
    this.setState({ open: false, index: -1 });
  };

  handleAddSlide = () => {
    const tempImages = [...this.props.one.images];
    const newSlide = { image: '', caption: '' };
    this.props.setOneValue({
      key: 'images',
      value: [newSlide, ...tempImages],
    });
  };

  handleRemoveSlide = index => {
    const tempImages = [...this.props.one.images];
    this.props.setOneValue({
      key: 'images',
      value: [...tempImages.slice(0, index), ...tempImages.slice(index + 1)],
    });
  };

  handleSetImage = index => () => {
    this.setState({ open: true, index });
  };

  handleGoBack = () => {
    this.props.push('/admin/slider-manage');
  };

  handleSave = () => {
    this.props.addEditRequest();
  };

  handleImagePagination = query => {
    this.props.loadMediaRequest(query);
  };

  render() {
    const { one, classes, media } = this.props;

    // media next prev logic
    const lastPage = Math.ceil(media.totaldata / media.size);
    const firstPage = 1;
    const isFirstPage = media.page === firstPage;
    const isLastPage = media.page === lastPage;
    return (
      <>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div
            style={{
              top: `${10}%`,
              left: `${10}%`,
              transform: `translate(-${10}%, -${10}%)`,
            }}
            className={classes.paper}
          >
            <Grid container>
              {media.data.map(each => (
                <Grid item key={each._id}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <img
                        className={classes.media}
                        src={`${IMAGE_BASE}${
                          each.path
                        }`}
                        alt={each.caption}
                      />
                    </CardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => this.handleImageImageChange(each._id)}
                      >
                        Select
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
              <Grid item>
                {!isFirstPage && (
                  <Button
                    size="small"
                    color="primary"
                    onClick={() =>
                      this.handleImagePagination({ page: media.page - 1 })
                    }
                  >
                    Prev
                  </Button>
                )}
                {!isLastPage && (
                  <Button
                    size="small"
                    color="primary"
                    onClick={() =>
                      this.handleImagePagination({ page: media.page + 1 })
                    }
                  >
                    Next
                  </Button>
                )}
              </Grid>
            </Grid>
          </div>
        </Modal>
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
            {one.images.map((each, index) => (
              <div key={`${each._id}-media-${index}`}>
                {each.image ? (
                  <Button onClick={this.handleSetImage(index)}>
                    <MediaElement mediaKey={each.image} />
                  </Button>
                ) : (
                  <Fab color="primary" onClick={this.handleSetImage(index)}>
                    Add Image
                  </Fab>
                )}
                <TextField
                  id={`slider-caption-${index}`}
                  placeholder="Caption"
                  value={each.caption}
                  onChange={this.handleImageCaptionChange(index)}
                />
                <Fab
                  color="primary"
                  onClick={() => this.handleRemoveSlide(index)}
                >
                  <DeleteIcon />
                </Fab>
              </div>
            ))}
            <Fab color="primary" onClick={this.handleAddSlide}>
              Add Slide
            </Fab>
          </CardBody>
          <CardActions>
            <Fab color="primary" onClick={this.handleSave}>
              Save
            </Fab>
            <Fab color="secondary" onClick={this.handleGoBack}>
              Back
            </Fab>
          </CardActions>
        </Card>
      </>
    );
  }
}

const withStyle = withStyles(styles);

const withReducer = injectReducer({ key: 'sliderManagePage', reducer });
const withSaga = injectSaga({ key: 'sliderManagePage', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  media: makeSelectMedia(),
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
