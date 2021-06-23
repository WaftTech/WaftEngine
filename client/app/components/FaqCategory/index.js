/* eslint-disable no-shadow */
/**
 *
 * FaqContent
 *
 */

import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { loadFaqRequest } from '../../containers/App/actions';
import { makeSelectFaqData } from '../../containers/App/selectors';
import Panel from '../Panel';

const FaqContent = props => {
  const { faqKey, faqData, loadFaqRequest } = props;

  useEffect(() => {
    loadFaqRequest(faqKey);
  }, [faqKey]);

  const cat =
    faqData[faqKey] && faqData[faqKey].cat !== undefined
      ? faqData[faqKey].cat
      : { title: '' };
  const faq =
    faqData[faqKey] && faqData[faqKey].faq !== undefined
      ? faqData[faqKey].faq
      : [];

  return (
    <div className="my-10 container mx-auto">
      <div className="mb-10">
        <h2 className="text-xl font-bold">{cat.title}</h2>
        <div style={{ display: 'block', paddingLeft: 0 }}>
          {faq &&
            faq.length > 0 &&
            faq.map(each => (
              <Panel
                title={each.question}
                body={<p dangerouslySetInnerHTML={{ __html: each.title }} />}
              />
            ))}
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

const withConnect = connect(mapStateToProps, { loadFaqRequest });

export default compose(withConnect)(FaqContent);
