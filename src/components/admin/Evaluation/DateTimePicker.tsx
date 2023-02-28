import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DateTimePickerProps = {
  date: Date;
  setDate: (date: Date) => void;
  classes: string;
};

export const DateTimePicker = forwardRef<any, DateTimePickerProps>(({ date, setDate, classes }, ref) => (
  <DatePicker
    ref={ref}
    selected={date}
    onChange={(date: Date) => setDate(date)}
    showTimeInput
    dateFormat={"yyyy.MM.dd"}
    className={classes}
    showPopperArrow={false}
    timeInputLabel="Local Time:"
  />
));
DateTimePicker.displayName = "DateTimePicker";
// LegacyRef<ReactDatePicker<never, undefined>> | undefined;
