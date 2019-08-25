/**
 *
 * Breadcrumb
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import Crumb from './Crumb';

const Breadcrumb = ({ location: { pathname } }) => {
  const subPaths = pathname.split('/').filter(each => !!each);
  let tempPathname = pathname;
  const breadcrumbs = subPaths
    .map(() => {
      const breadcrumb = {
        path: `${tempPathname}`,
        label: tempPathname.substring(tempPathname.lastIndexOf('/') + 1),
      };
      tempPathname = tempPathname.substring(0, tempPathname.lastIndexOf('/'));
      return breadcrumb;
    })
    .reverse();
  return (
    <ul>
      {breadcrumbs.map(link => {
        if (link.path === '/admin') return <Crumb key={link.path}>Home</Crumb>;
        if (link.path.endsWith('edit') || link.path.endsWith('access'))
          return null;
        return (
          <Crumb key={link.path}>
            <Link to={link.path}>{link.label}</Link>
          </Crumb>
        );
      })}
    </ul>
  );
};

Breadcrumb.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(Breadcrumb);
