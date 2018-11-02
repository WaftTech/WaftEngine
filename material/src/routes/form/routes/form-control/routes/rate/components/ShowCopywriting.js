import React from 'react';
import { Rate } from 'antd';
import MaterialIcon from 'components/MaterialIcon';

class Rater extends React.Component {
  state = {
    value: 3.5,
  }
  handleChange = (value) => {
    this.setState({ value });
  }
  render() {
    const { value } = this.state;
    return (
      <span>
        <Rate character={<MaterialIcon icon="star" />} className="md-rate" allowHalf onChange={this.handleChange} value={value} />
        {value && <span className="ant-rate-text">{value} stars</span>} 
      </span>
    );
  }
}

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Show copywriting</div>
      <div className="box-body">
        <Rater />
      </div>
    </div>
  )
}

export default Box;