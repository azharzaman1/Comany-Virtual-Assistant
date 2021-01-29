import React from "react";
import { FormControl } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const DatePicker = ({ value, onChange, label, name }) => {
  return (
    <FormControl className="form__input">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          variant="inline"
          inputVariant="outlined"
          label={label}
          name={name}
          format="MM/dd/yyyy"
          disableToolbar
          value={value}
          onChange={onChange}
        />
      </MuiPickersUtilsProvider>
    </FormControl>
  );
};

export default DatePicker;
