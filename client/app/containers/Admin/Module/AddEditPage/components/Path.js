/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import TrashIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

const styles = {};

const Path = props => {
  const {
    each,
    classes,
    pathIndex,
    handleAccessTypeChange,
    handleAdminRoutesChange,
    handleRemoveAdminRoute,
    handleAddAdminRoute,
    handleServerRoutesMethodChange,
    handleServerRoutesRouteChange,
    handleRemoveServerRoute,
    handleAddServerRoute,
    handleRemovePath,
  } = props;
  return (
    <section className="rounded p-4 bg-grey-lighter mb-4">
      <div className="w-full md:w-2/5 pb-4">
        <label className="block uppercase tracking-wide text-grey-darker text-xs mb-2">
          Access Type
        </label>
        <input
          className="Waftinputbox"
          id={`${each._id}-access-type-${pathIndex}`}
          type="text"
          value={each.access_type}
          onChange={handleAccessTypeChange(pathIndex)}
          style={{ background: '#FFFFFF' }}
        />
      </div>

      <div className="flex justify-between mx-4">
        <div className="clientRoute w-1/2 -ml-4 border rounded p-2">
          {(each.admin_routes || []).map((eachAdminRoute, index) => (
            <div
              className="w-full pb-4 border-b mb-2"
              key={`${each._id}-${pathIndex}-each-admin-route-${index}`}
            >
              <label className="block uppercase tracking-wide text-grey-darker text-xs mb-2">
                Client Route
              </label>
              <div className="flex">
                <input
                  className="Waftinputbox mr-2"
                  id={`${each._id}-each-admin-route-access-type-${index}`}
                  type="text"
                  value={eachAdminRoute}
                  onChange={handleAdminRoutesChange(pathIndex, index)}
                  style={{ background: '#FFFFFF' }}
                />

                <IconButton
                  aria-label="Delete client route"
                  onClick={handleRemoveAdminRoute(pathIndex, index)}
                >
                  <TrashIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
          ))}

          <button
            className="text-waftprimary font-bold py-2 px-4 rounded border-2 border-waftprimary hover:text-white hover:bg-waftprimary"
            onClick={handleAddAdminRoute(pathIndex)}
          >
            Add Client Route
          </button>
        </div>
        <div className="serverRoute w-1/2 -mr-4 border rounded p-2">
          {(each.server_routes || []).map((eachServerRoute, index) => (
            <div
              className="w-full pb-4 mb-2 border-b"
              key={`${each._id}-${pathIndex}-${
                eachServerRoute._id
              }-each-server-route-${index}`}
            >
              <div className="flex">
                <div className="mr-2">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs mb-2">
                    Method
                  </label>

                  <select
                    className="Waftinputbox"
                    placeholder="Method"
                    value={eachServerRoute.method}
                    onChange={handleServerRoutesMethodChange(pathIndex, index)}
                    inputprops={{
                      name: 'Method',
                      id: `${each._id}-${
                        eachServerRoute._id
                      }-each-server-route-${index}-method`,
                    }}
                    style={{ minWidth: '80px', background: '#FFFFFF' }}
                  >
                    {methods.map(eachMethod => (
                      <option
                        key={`${eachMethod._id}-${pathIndex}-${
                          eachServerRoute._id
                        }-each-server-route-method-${eachMethod}`}
                        value={eachMethod}
                      >
                        {eachMethod}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block uppercase tracking-wide text-grey-darker text-xs mb-2">
                    Server Route
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      className="Waftinputbox mr-2"
                      style={{ background: '#FFFFFF' }}
                      id={`${each._id}-${
                        eachServerRoute._id
                      }-each-admin-server-route-route-access-type-${index}`}
                      value={eachServerRoute.route}
                      onChange={handleServerRoutesRouteChange(pathIndex, index)}
                    />
                    <IconButton
                      aria-label="Delete Server Route"
                      onClick={handleRemoveServerRoute(pathIndex, index)}
                    >
                      <TrashIcon fontSize="small" />
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            className="text-waftprimary font-bold py-2 px-4 rounded border-2 border-waftprimary hover:text-white hover:bg-waftprimary"
            onClick={handleAddServerRoute(pathIndex)}
          >
            Add Server Route
          </button>
        </div>
      </div>
      <div className="mx-4 flex justify-end mt-4">
        <button
          className="text-white py-2 px-4 rounded btn-waft"
          onClick={handleRemovePath(pathIndex)}
        >
          Delete Access Type
        </button>
      </div>
    </section>
  );
};

Path.propTypes = {
  each: PropTypes.object.isRequired,
  pathIndex: PropTypes.number.isRequired,
  handleAccessTypeChange: PropTypes.func.isRequired,
  handleAdminRoutesChange: PropTypes.func.isRequired,
  handleRemoveAdminRoute: PropTypes.func.isRequired,
  handleAddAdminRoute: PropTypes.func.isRequired,
  handleServerRoutesMethodChange: PropTypes.func.isRequired,
  handleServerRoutesRouteChange: PropTypes.func.isRequired,
  handleRemoveServerRoute: PropTypes.func.isRequired,
  handleAddServerRoute: PropTypes.func.isRequired,
  handleRemovePath: PropTypes.func.isRequired,
};

const withStyle = withStyles(styles);

export default compose(
  withRouter,
  withStyle,
)(Path);
