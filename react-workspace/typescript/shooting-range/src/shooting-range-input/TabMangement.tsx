import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InstructorsCalendar from './InstructorsCalendar';
import { BookingManagementSpace } from './BookingManagement/BookingManagementSpace';
import WrapperSegmentBlocker from './Wrappers/WrapperSegmentBlocker';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabManagement({globalVariables} : any) {
  const [value, setValue]                     = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="New Management Dashboard" {...a11yProps(0)} />
          <Tab label="Instructors Calendar" {...a11yProps(1)} />
          <Tab label="Blocking Segments" {...a11yProps(1)} />
          <Tab label="Events" {...a11yProps(2)} />
          {/*
          <Tab label="Summary Table" {...a11yProps(0)} />
          <Tab label="Booking Management Table" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      {/*<CustomTabPanel value={value} index={0}>
        {/*<SummaryBookingTable/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <SummaryBookings/>      
      </CustomTabPanel>*/}
      <CustomTabPanel value={value} index={0}>
        <BookingManagementSpace/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <InstructorsCalendar/> 
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <WrapperSegmentBlocker/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        PlaceHolder for Events.....
      </CustomTabPanel>
    </Box>
  );
}