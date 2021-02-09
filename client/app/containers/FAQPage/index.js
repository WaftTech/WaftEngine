import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectFAQ, makeSelectLoading } from './selectors';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import Loading from '../../components/Loading';
import Panel from '../../components/Panel';
import FaqCategory from '../../components/FaqCategory';

class FAQPage extends React.Component {
  static propTypes = {
    loadFAQRequest: PropTypes.func.isRequired,
    faq: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      expanded: 'panel1',
      qExpanded: '',
    };
  }

  componentDidMount() {
    this.props.loadFAQRequest();
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleQChange = panel => (event, expanded) => {
    this.setState({
      qExpanded: expanded ? panel : false,
    });
  };

  render() {
    const { faq, classes, loading } = this.props;

    const { expanded, qExpanded } = this.state;

    return loading && loading == true ? (
      <Loading />
    ) : (
        <div>
          <Helmet>
            <title> FAQs </title>
          </Helmet>
          <div className="my-10 container mx-auto">
            {faq.cat &&
              faq.cat.map(
                x =>
                  faq.faq &&
                  faq.faq.filter(z => z.category == x._id).length !== 0 && (
                    <div key={`cat-${x._id}`} className="mb-10">
                      <h2 className="text-xl font-bold">{x.title}</h2>
                      <div style={{ display: 'block', paddingLeft: 0 }}>
                        {faq.faq &&
                          faq.faq
                            .filter(z => z.category == x._id)
                            .map(y => (
                              <Panel title={y.question} body={<p dangerouslySetInnerHTML={{ __html: y.title }} />} />
                            ))}
                      </div>
                    </div>
                  ),
              )}
          </div>

          <FaqCategory faqKey="Motivations" />
        </div>
      );
  }
}

const withReducer = injectReducer({ key: 'faq', reducer });

const withSaga = injectSaga({ key: 'faq', saga });

const mapStateToProps = createStructuredSelector({
  faq: makeSelectFAQ(),
  loading: makeSelectLoading(),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(FAQPage);
