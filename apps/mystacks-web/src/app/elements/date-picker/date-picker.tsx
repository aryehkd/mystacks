import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { styled } from '@mui/material/styles';

export interface DatePickerProps {
    value: Dayjs | null
    label?: string
    handleDateChange: (newValue: Dayjs | null) => void
}

export const CustomDatePicker: React.FC<DatePickerProps> = (props) => {
    const { value, label, handleDateChange } = props

    return (
        <StyledDatePicker 
            value={value}
            label={label || "Date"}
            onChange={(newValue) => handleDateChange(newValue as  Dayjs | null)}
            sx={{
                width: "100%"
            }}
        />
    );
};

export default CustomDatePicker;

const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
    '& fieldset': {
        borderColor: '#808080',
        borderWidth: 3,
    },
    '& .MuiFormControl-root': {
        color: "#808080"
    }

}));