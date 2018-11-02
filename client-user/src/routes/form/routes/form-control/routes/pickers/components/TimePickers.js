import React, { Fragment, PureComponent } from 'react';
import { TimePicker } from 'material-ui-pickers';

class BasicUsage extends PureComponent {
  state = {
    selectedDate: new Date(),
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  }

  render() {
    const { selectedDate } = this.state;

    return (
      <Fragment>
        <div className="picker">
          <TimePicker
            autoOk
            label="12 hours"
            value={selectedDate}
            onChange={this.handleDateChange}
          />
        </div>

        <div className="picker">
          <TimePicker
            clearable
            ampm={false}
            label="24 hours"
            value={selectedDate}
            onChange={this.handleDateChange}
          />
        </div>

        <div className="picker">
          <TimePicker
            showTodayButton
            todayLabel="now"
            label="With today button"
            value={selectedDate}
            onChange={this.handleDateChange}
          />
        </div>
      </Fragment>
    );
  }
}

const Box = () => (
  <div className="box box-default">
    <div className="box-header">Time Pickers</div>
    <div className="box-body py-5 d-flex justify-content-between">
      <BasicUsage />
    </div>
  </div>
)

export default Box;
