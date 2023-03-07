import { forwardRef } from "react";
import Datetime from "react-datetime";
import { Moment } from "moment";
import "react-datetime/css/react-datetime.css";

type DateTimePickerProps = {
  date: string | Date | Moment | undefined;
  setDate: (date: string) => void;
  classes: string;
};

export const DateTimePicker = forwardRef<any, DateTimePickerProps>(({ date, setDate, classes }, ref) => (
  <Datetime
    utc={true}
    value={date}
    onChange={(date: any) => setDate(date)}
    dateFormat={"yyyy.MM.D"}
    timeFormat={"HH:mm z"}
    inputProps={{
      placeholder: "Select date",
      ref: ref,
    }}
    className={classes}
  />
));
DateTimePicker.displayName = "DateTimePicker";
