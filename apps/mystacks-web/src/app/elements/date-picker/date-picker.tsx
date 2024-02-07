import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

export interface DatePickerProps {
    value: Dayjs | null
    handleDateChange: (newValue: Dayjs | null) => void
}

export const CustomDatePicker: React.FC<DatePickerProps> = (props) => {
    const { value, handleDateChange } = props

    return (
        <DatePicker 
            value={value}
            onChange={(newValue) => handleDateChange(newValue)}
        />
    );
};

export default CustomDatePicker;
