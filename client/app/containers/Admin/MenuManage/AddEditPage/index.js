import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import reducer from '../reducer';
import saga from '../saga';
import * as mapDispatchToProps from '../actions';
import { DATE_FORMAT } from '../../../App/constants';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import PageContent from '../../../../components/PageContent/PageContent';
import Loading from '../../../../components/Loading';
import { FaCheck } from 'react-icons/fa';

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
import DeleteDialog from '../../../../components/DeleteDialog';
import { FaArrowLeft } from 'react-icons/fa';

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

  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteId] = useState('');

  const handleOpen = id => {
    setOpen(true);
    setDeleteId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = id => {
    props.deleteMenuItemRequest(id);
    setOpen(false);
  };

  const handleCheckedChange = name => event => {
    event.persist();
    props.setOneValue({ key: name, value: event.target.checked });
  };

  const handleCheckedChildChange = name => event => {
    event.persist();
    props.setChildValue({ key: name, value: event.target.checked });
  };

  const handleChange = name => event => {
    event.persist();
    props.setOneValue({ key: name, value: event.target.value });
  };

  const handleChildChange = name => event => {
    event.persist();
    props.setChildValue({ key: name, value: event.target.value });
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
              value={childElement._id}
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
      >
        <option disabled="" value="">
          Parent Category
        </option>
        {category.map((each, index) => (
          <React.Fragment key={`${each._id}-${index}`}>
            <option key={each._id} disabled="" value={each._id}>
              {`${each.title}`}
            </option>
            {each.child_menu && each.child_menu.length > 0
              ? (resetChildContent(),
                getChildCategory(each, 1).map(eachChild => eachChild))
              : null}
          </React.Fragment>
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
        <div className="flex justify-between my-3">
          <PageHeader>
            <span className="backbtn" onClick={handleGoBack}>
              <FaArrowLeft className="text-xl" />
            </span>
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
                            <div className="error">
                              {errors.sub_menu_form.title}
                            </div>
                          )}
                      </div>
                      <div className="w-full md:w-1/2 pb-4">
                        <label className="label" htmlFor="grid-last-name">
                          URL
                        </label>
                        {subMenu.url && (
                          <Link
                            to={`${subMenu.url}`}
                            className="ml-1 hover:text-primary cursor-pointer text-subprimary text-xs"
                            target="_blank"
                          >
                            ( open URL )
                          </Link>
                        )}
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
                            <div className="error">
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
                            <div className="error">
                              {errors.sub_menu_form.order}
                            </div>
                          )}
                      </div>
                        <div className="w-full md:w-1/2 pb-4">
                          <label className="label" htmlFor="grid-last-name">
                            Category
                          </label>
                          {getCategoryDropDown()}

                          {errors &&
                            errors.sub_menu_form &&
                            errors.sub_menu_form.parent_menu && (
                              <div className="error">
                                {errors.sub_menu_form.parent_menu}
                              </div>
                            )}
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

                        {errors && errors.title && (
                          <div className="error">{errors.is_internal}</div>
                        )}
                      </div>
                      <div className="w-full md:w-1/2 pb-4">
                        <label className="label" htmlFor="product_type">
                          Target
                        </label>
                        <select
                          className="inputbox"
                          id="product_type"
                          value={subMenu.target}
                          name="target"
                          onChange={handleChildChange('target')}
                        >
                          <option value="_self">_self</option>
                          <option value="_blank">_blank</option>
                          <option value="_top">_top</option>
                          <option value="_parent">_parent</option>
                        </select>
                        {errors && errors.title && (
                          <div className="error">{errors.target}</div>
                        )}
                      </div>
                      <div className="w-full md:w-1/2">
                        <div className="checkbox">
                          <input
                            checked={subMenu.is_active || false}
                            onChange={handleCheckedChildChange('is_active')}
                            id="is_active"
                            type="checkbox"
                          />
                          <label htmlFor="is_active">
                            <span className="box">
                              <FaCheck className="check-icon" />
                            </span>
                            Is Active
                          </label>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="py-2 px-6 rounded mt-4 text-sm text-white bg-primary uppercase btn-theme"
                        onClick={handleChildSave}
                      >
                        Save
                      </button>
                      {subMenu._id && (
                        <button
                          type="button"
                          className="py-2 px-6 rounded mt-4 text-sm text-white uppercase btn-theme ml-2 bg-danger"
                          onClick={() => handleOpen(subMenu._id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="w-full md:w-1/2 pb-4">
                  <label className="label" htmlFor="menu_title">
                    Title
                  </label>
                  <input
                    className="inputbox"
                    id="menu_title"
                    type="text"
                    value={one.title || ''}
                    onChange={handleTitleChange}
                  />
                  {errors && errors.title && (
                    <div className="error">{errors.title}</div>
                  )}
                </div>

                <div className="w-full md:w-1/2 pb-4">
                  <label className="label" htmlFor="menu_key">
                    Key
                  </label>
                  <input
                    className="inputbox"
                    id="menu_key"
                    type="text"
                    value={one.key || ''}
                    onChange={handleChange('key')}
                  />
                  {errors && errors.key && (
                    <div className="error">{errors.key}</div>
                  )}
                </div>

                <div className="w-full md:w-1/2 pb-4">
                  <label className="label" htmlFor="menu_order">
                    Order
                  </label>
                  <input
                    className="inputbox"
                    id="menu_order"
                    type="number"
                    value={one.order || ''}
                    onChange={handleChange('order')}
                  />
                  {errors && errors.title && (
                    <div className="error">{errors.order}</div>
                  )}
                </div>
                <div className="w-full md:w-1/2 pb-4">
                  <div className="checkbox">
                    <input
                      checked={one.is_active || false}
                      onClick={handleCheckedChange('is_active', null)}
                      id="is_active"
                      type="checkbox"
                    />
                    <label htmlFor="is_active">
                      <span className="box">
                        <FaCheck className="check-icon" />
                      </span>
                      Is Active
                    </label>
                  </div>{' '}
                </div>

                <button
                  type="button"
                  className="btn bg-blue-500 border border-blue-600 hover:bg-blue-600 mr-2"
                  onClick={handleAddChildMenuSave}
                >
                  Add Child Menu
                </button>

                <button
                  type="button"
                  className="btn bg-blue-500 border border-blue-600 hover:bg-blue-600"
                  onClick={handleSave}
                >
                  Save
                </button>
                {subMenu._id && (
                  <button
                    type="button"
                    className="btn-waft btn-red"
                    onClick={() => handleOpen(subMenu._id)}
                  >
                    Delete
                  </button>
                )}
              </>
            )}
          </>
          <DeleteDialog
            open={open}
            doClose={handleClose}
            doDelete={() => handleDelete(deleteID)}
          />
        </PageContent>
      </div>
    </>
  );
};

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
  withConnect,
)(AddEdit);
