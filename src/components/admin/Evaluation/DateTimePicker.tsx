import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DateTimePickerProps = {
  date: Date;
  setDate: (date: Date) => void;
};

export const DateTimePicker = forwardRef<any, DateTimePickerProps>(({ date, setDate }, ref) => (
  <DatePicker
    ref={ref}
    selected={date}
    onChange={(date: Date) => setDate(date)}
    showTimeInput
    dateFormat={"yyyy.MM.dd"}
    className="w-[100px]"
    showPopperArrow={false}
  />
));
DateTimePicker.displayName = "DateTimePicker";
// LegacyRef<ReactDatePicker<never, undefined>> | undefined;
