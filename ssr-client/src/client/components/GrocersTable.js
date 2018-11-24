import React from 'react';
import { connect } from 'react-redux';

const pagination = (currentPage, nrOfPages) => {
  let delta = 2;
  let range = [1];
  let rangeWithDots = [];
  let l;

  if (nrOfPages <= 1) {
    return range;
  }

  for (let i = currentPage - delta; i <= currentPage + delta; i++) {
    if (i < nrOfPages && i > 1) {
      range.push(i);
    }
  }
  range.push(nrOfPages);

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
};

const RenderStores = props => {
  const { currentIndex, perPage, grocers } = props;
  const filtered = [...grocers.slice(currentIndex * perPage, (currentIndex + 1) * perPage)];
  return filtered.map(grocer => (
    <tr key={grocer._id}>
      <td style={{ padding: '10px 5px', fontSize: '14px' }}>{grocer.name}</td>
      <td style={{ padding: '10px 5px', fontSize: '14px' }}>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href={`https://www.google.com/maps/search/${grocer.name.replace(
            ' ',
            '+',
          )}+${grocer.address1.replace(' ', '+')}/@${grocer.latitude},${grocer.longitude}`}
        >
          {`${grocer.address1}${grocer.address2}`}
        </a>
      </td>
      <td style={{ padding: '10px 5px', fontSize: '14px' }}>{grocer.city}</td>
    </tr>
  ));
};

class GrocersTable extends React.Component {
  state = {
    currentIndex: 0,
    totalPage: parseInt(this.props.grocers.length || 0 / 10),
    perPage: 10,
  };
  static getDerivedStateFromProps({ grocers }, state) {
    let newState = {};
    if (grocers) {
      const totalItems = grocers.length || 0;
      newState = {
        totalPage: parseInt(totalItems / 10),
        perPage: 10,
      };
      if (state.totalPage !== newState.totalPage) {
        newState.currentIndex = 0;
      }
    }
    return newState;
  }

  nextPage = () => {
    this.setState(state => {
      if (state.currentIndex + 1 >= state.totalPage) {
        return {
          currentIndex: 0,
        };
      }
      return {
        currentIndex: state.currentIndex + 1,
      };
    });
  };
  prevPage = () => {
    this.setState(state => {
      if (state.currentIndex === 0) {
        return {
          currentIndex: state.totalPage - 1,
        };
      }
      return {
        currentIndex: state.currentIndex - 1,
      };
    });
  };
  jumpPage = currentIndex => {
    this.setState({ currentIndex });
  };
  render() {
    const { currentIndex, totalPage, perPage } = this.state;
    const { grocers } = this.props;
    const paging = pagination(currentIndex, totalPage);

    return (
      <React.Fragment>
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Store Brand</th>
              <th>Address</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            <RenderStores currentIndex={currentIndex} perPage={perPage} grocers={grocers} />
          </tbody>
        </table>
        {totalPage > 0 && (
          <ul className="pagination" style={{ clear: 'both', marginBottom: '20px' }}>
            <li className="waves-effect">
              <span
                role="presentation"
                onKeyDown={this.prevPage}
                style={{ padding: '0px' }}
                onClick={this.prevPage}
              >
                <i className="material-icons">chevron_left</i>
              </span>
            </li>
            {paging.map(idx => {
              if (typeof idx === 'number') {
                return (
                  <li
                    key={`page-${idx}`}
                    className={`${currentIndex === idx - 1 ? 'active' : 'eaves-effect'}`}
                  >
                    <span
                      role="presentation"
                      onKeyDown={() => this.jumpPage(idx - 1)}
                      onClick={() => this.jumpPage(idx - 1)}
                    >
                      {idx}
                    </span>
                  </li>
                );
              } else {
                return <li key={`page-${idx}`}>{idx}</li>;
              }
            })}
            <li className="waves-effect">
              <span
                role="presentation"
                onKeyDown={this.nextPage}
                style={{ padding: '0px' }}
                onClick={this.nextPage}
              >
                <i className="material-icons">chevron_right</i>
              </span>
            </li>
          </ul>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ grocers }) => ({ grocers });

export default connect(mapStateToProps)(GrocersTable);
