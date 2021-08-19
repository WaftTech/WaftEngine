import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { FaArrowLeft, FaTrashAlt, FaArrowsAlt, FaImage, FaCheck } from 'react-icons/fa';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import arrayMove from 'utils/arrayMove';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Loading from '../../../../components/Loading';
import PageContent from '../../../../components/PageContent/PageContent';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import { IMAGE_BASE } from '../../../App/constants';
import EditorFileSelect from '../../../EditorFileSelect';
import * as mapDispatchToProps from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectErrors,
  makeSelectLoading,
  makeSelectMedia,
  makeSelectOne,
} from '../selectors';
import lid from '../../../../assets/img/lid.svg';

import Dialog from '../../../../components/Dialog/index';
import CKEditor from 'react-ckeditor-component';

const DragHandle = SortableHandle(() => (
  <span className="hover:bg-blue-100 cursor-move w-8 h-8 inline-flex justify-center items-center rounded-full">
    <FaArrowsAlt className="text-base transform scale-110 text-blue-500" />
  </span>
));

const SortableImageItem = SortableElement(({ value }) => (
  <div className="bg-gray-50 rounded p-4 border"> {value}</div>
));

const SortableImageList = SortableContainer(({ items, _this }) => (
  <div>
    {items.map((value, index) => (
      <div
        key={`${value._id}-item-image-${index}`}
        className="bg-gray-200 rounded mt-2"
      >
        <SortableImageItem
          index={index}
          _this={_this}
          value={
            <>
              <div className="flex">
                <div className="w-1/4">

                  {value.image ? (
                    <div className="h-32 overflow-hidden" onClick={_this.handleSetImage(index)}>
                      <img
                        src={
                          typeof value.image === 'string'
                            ? `${IMAGE_BASE}${_this.state.files[value.image].path}`
                            : `${IMAGE_BASE}${value.image.path}`
                        }
                        className="object-fit"
                      /></div>
                  ) : (

                    <div className="bg-white border border-gray-300 hover:border-gray-400 flex items-center justify-center text-gray-300 hover:text-gray-500 h-32 cursor-pointer" onClick={_this.handleSetImage(index)}>
                      <FaImage className="text-4xl" />
                    </div>
                  )}
                  <input
                    className="inputbox rounded-none mt-1"
                    id={`slider-link-${index}`}
                    type="text"
                    value={value.link || ''}
                    onChange={_this.handleImageLinkChange(index)}
                    placeholder="Slider Link"
                  />
                </div>

                <div className="flex-1 px-2">
                  <CKEditor
                    name="Answer"
                    content={value && value.caption}
                    config={{
                      allowedContent: true,
                      toolbar_Basic: [['Source', '-', 'Bold', 'Italic']],
                      toolbar: 'Basic',
                      height: '99',
                    }}
                    events={{
                      change: e => _this.handleEditorChange(e, index, 'caption'),
                      value: (value && value.caption) || '',
                    }}
                  />
                </div>
                <div className="w-10 flex flex-col justify-center items-center py-px">
                  <DragHandle className="text-lg text-blue-500" />
                  <span
                    className="mt-4 w-8 h-8 inline-flex justify-center items-center leading-none cursor-pointer hover:bg-red-100 rounded-full relative trash-icon"
                    onClick={() => _this.handleRemoveSlide(index)}
                  >
                    <img className="trash-lid" src={lid} alt="trash-id" />
                    <span className="w-3 h-3 rounded-b-sm bg-red-500 mt-1" />
                  </span>
                </div>
              </div>
            </>
          }
        />
      </div>
    ))}
  </div>
));
class AddEdit extends React.PureComponent {
  static propTypes = {
    loadOneRequest: PropTypes.func.isRequired,
    loadMediaRequest: PropTypes.func.isRequired,
    addEditRequest: PropTypes.func.isRequired,
    setOneValue: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
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
    tempImages[index] = { ...tempImages[index], caption: event.target.value };
    this.props.setOneValue({ key: 'images', value: tempImages });
  };

  handleImageLinkChange = index => event => {
    event.persist();
    let tempImages = [...this.props.one.images];
    tempImages[index] = { ...tempImages[index], link: event.target.value };
    this.props.setOneValue({ key: 'images', value: tempImages });
  };

  handleImageImageChange = file => {
    let tempImages = [...this.props.one.images];
    tempImages[this.state.index] = {
      ...tempImages[this.state.index],
      image: file._id,
    };
    this.props.setOneValue({ key: 'images', value: tempImages });
    this.setState(state => ({
      open: false,
      index: -1,
      files: { ...state.files, [file._id]: file },
    }));
  };

