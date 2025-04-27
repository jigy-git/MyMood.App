import React from 'react';
import { DateRangePickerProps } from './date-range-picker.props';
import './date-range-picker.css'

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
}) => {
  return (
    <div className="date-range-picker">
      <label>
        From:
        <input
          type="date"
          value={fromDate}
          onChange={(e) => onFromDateChange(e.target.value)}
        />
      </label>
      <label>
        To:
        <input
          type="date"
          value={toDate}
          onChange={(e) => onToDateChange(e.target.value)}
        />
      </label>
    </div>
  );
};

export default DateRangePicker;
