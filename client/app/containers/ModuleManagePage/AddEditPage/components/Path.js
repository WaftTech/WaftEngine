import React from 'react';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TrashIcon from '@material-ui/icons/Delete';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import GridContainer from 'components/Grid/GridContainer';

import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import CustomInput from 'components/CustomInput/CustomInput';
import Button from 'components/CustomButtons/Button';
// import { makeSelectOne } from '../../selectors';

const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

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

const Path = props => {
  const {
    each,
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
    <Card>
      <CardBody>
        <GridContainer>
          <GridItem md={3}>
            <CustomInput
              className="mt-0"
              labelText="Access Type"
              id={`${each._id}-access-type`}
              formControlProps={{
                fullWidth: false,
              }}
              inputProps={{
                value: each.access_type,
                onChange: handleAccessTypeChange(each._id),
              }}
            />
          </GridItem>
          <GridItem md={3}>
            <ul className="customUL">
              {(each.admin_routes || []).map((eachAdminRoute, index) => (
                <li key={`${each._id}-${pathIndex}-each-admin-route-${index}`}>
                  <CustomInput
                    labelText="Client Route"
                    id={`${each._id}-each-admin-route-access-type-${index}`}
                    formControlProps={{
                      fullWidth: false,
                    }}
                    inputProps={{
                      value: eachAdminRoute,
                      onChange: handleAdminRoutesChange(each._id, index),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Delete client route"
                            onClick={handleRemoveAdminRoute(each._id, index)}
                          >
                            <TrashIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </li>
              ))}
            </ul>
            <Button size="sm" aria-label="Add Client Route" onClick={handleAddAdminRoute(each._id)}>
              Add Client Route
            </Button>
          </GridItem>
          <GridItem md={6}>
            <ul className="customUL">
              {(each.server_routes || []).map((eachServerRoute, index) => (
                <li
                  key={`${each._id}-${pathIndex}-${eachServerRoute._id}-each-server-route-${index}`}
                >
                  <FormControl className="selectbox methodInput">
                    <InputLabel
                      htmlFor={`${each._id}-${
                        eachServerRoute._id
                        }-each-server-route-${index}-method`}
                    >
                      Method
                    </InputLabel>

                    <Select
                      placeholder="Method"
                      value={eachServerRoute.method}
                      onChange={handleServerRoutesMethodChange(each._id, index)}
                      inputProps={{
                        name: 'Method',
                        id: `${each._id}-${eachServerRoute._id}-each-server-route-${index}-method`,
                      }}
                    >
                      {methods.map(each => (
                        <MenuItem
                          key={`${each._id}-${pathIndex}-${
                            eachServerRoute._id
                            }-each-server-route-method-${each}`}
                          value={each}
                        >
                          {each}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <CustomInput
                    labelText="Server Route"
                    id={`${each._id}-${
                      eachServerRoute._id
                      }-each-admin-server-route-route-access-type-${index}`}
                    formControlProps={{
                      fullWidth: false,
                    }}
                    inputProps={{
                      value: eachServerRoute.route,
                      onChange: handleServerRoutesRouteChange(each._id, index),
                    }}
                  />
                  <IconButton
                    aria-label="Delete Server Route"
                    onClick={handleRemoveServerRoute(each._id, index)}
                  >
                    <TrashIcon fontSize="small" />
                  </IconButton>
                </li>
              ))}
            </ul>
            <Button
              size="sm"
              aria-label="Add Server Route"
              onClick={handleAddServerRoute(pathIndex)}
            >
              Add Server Route
            </Button>
          </GridItem>
        </GridContainer>
      </CardBody>
      <CardFooter>
        <IconButton
          className="btn-circle"
          color="secondary"
          aria-label="Delete"
          onClick={handleRemovePath(pathIndex)}
        >
          <TrashIcon size="small" />
        </IconButton>
      </CardFooter>
    </Card>
  );
};

const withStyle = withStyles(styles);

const mapStateToProps = createStructuredSelector({
  // one: makeSelectOne(),
  // path: makeSelectPath,
});

const mapDispatchToProps = dispatch => ({
  // loadOne: payload => dispatch(loadOneRequest(payload)),
  // addEdit: payload => dispatch(addEditRequest(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withRouter,
  withStyle,
  withConnect,
)(Path);