  handleAddSlide = () => {
    let tempImages = [...this.props.one.images];
    let newSlide = { image: '', link: '', caption: '' };
    this.props.setOneValue({
      key: 'images',
      value: [newSlide, ...tempImages],
    });
  };

  handleRemoveSlide = index => {
    let tempImages = [...this.props.one.images];
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

  handleEditorChange = (e, index, name) => {
    const newContent = e.editor.getData();
    const tempImages = [...this.props.one.images];
    tempImages[index] = { ...tempImages[index], caption: newContent };
    this.props.setOneValue({ key: 'images', value: tempImages });
    // this.props.setOneValue({ key: name, value: newContent });
  };
  handleSliderChange = name => event => {
    event.persist();
    if (name === 'slidesPerRow') {
      if (Number(event.target.value) > 6) {
        this.props.setSliderValue({ key: name, value: 6 });
      } else if (Number(event.target.value) < 1) {
        this.props.setSliderValue({ key: name, value: 1 });
      } else {
        this.props.setSliderValue({
          key: name,
          value: Number(event.target.value),
        });
      }
    } else {
      this.props.setSliderValue({ key: name, value: event.target.value });
    }
  };

  handleCheckedChange = name => event => {
    event.persist();
    this.props.setSliderValue({ key: name, value: event.target.checked });
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
        <div className="flex justify-between my-3">
          <PageHeader>
            <span className="backbtn" onClick={this.handleGoBack}>
              <FaArrowLeft className="text-xl" />
            </span>
            {match && match.params && match.params.id
              ? 'Edit Slider'
              : 'Add Slider'}
          </PageHeader>
        </div>

        <Dialog
          className="w-5/6 h-full overflow-auto"
          open={this.state.open}
          onClose={this.handleClose}
          title={`Select Media`}
          body={
            <div>
              <EditorFileSelect
                location={location}
                selectFile={file => this.handleImageImageChange(file)}
              />
              <div className="mt-2 text-xs">
                Note: Please Double Click to open folder and select images.
              </div>
            </div>
          }
        />

        {/* <Dialog
            aria-labelledby="max-width-dialog-title"
            open={this.state.open}
            onClose={this.handleClose}
            fullWidth={this.state.fullWidth}
            maxWidth={this.state.maxWidth}
          >
            <DialogTitle id="htmlForm-dialog-title">Select Media</DialogTitle>
            <DialogContent>
              <EditorFileSelect
                location={location}
                selectFile={file => this.handleImageImageChange(file)}
              />
            </DialogContent>
          </Dialog> */}

        <Helmet>
          <title>
            {match && match.params && match.params.id
              ? 'Edit Slider'
              : 'Add Slider'}
          </title>
        </Helmet>
        <PageContent>
          <div className="w-full md:w-1/2 pb-4">
            <label>Slider Name</label>
            <input
              className="inputbox"
              id="slider-name"
              type="text"
              value={one.slider_name}
              name="slider_name"
              onChange={this.handleChange('slider_name')}
            />
            {errors && errors.slider_name && (
              <div className="error">{errors.slider_name}</div>
            )}
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label>Slider Key</label>
            <input
              className="inputbox"
              id="slider-key"
              type="text"
              value={one.slider_key}
              name="slider_key"
              onChange={this.handleChange('slider_key')}
            />
            {errors && errors.slider_key && (
              <div className="error">{errors.slider_key}</div>
            )}
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label>Responsive Settings</label>
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
          <div className="mb-2 py-2 px-2 bg-gray-100 relative">
            <h3 className="text-lg">Slider Settings</h3>
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="border px-2 py-1">Arrow</th>
                  <th className="border px-2 py-1">Dots</th>
                  <th className="border px-2 py-1">Slides To Show</th>
                  <th className="border px-2 py-1">Slides To Scroll</th>
                  <th className="border px-2 py-1">Slides Per Row</th>
                  <th className="border px-2 py-1">AutoPlay </th>
                  <th className="border px-2 py-1">AutoPlay Speed </th>
                  <th className="border px-2 py-1">Center Mode </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="align-middle text-center border px-2 py-1">
                    <div className="checkbox" style={{ marginRight: '0px' }}>
                      <input
                        onChange={this.handleCheckedChange('arrows', null)}
                        name="arrows"
                        checked={one.slider_setting.arrows || false}
                        id="arrow"
                        type="checkbox"
                      />
                      <label htmlFor="arrow">
                        <span className="box">
                          <FaCheck className="check-icon" />
                        </span>
                      </label>
                    </div>
                  </td>
                  <td className="align-middle text-center border px-2 py-1">
                    <div className="checkbox" style={{ marginRight: '0px' }}>
                      <input
                        onChange={this.handleCheckedChange('dots', null)}
                        checked={one.slider_setting.dots || false}
                        id="dots"
                        name="dots"
                        type="checkbox"
                      />
                      <label htmlFor="dots">
                        <span className="box">
                          <FaCheck className="check-icon" />
                        </span>
                      </label>
                    </div>
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      className="inputbox"
                      id="slidesToShow"
                      type="text"
                      value={one.slider_setting.slidesToShow}
                      name="slidesToShow"
                      onChange={this.handleSliderChange('slidesToShow')}
                      error={errors.slidesToShow}
                    />
                  </td>

                  <td className="border px-2 py-1">
                    {' '}
                    <input
                      className="inputbox"
                      id="slidesToScroll"
                      type="text"
                      value={one.slider_setting.slidesToScroll}
                      name="slidesToScroll"
                      onChange={this.handleSliderChange('slidesToScroll')}
                      error={errors.slidesToScroll}
                    />
                  </td>
                  <td className="border px-2 py-1">
                    {' '}
                    <input
                      className="inputbox"
                      id="slidesPerRow"
                      type="number"
                      value={one.slider_setting.slidesPerRow}
                      name="slidesPerRow"
                      onChange={this.handleSliderChange('slidesPerRow')}
                      error={errors.slidesPerRow}
                    />
                  </td>
                  <td className="align-middle text-center border px-2 py-1">
                    {' '}
                    {/* <Checkbox
                      color="primary"
                      checked={one.slider_setting.autoplay || false}
                      name="autoplay"
                      onChange={this.handleCheckedChange('autoplay', null)}
                      style={{ padding: '6px' }}
                    /> */}
                    <div className="checkbox" style={{ marginRight: '0px' }}>
                      <input
                        onChange={this.handleCheckedChange('autoplay', null)}
                        checked={one.slider_setting.autoplay || false}
                        id="autoplay"
                        name="autoplay"
                        style={{ padding: '6px' }}
                        type="checkbox"
                      />
                      <label htmlFor="autoplay">
                        <span className="box">
                          <FaCheck className="check-icon" />
                        </span>
                      </label>
                    </div>
                  </td>
                  <td className="border px-2 py-1">
                    {' '}
                    <input
                      className="inputbox"
                      id="autoplaySpeed"
                      type="number"
                      value={one.slider_setting.autoplaySpeed}
                      name="autoplaySpeed"
                      onChange={this.handleSliderChange('autoplaySpeed')}
                      error={errors.autoplaySpeed}
                    />
                  </td>
                  <td className="align-middle text-center border px-2 py-1">
                    {/* <Checkbox
                      color="primary"
                      checked={one.slider_setting.centerMode || false}
                      name="centerMode"
                      onChange={this.handleCheckedChange('centerMode', null)}
                      style={{ padding: '6px' }}
                    /> */}
                    <div className="checkbox" style={{ marginRight: '0px' }}>
                      <input
                        onChange={this.handleCheckedChange(
                          'centerMode',
                          null,
                        )}
                        checked={one.slider_setting.centerMode || false}
                        id="centerMode"
                        name="centerMode"
                        style={{ padding: '6px' }}
                        type="checkbox"
                      />
                      <label htmlFor="centerMode">
                        <span className="box">
                          <FaCheck className="check-icon" />
                        </span>
                      </label>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>


          <div>
            <SortableImageList
              items={one.images}
              _this={this}
              onSortEnd={this.onImageSortEnd}
              useDragHandle
            />
          </div>

          <button
            type="button"
            className="btn inline-flex items-center justify-center text-green-500 bg-green-100 border border-green-200 hover:bg-green-500 hover:border-green-500 mr-2 hover:text-white cursor-pointer"
            onClick={this.handleAddSlide}
          >
            Add Slide
          </button>

          <button
            type="button"
            className="inline-flex btn text-white bg-blue-500 border border-blue-600 hover:bg-blue-600"
            onClick={this.handleSave}
          >
            Save Slider
          </button>
        </PageContent>
      </>
    );
  }
}

const withReducer = injectReducer({ key: 'sliderManagePage', reducer });
const withSaga = injectSaga({ key: 'sliderManagePage', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  media: makeSelectMedia(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
});

const withConnect = connect(mapStateToProps, { ...mapDispatchToProps, push });
export default compose(withRouter, withReducer, withSaga, withConnect)(AddEdit);
