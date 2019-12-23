import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  IconButton,
  Checkbox,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBack';
import reducer from '../reducer';
import saga from '../saga';
import * as mapDispatchToProps from '../actions';
import { DATE_FORMAT } from '../../../App/constants';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import PageContent from '../../../../components/PageContent/PageContent';
import Loading from '../../../../components/Loading';
import {
  makeSelectOne,
  makeSelectLoading,
  makeSelectErrors,
  makeSelectSubMenu,
  makeSelectShowSubMenu,
  makeSelectCategory,
} from '../selectors';

import SidebarCategoriesList from './SideBarCategoriesList';
import WECkEditior from '../../../../components/CkEditor';

const styles = {
  backbtn: {
    padding: 0,
    height: '40px',
    width: '40px',
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: '50%',
    marginRight: '5px',
  },
};
const key = 'menuManage';

const AddEdit = props => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    props.showSubMenu(false);
    props.clearErrors();
    props.clearOne();
    if (props.match.params && props.match.params.id) {
      // props.loadMenuRequest(props.match.params.id);
      props.loadOneRequest(props.match.params.id);
    }
  }, []);

  const handleCheckedChange = name => event => {
    event.persist();
    // if (index) {
    props.setOneValue({ key: name, value: event.target.checked });
    // }
    // props.setOneValue({ key: name, value: event.target.checked });
  };

  const handleCheckedChildChange = name => event => {
    event.persist();
    // if (index) {
    props.setChildValue({ key: name, value: event.target.checked });
    // }
    // props.setOneValue({ key: name, value: event.target.checked });
  };

  const handleChange = name => event => {
    event.persist();
    // if (index) {
    props.setOneValue({ key: name, value: event.target.value });
    // }
    // props.setOneValue({ key: name, value: event.target.value });
  };
  // const handleCheckedChange = name => event => {
  //   event.persist();
  //   props.setOneValue({ key: name, value: !event.target.value });
  // };

  // const handleDateChange = name => date => {
  //   props.setOneValue({
  //     key: name,
  //     value: moment(date).format(DATE_FORMAT),
  //   });
  // };

  const handleChildChange = name => event => {
    event.persist();
    // if (index) {
    props.setChildValue({ key: name, value: event.target.value });
    // }
    // props.setOneValue({ key: name, value: event.target.value });
  };

  const handleGoBack = () => {
    props.push('/admin/menu-manage');
  };

  const handleSave = () => {
    props.addEditRequest();
  };

  const handleChildSave = () => {
    props.addEditChildRequest();
    props.clearErrors();
  };

  const handleAddChildMenuSave = () => {
    props.addEditRequest2();
  };

  // const handleSubMenuAdd = () => {
  //   props.addSubMenu();
  // };

  const handleTitleChange = event => {
    const {
      target: { value },
    } = event;
    props.setOneValue({ key: 'title', value });
    const url = value
      .trim()
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace('.', '')
      .replace('?', '')
      .replace('\\', '')
      .replace('/', '')
      .replace(',', '')
      .replace('*', '')
      .replace('+', '')
      .replace('(', '')
      .replace(')', '')
      .replace('!', '')
      .replace('#', '')
      .replace('@', '');
    props.setOneValue({ key: 'key', value: url });
  };

  const {
    one,
    classes,
    match,
    loading,
    errors,
    subMenu,
    showSubMenuBool,
    category,
  } = props;
  console.log('showSubMenu', showSubMenuBool);
  console.log('subMenu', subMenu);

  const getCategoryDropDown = () => {
    let childContent = [];

    const resetChildContent = () => {
      childContent = [];
    };
    const getChildCategory = (parentObj, depth) => {
      if (parentObj.child_menu.length) {
        parentObj.child_menu.map(childElement => {
          childContent.push(
            <option
              className="ml-2"
              key={childElement._id}
              disabled={depth >= 3}
              value={childElement.parent_menu}
            >
              {'-'.repeat(depth) + childElement.title}
            </option>,
          );
          if (childElement.child_menu && childElement.child_menu.length) {
            return getChildCategory(childElement, depth + 1);
          }
        });
        return childContent;
      }
      return [];
    };
    return (
      <select
        className="inputbox"
        value={subMenu.parent_menu}
        name="parent_category"
        onChange={handleChildChange('parent_menu')}
        // onBlur={handleChildChange('parent_menu')}
      >
        <option disabled="" value="">
          Parent Category
        </option>
        {category.map(each => (
          <>
            {/* <option key={each._id} disabled="" value={each._id}>
              {`${each.title}weeee`}
            </option> */}
            {each.child_menu && each.child_menu.length > 0
              ? //  && each.child_menu[0]._id !== ''
                (resetChildContent(),
                getChildCategory(each, 1).map(eachChild => eachChild))
              : null}
          </>
        ))}
      </select>
    );
  };

  return loading && loading == true ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <title>
          {match && match.params && match.params.id ? 'Edit Menu' : 'Add Menu'}
        </title>
      </Helmet>
      <div>
        <div className="flex justify-between mt-3 mb-3">
          <PageHeader>
            <IconButton
              className={`${classes.backbtn} cursor-pointer`}
              onClick={handleGoBack}
              aria-label="Back"
            >
              <BackIcon />
            </IconButton>
            {match && match.params && match.params.id
              ? showSubMenuBool
                ? 'Edit Sub Menu'
                : 'Edit Menu'
              : showSubMenuBool
              ? 'Add Sub Menu'
              : 'Add Menu'}
          </PageHeader>
        </div>
        <PageContent>
          <>
            {showSubMenuBool ? (
              <div className="mt-3">
                <div className="flex justify-between">
                  <div
                    className="bg-white rounded"
                    style={{ minWidth: '250px' }}
                  >
                    <SidebarCategoriesList />
                  </div>
                  <div className="flex-1 bg-white rounded ml-4 pb-4">
                    <div className="container mt-4">
                      <div className="w-full md:w-1/2 pb-4">
                        <label className="label" htmlFor="grid-last-name">
                          Title
                        </label>
                        <input
                          className="inputbox"
                          id="grid-last-name"
                          type="text"
                          value={subMenu.title || ''}
                          onChange={handleChildChange('title')}
                        />
                        {errors &&
                          errors.sub_menu_form &&
                          errors.sub_menu_form.title && (
                            <div id="component-error-text">
                              {errors.sub_menu_form.title}
                            </div>
                          )}
                      </div>
                      <div className="w-full md:w-1/2 pb-4">
                        <label className="label" htmlFor="grid-last-name">
                          URL
                        </label>
                        <input
                          className="inputbox"
                          id="grid-last-name"
                          type="text"
                          value={subMenu.url || ''}
                          onChange={handleChildChange('url')}
                        />
                        {errors &&
                          errors.sub_menu_form &&
                          errors.sub_menu_form.url && (
                            <div id="component-error-text">
                              {errors.sub_menu_form.url}
                            </div>
                          )}
                      </div>
                      <div className="w-full md:w-1/2 pb-4">
                        <label className="label" htmlFor="grid-last-name">
                          Order
                        </label>
                        <input
                          className="inputbox"
                          id="grid-last-name"
                          type="text"
                          value={subMenu.order || ''}
                          onChange={handleChildChange('order')}
                        />
                        {errors &&
                          errors.sub_menu_form &&
                          errors.sub_menu_form.order && (
                            <div id="component-error-text">
                              {errors.sub_menu_form.order}
                            </div>
                          )}
                      </div>
                      <div className="flex flex-wrap justify-between px-2">
                        <div className="w-full md:w-1/2 pb-4 -ml-2">
                          <label className="label" htmlFor="grid-last-name">
                            Category
                          </label>
                          {getCategoryDropDown()}

                          {/* <div id="component-error-text">{errors.title}</div> */}
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 ">
                        <Checkbox
                          color="primary"
                          checked={subMenu.is_active || false}
                          name="is_active"
                          onChange={handleCheckedChildChange('is_active')}
                        />
                        <label className="label" htmlFor="grid-last-name">
                          Is Active
                        </label>
                      </div>
                      <div className="w-full md:w-1/2 pb-4">
                        <label className="label" htmlFor="grid-last-name">
                          Link Type
                        </label>
                        <select
                          className="inputbox"
                          id="product_type"
                          // value={
                          //   listProductTypeNormalized[generalInfo.product_type] ||
                          //   null
                          // }
                          value={subMenu.is_internal}
                          name="is_internal"
                          onChange={handleChildChange('is_internal')}
                        >
                          <option value>Same Site</option>
                          <option value={false}>Other Site</option>
                        </select>
                        {/* <input
                        className="inputbox"
                        id="grid-last-name"
                        type="text"
                        value={one.title || ''}
                        onChange={handleChange('title', null)}
                      /> */}
                        {errors && errors.title && (
                          <div id="component-error-text">
                            {errors.is_internal}
                          </div>
                        )}
                      </div>
                      <div className="w-full md:w-1/2 pb-4">
                        <label className="label" htmlFor="grid-last-name">
                          Target
                        </label>
                        <select
                          className="inputbox"
                          id="product_type"
                          // value={
                          //   listProductTypeNormalized[generalInfo.product_type] ||
                          //   null
                          // }
                          value={subMenu.target}
                          name="target"
                          onChange={handleChildChange('target')}
                        >
                          <option value="_blank">_blank</option>
                          <option value="_self">_self</option>
                          <option value="_top">_top</option>
                          <option value="_parent">_parent</option>
                        </select>
                        {/* <input
                        className="inputbox"
                        id="grid-last-name"
                        type="text"
                        value={one.title || ''}
                        onChange={handleChange('title', null)}
                      /> */}
                        {errors && errors.title && (
                          <div id="component-error-text">{errors.target}</div>
                        )}
                      </div>
                      <button
                        type="button"
                        className="py-2 px-6 rounded mt-4 text-sm text-white bg-primary uppercase btn-theme"
                        onClick={handleChildSave}
                      >
                        {/* chid save button */}
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="w-full md:w-1/2 pb-4">
                  <label className="label" htmlFor="grid-last-name">
                    Title
                  </label>
                  <input
                    className="inputbox"
                    id="grid-last-name"
                    type="text"
                    value={one.title || ''}
                    onChange={handleTitleChange}
                  />
                  {errors && errors.title && (
                    <div id="component-error-text">{errors.title}</div>
                  )}
                </div>

                <div className="w-full md:w-1/2 pb-4">
                  <label className="label" htmlFor="grid-last-name">
                    Key
                  </label>
                  <input
                    className="inputbox"
                    id="grid-last-name"
                    type="text"
                    value={one.key || ''}
                    onChange={handleChange('key')}
                  />
                  {errors && errors.key && (
                    <div id="component-error-text">{errors.key}</div>
                  )}
                </div>

                <div className="w-full md:w-1/2 pb-4">
                  <label className="label" htmlFor="grid-last-name">
                    Order
                  </label>
                  <input
                    className="inputbox"
                    id="grid-last-name"
                    type="number"
                    value={one.order || ''}
                    onChange={handleChange('order')}
                  />
                  {errors && errors.title && (
                    <div id="component-error-text">{errors.order}</div>
                  )}
                </div>
                <div className="w-full md:w-1/2 pb-4">
                  <Checkbox
                    color="primary"
                    checked={one.is_active || false}
                    name="is_active"
                    onChange={handleCheckedChange('is_active', null)}
                  />
                  <label className="label" htmlFor="grid-last-name">
                    Is Active
                  </label>
                </div>

                <button
                  type="button"
                  className="btn bg-primary hover:bg-secondary mr-2"
                  onClick={handleAddChildMenuSave}
                >
                  Add Child Menu
                </button>

                <button
                  type="button"
                  className="btn bg-primary hover:bg-secondary"
                  onClick={handleSave}
                >
                  Save
                </button>
              </>
            )}
          </>
        </PageContent>
      </div>
    </>
  );
};

const withStyle = withStyles(styles);

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
  subMenu: makeSelectSubMenu(),
  showSubMenuBool: makeSelectShowSubMenu(),
  category: makeSelectCategory(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

AddEdit.propTypes = {
  // loadOneRequest: PropTypes.func.isRequired,
  addEditRequest: PropTypes.func.isRequired,
  setOneValue: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  // classes: PropTypes.object.isRequired,
  one: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
};
export default compose(
  withRouter,
  withStyle,
  withConnect,
)(AddEdit);
