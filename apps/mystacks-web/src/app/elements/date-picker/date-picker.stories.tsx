import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import { CustomDatePicker } from './date-picker';
import { StorybookThemeProvider } from '../../../../.storybook/decorators/storybook-theme-provider'
import dayjs, { Dayjs } from 'dayjs';

export const CustomDatePickerStory = () => {

  const [date, setDate] = React.useState<Dayjs | null>(dayjs())

  const handleDateChange = (newValue: Dayjs | null) => {setDate(newValue)}

  return (
    <StoryContainer>
        <CustomDatePicker value={date}  handleDateChange={handleDateChange}/>
    </StoryContainer>
  )
}

export default {
  title: 'CustomDatePicker',
  render: () => <CustomDatePickerStory />,
  decorators: [StorybookThemeProvider],
};

const StoryContainer = styled(Box)(({ theme }) => ({
  width: "100%",
}));
