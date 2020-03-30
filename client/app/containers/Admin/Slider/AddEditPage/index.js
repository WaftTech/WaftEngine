/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { Helmet } from 'react-helmet';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOne,
  makeSelectMedia,
  makeSelectLoading,
  makeSelectErrors,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import { IMAGE_BASE } from '../../../App/constants';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import PageContent from '../../../../components/PageContent/PageContent';
import Loading from '../../../../components/Loading';
import MediaElement from '../../../../components/MediaElement';
import EditorFileSelect from '../../../EditorFileSelect';
import Input from '../../../../components/customComponents/Input';

const styles = () => ({
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
  backbtn: {
    padding: 0,
    height: '40px',
    width: '40px',
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: '50%',
    marginRight: '5px',
  },
});

const SortableImageItem = SortableElement(() => <div>***</div>);

const SortableImageList = SortableContainer(({ items, _this }) => {
  return (
    <div className="rounded mt-4">
      {items.map((value, index) => (
        <div key={`${value._id}-item-image-${index}`}>
          <SortableImageItem index={index} value={value} _this={_this} />
          <div className="flex justify-between mb-4 bg-white shadow p-2 items-center px-8">
            <div className="w-1/4 text-center -ml-8">
              {value.image ? (
                <img
                  className={_this.props.classes.media}
                  src={
                    typeof value.image === 'string'
                      ? `${IMAGE_BASE}${_this.state.files[value.image].path}`
                      : `${IMAGE_BASE}${value.image.path}`
                  }
                  onClick={_this.handleSetImage(index)}
                />
              ) : (
                // <MediaElement
                //   mediaKey={
                //     typeof value.image === 'string'
                //       ? value.image
                //       : value.image._id
                //   }
                //   onClick={_this.handleSetImage(index)}
                // />
                <button
                  type="button"
                  className="bg-gray-300 py-2 px-4 rounded text-gray-800 hover:bg-gray-300 border"
                  onClick={_this.handleSetImage(index)}
                >
                  Click To Set Image
                </button>
              )}
            </div>

            <div className="w-1/4 text-center mr-2">
              <input
                className="inputbox"
                id={`slider-link-${index}`}
                type="text"
                value={value.link || ''}
                placeholder="Link"
                onChange={_this.handleImageLinkChange(index)}
                style={{ background: '#FFF', height: '100%' }}
              />
            </div>
            <div className="w-1/4 text-center">
              <textarea
                className="inputbox"
                id={`slider-caption-${index}`}
                type="text"
                value={value.caption || ''}
                placeholder="Caption"
                onChange={_this.handleImageCaptionChange(index)}
                style={{ background: '#FFF', height: '100%' }}
              />
            </div>
            <div className="w-1/4 -mr-8 text-center">
              <button
                type="button"
                className="px-1 text-center leading-none"
                onClick={() => _this.handleRemoveSlide(index)}
              >
                <i className="material-icons text-base text-red-400 hover:text-red-600">
                  delete
                </i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
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
    errors: PropTypes.object.isRequired,
    media: PropTypes.shape({
      data: PropTypes.array.isRequired,
      page: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired,
      totaldata: PropTypes.number.isRequired,
    }),
    clearErrors: PropTypes.func.isRequired,
    history: PropTypes.shape({
      goBack: PropTypes.func,
    }),
    loading: PropTypes.bool.isRequired,
  };

  state = {
    open: false,
    index: -1,
    files: {},
    fullWidth: true,
    maxWidth: 'lg',
  };

  componentDidMount() {
    this.props.clearErrors();
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOneRequest(this.props.match.params.id);
    }
    // this.props.loadMediaRequest();
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

  handleImageLinkChange = index => event => {
    event.persist();
    const tempImages = [...this.props.one.images];
    tempImages[index].link = event.target.value;
    this.props.setOneValue({ key: 'images', value: tempImages });
  };

  handleImageImageChange = file => {
    // console.log(id);
    // debugger;
    const tempImages = [...this.props.one.images];
    tempImages[this.state.index].image = file._id;
    this.props.setOneValue({ key: 'images', value: tempImages });
    this.setState(state => ({
      open: false,
      index: -1,
      files: { ...state.files, [file._id]: file },
    }));
  };

  handleAddSlide = () => {
    const tempImages = [...this.props.one.images];
    const newSlide = { image: '', link: '', caption: '' };
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
    this.props.addEditRequest(this.props.history.goBack);
  };

  handleImagePagination = query => {
    this.props.loadMediaRequest(query);
  };

  onImageSortEnd = ({ oldIndex, newIndex }) => {
    this.props.setOneValue({
      key: 'images',
      value: arrayMove(this.props.one.images, oldIndex, newIndex),
    });
  };

  render() {
    const { one, classes, media, match, loading, errors } = this.props;
    // media next prev logic
    const lastPage = Math.ceil(media.totaldata / media.size);
    const firstPage = 1;
    const isFirstPage = media.page === firstPage;
    const isLastPage = media.page === lastPage;

    return loading ? (
      <Loading />
    ) : (
      <>
        <div className="flex justify-between mt-3 mb-3">
          <PageHeader>
            <IconButton
              className={`${classes.backbtn} cursor-pointer`}
              onClick={this.handleGoBack}
              aria-label="Back"
            >
              <BackIcon />
            </IconButton>
            {match && match.params && match.params.id
              ? 'Edit Slider'
              : 'Add Slider'}
          </PageHeader>
        </div>
        <Dialog
          className={classes.modal}
          aria-labelledby="max-width-dialog-title"
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
        >
          <DialogTitle id="htmlForm-dialog-title">Select Media</DialogTitle>
          <DialogContent>
            {/* {media.data.map((each, index) => (
              <div
                key={each._id}
                className={classes.media}
                onClick={() => this.handleImageImageChange(each._id)}
                onKeyDown={() => this.handleImageImageChange(each._id)}
                role="menuitem"
                tabIndex={index}
              >
                <img src={`${IMAGE_BASE}${each.path}`} alt={each.caption} />
              </div>
            ))} */}
            <EditorFileSelect
              location={location}
              selectFile={file => this.handleImageImageChange(file)}
            />
          </DialogContent>
        </Dialog>

        <Helmet>
          <title>
            {match && match.params && match.params.id
              ? 'Edit Slider'
              : 'Add Slider'}
          </title>
        </Helmet>
        <PageContent>
          <div className="w-full md:w-1/2 pb-4">
            <Input
              label="Slider Name"
              inputclassName="inputbox"
              inputid="slider-name"
              inputType="text"
              value={one.slider_name}
              name="slider_name"
              onChange={this.handleChange('slider_name')}
              error={errors.slider_name}
            />
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <Input
              label="Slider Key"
              inputclassName="inputbox"
              inputid="slider-key"
              inputType="text"
              value={one.slider_key}
              name="slider_key"
              onChange={this.handleChange('slider_key')}
              error={errors.slider_key}
            />
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label className="font-bold text-gray-700" htmlFor="grid-last-name">
              Slider Settings
            </label>
            <textarea
              name="slider settings"
              id="slider_setting"
              className="inputbox"
              cols="50"
              rows="5"
              onChange={this.handleChange('settings')}
              value={one.settings || ''}
            />
          </div>

          <button
            type="button"
            className="block btn bg-info hover:bg-secondary"
            onClick={this.handleAddSlide}
          >
            Add Slide
          </button>
          <div>
            <SortableImageList
              items={one.images}
              _this={this}
              onSortEnd={this.onImageSortEnd}
            />
          </div>
          <button
            type="button"
            className="block btn bg-primary hover:bg-secondary"
            onClick={this.handleSave}
          >
            Save
          </button>
        </PageContent>
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
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
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
