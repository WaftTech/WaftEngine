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

const Breadcrumb = ({ location: { pathname }, routeList }) => {
  let breadcrumbs = [];
  if (routeList.length === 0) {
    const subPaths = pathname.split('/').filter(each => !!each);
    let tempPathname = pathname;
    breadcrumbs = subPaths
      .map(() => {
        const breadcrumb = {
          path: `${tempPathname}`,
          label: tempPathname.substring(tempPathname.lastIndexOf('/') + 1),
        };
        tempPathname = tempPathname.substring(0, tempPathname.lastIndexOf('/'));
        return breadcrumb;
      })
      .reverse();
  } else {
    breadcrumbs = routeList;
  }

  return (
    <nav className="bg-grey-lightest p-2 rounded font-sans w-full my-1">
      <ol className="list-reset flex text-grey-dark">
        {breadcrumbs.map((link, index) => {
          if (link.path === '/admin')
            return <Crumb key={link.path}>Home</Crumb>;
          if (link.path.endsWith('edit') || link.path.endsWith('access'))
            return null;
          return (
            <Crumb key={link.path} isLast={index === breadcrumbs.length - 1}>
              <Link className="text-blue no-underline hover:underline" to={link.path}>
                {link.label}
              </Link>
            </Crumb>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  routeList: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
};

Breadcrumb.defaultProps = {
  routeList: [],
};

export default withRouter(Breadcrumb);
