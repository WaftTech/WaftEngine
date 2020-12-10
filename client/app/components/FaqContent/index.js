/* eslint-disable no-shadow */
/**
 *
 * FaqContent
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { loadFaqRequest } from '../../containers/App/actions';
import { makeSelectFaqData } from '../../containers/App/selectors';
import Panel from '../Panel';

const FaqContent = props => {
  const {
    faqKey,
    faqData: { cat, faq },
    loadFaqRequest,
  } = props;

  useEffect(() => {
    loadFaqRequest(faqKey);
  }, [faqKey]);

  return (
    <div className="my-10 container mx-auto">
      <div className="mb-10">
        <h2 className="text-xl font-bold">{cat.title}</h2>
        <div style={{ display: 'block', paddingLeft: 0 }}>
          {faq &&
            faq.length > 0 &&
            faq.map(each => <Panel title={each.question} body={each.title} />)}
        </div>
      </div>
    </div>
  );
};

FaqContent.propTypes = {
  faqKey: PropTypes.string.isRequired,
  loadFaqRequest: PropTypes.func.isRequired,
  faqData: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  faqData: makeSelectFaqData(),
});

const withConnect = connect(
  mapStateToProps,
  { loadFaqRequest },
);

export default compose(withConnect)(FaqContent);
