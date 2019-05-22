/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardBody from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Modal from '@material-ui/core/Modal';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import MediaElement from '../../../components/MediaElement';
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectOne, makeSelectMedia } from '../selectors';
import * as mapDispatchToProps from '../actions';
import { IMAGE_BASE } from '../../App/constants';

const styles = theme => ({
  modal: { backgroundColor: '#fff', padding: '20' },
  media: {
    width: '100px',
    height: '100px',
    overflow: 'hidden',
    marginRight: '20px',
    marginBottom: '20px',
    borderRadius: '6px',
    background: '#f0f0f0',
    display: 'inline-block',
    '& > img': { maxWidth: '100%' },
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

  state = { open: false, index: -1, subheader: 'Slider Add' };

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOneRequest(this.props.match.params.id);
      this.setState({ subheader: 'Slider Edit' });
    }
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

  onDragEnd = result => {
    //
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
    const { subheader } = this.state;

    // media next prev logic
    const lastPage = Math.ceil(media.totaldata / media.size);
    const firstPage = 1;
    const isFirstPage = media.page === firstPage;
    const isLastPage = media.page === lastPage;
    return (
      <>
        <Dialog
          className={classes.modal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #ccc',
              marginBottom: '20px',
            }}
          >
            <DialogTitle id="htmlForm-dialog-title">Select Media</DialogTitle>
            <div>
              {' '}
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
            </div>
          </div>
          <DialogContent>
            {media.data.map(each => (
              <div
                key={each._id}
                className={classes.media}
                onClick={() => this.handleImageImageChange(each._id)}
              >
                <img src={`${IMAGE_BASE}${each.path}`} alt={each.caption} />
              </div>
            ))}
          </DialogContent>
        </Dialog>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Card>
            <CardHeader color="primary" title="Slider" subheader={subheader} />
            <CardBody>
              <div>
                <TextField
                  variant="outlined"
                  name="slider_name"
                  id="slider-name"
                  fullWidth
                  margin="normal"
                  label="Slider Name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    value: one.slider_name,
                    onChange: this.handleChange('slider_name'),
                  }}
                />
              </div>
              <div>
                <TextField
                  variant="outlined"
                  name="slider_key"
                  id="slider-key"
                  fullWidth
                  margin="normal"
                  label="Slider Key"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    value: one.slider_key,
                    onChange: this.handleChange('slider_key'),
                  }}
                />
              </div>
              <div>
                <textarea
                  placeholder="Slider Settings"
                  name="slider settings"
                  id="slider_setting"
                  cols="50"
                  rows="8"
                  onChange={this.handleChange('settings')}
                  value={one.settings || ''}
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleAddSlide}
              >
                Add Slide
              </Button>
              <Droppable droppableId="slider-droppable">
                {(provided) => {
                  one.images.map((each, index) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        marginTop: 20,
                        padding: 20,
                        background: '#f0f0f0',
                        borderRadius: '6px',
                      }}
                      key={`${each._id}-media-${index}`}
                    >
                      <Draggable
                        draggableId={each.image.filename}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <Grid item xs={3} style={{ textAlign: 'center' }}>
                              {each.image ? (
                                <img
                                  src={`${IMAGE_BASE}public/300-300/media/${
                                    each.image.filename
                                  }`}
                                />
                              ) : (
                                <Button
                                  color="primary"
                                  onClick={this.handleSetImage(index)}
                                >
                                  Add Image
                                </Button>
                              )}
                            </Grid>
                            <Grid item xs={7}>
                              <TextField
                                variant="outlined"
                                fullWidth
                                multiline
                                rows="2"
                                id={`slider-caption-${index}`}
                                label="Caption"
                                value={each.caption}
                                onChange={this.handleImageCaptionChange(index)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <IconButton
                                color="secondary"
                                onClick={() => this.handleRemoveSlide(index)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Grid>
                          </div>
                        )}
                      </Draggable>
                      {provided.placeholder}
                    </div>
                  ));
                }}
              </Droppable>
            </CardBody>
            <CardActions style={{ marginBottom: '100px' }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.handleGoBack}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSave}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </DragDropContext>
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
