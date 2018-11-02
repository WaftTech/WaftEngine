import React from 'react';
import QueueAnim from 'rc-queue-anim';
/* eslint-disable */
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';

import DatePickers from './DatePickers';
import TimePickers from './TimePickers';
import DateTimePickers from './DateTimePickers';


const TimePickerSection = () => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article">
      <h2 className="article-title page-title">Date & Time Pickers</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-4"> <DatePickers />  </div>
          <div key="2" className="mb-4"> <TimePickers />  </div>
          <div key="3" className="mb-4"> <DateTimePickers />  </div>
        </QueueAnim>
      </article>
    </div>
  </MuiPickersUtilsProvider>
);

export default TimePickerSection;
