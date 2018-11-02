import React, { Fragment, PureComponent } from 'react';
import { DateTimePicker } from 'material-ui-pickers';

class BasicDateTimePicker extends PureComponent {
  state = {
    selectedDate: new Date('2018-01-01T00:00:00.000Z'),
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  }

  render() {
    const { selectedDate } = this.state;

    return (
      <Fragment>
        <div className="picker">
          <DateTimePicker
            value={selectedDate}
            onChange={this.handleDateChange}
            label="DateTimePicker"
          />
        </div>

        <div className="picker">
          <DateTimePicker
            autoOk
            ampm={false}
            disableFuture
            value={selectedDate}
            onChange={this.handleDateChange}
            label="24h clock"
          />
        </div>

        <div className="picker">
          <DateTimePicker
            value={selectedDate}
            disablePast
            onChange={this.handleDateChange}
            label="With Today Button"
            showTodayButton
          />
        </div>
      </Fragment>
    );
  }
}


const Box = () => (
  <div className="box box-default">
    <div className="box-header">Date & Time Pickers</div>
    <div className="box-body py-5 d-flex justify-content-between">
      <BasicDateTimePicker />
    </div>
  </div>
)

export default Box;
