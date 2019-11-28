/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import withStyles from '@material-ui/core/styles/withStyles';
import TrashIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

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
    <section className="rounded py-1 bg-gray-100 mb-2">
      <div className="flex">
        <div className="w-full md:w-3/5 pb-1 px-4">
          <label className="block uppercase tracking-wide text-gray-800 text-xs mb-1 ">
            Access Type
          </label>
          <input
            className="inputbox bg-white"
            id={`${each._id}-access-type-${pathIndex}`}
            type="text"
            value={each.access_type}
            onChange={handleAccessTypeChange(pathIndex)}
          />
        </div>
        <div className="w-full md:w-2/5 text-right">
          <IconButton
            size="small"
            aria-label="Delete client route"
            onClick={handleRemovePath(pathIndex)}
          >
            <i className="material-icons text-red-600">close</i>
          </IconButton>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="clientRoute w-1/2 border-r">
          <label className="label border-b pl-4">
            Client Route
          </label>
          {(each.admin_routes || []).map((eachAdminRoute, index) => (
            <div
              className="w-full pb-1 pl-4"
              key={`${each._id}-${pathIndex}-each-admin-route-${index}`}
            >
              <div className="flex items-start">
                <input
                  className="inputbox mr-2"
                  id={`${each._id}-each-admin-route-access-type-${index}`}
                  type="text"
                  value={eachAdminRoute}
                  onChange={handleAdminRoutesChange(pathIndex, index)}
                  style={{ background: '#FFFFFF' }}
                />

                <span
                  aria-label="Delete client route"
                  onClick={handleRemoveAdminRoute(pathIndex, index)}
                >
                  <i className="material-icons text-red-500 cursor-pointer mr-2 mt-1">
                    delete
                  </i>
                  {/* <TrashIcon className="text-red-500 text-sm" /> */}
                </span>
              </div>
            </div>
          ))}
          <div className="border-t pt-1">
            <button
              className="py-1 px-2 text-sm rounded font-bold hover:text-black text-indigo-500  ml-4"
              onClick={handleAddAdminRoute(pathIndex)}
            >
              Add Client Route
            </button>
          </div>
        </div>
        <div className="serverRoute w-1/2 ">
          <div className="flex border-b mb-2">
            <label className=" uppercase tracking-wide text-gray-800 text-xs pl-4">
              Method
            </label>
            <label className=" uppercase tracking-wide text-gray-800 text-xs pl-16">
              Server Route
            </label>
          </div>
          {(each.server_routes || []).map((eachServerRoute, index) => (
            <div
              className="w-full pb-1 pl-4"
              key={`${each._id}-${pathIndex}-${
                eachServerRoute._id
              }-each-server-route-${index}`}
            >
              <div className="flex">
                <div className="mr-2">
                  <select
                    className="inputbox"
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
                <div className="flex items-start w-full">
                  <input
                    type="text"
                    className="inputbox mr-2 flex-1"
                    style={{ background: '#FFFFFF' }}
                    id={`${each._id}-${
                      eachServerRoute._id
                    }-each-admin-server-route-route-access-type-${index}`}
                    value={eachServerRoute.route}
                    onChange={handleServerRoutesRouteChange(pathIndex, index)}
                  />
                  <span onClick={handleRemoveServerRoute(pathIndex, index)}>
                    <i className="material-icons text-red-500 cursor-pointer mr-2 mt-1">
                      delete
                    </i>
                  </span>
                </div>
              </div>
            </div>
          ))}

          <div className="border-t pt-1">
            <button
              className="py-1 text-sm rounded font-bold hover:text-black text-indigo-500  ml-4"
              onClick={handleAddServerRoute(pathIndex)}
            >
              Add Server Route
            </button>
          </div>
        </div>
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
