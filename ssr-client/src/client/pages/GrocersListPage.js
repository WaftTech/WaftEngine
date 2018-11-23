import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import MapComponent from '../components/MapComponent';
import SearchBox from '../components/SearchBox';
import fetchGrocers from '../actions/fetchGrocers';
import GrocersTable from '../components/GrocersTable';

export class GrocersListPage extends React.Component {
  state = { isShown: false };
  componentDidMount() {
    this.handleSearch();
    this.setState({ isShown: true });
  }
  handleSearch = () => {
    this.props.fetchGrocers();
  };
  head = () => {
    return (
      <Helmet>
        <title>{`${this.props.grocers.length} Grocers Loaded`}</title>
        <meta property="og:title" content="Grocers App" />
      </Helmet>
    );
  };
  render() {
    return (
      <div className="container-fluid" style={{ padding: '20px 0' }}>
        {this.head()}
        <main className="row no-margin-top">
          <div className="col s12 l12">
            <SearchBox search={this.handleSearch} />
            <MapComponent />
            <GrocersTable />
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({ grocers }) => ({ grocers });

const mapDispatchToProps = { fetchGrocers };

function loadData(store) {
  return store.dispatch(fetchGrocers());
}

export default {
  loadData,
  component: connect(
    mapStateToProps,
    mapDispatchToProps,
  )(GrocersListPage),
};
