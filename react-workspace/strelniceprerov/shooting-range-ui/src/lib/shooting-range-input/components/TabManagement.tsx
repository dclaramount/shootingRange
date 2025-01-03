import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ManagementDashboardContext } from './Context/ManagementDashboardContext';
import { Translations } from '../types/translations';
import WrapperBookingManagement from '../Wrappers/WrapperBookingManagement';
import WrapperInstructorCalendar from '../Wrappers/WrapperInstructorCalendar';
import WrapperSegmentBlocker from '../Wrappers/WrapperSegmentBlocker';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel ( props: TabPanelProps ) {
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

function a11yProps ( index: number ) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabManagement ( { globalVariables }: any ) {
  const { tabSelector, setTabSelector } = React.useContext( ManagementDashboardContext );

  const [value, setValue] = React.useState( 0 );
  const handleChange = ( event: React.SyntheticEvent, newValue: number ) => {
    setTabSelector( newValue );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabSelector} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={Translations.ManagementDashboard.Title_Reservation_Management} {...a11yProps( 0 )} />
          <Tab label={Translations.ManagementDashboard.Title_Instructors_Management} {...a11yProps( 1 )} />
          <Tab label={Translations.ManagementDashboard.Title_Blocking_Segments_Management} {...a11yProps( 1 )} />
          <Tab label={Translations.ManagementDashboard.Title_Events} {...a11yProps( 2 )} />
          <Tab label={Translations.ManagementDashboard.Admin_Bookings} {...a11yProps( 2 )} />
        </Tabs>
      </Box>
      <CustomTabPanel value={tabSelector} index={0}>
        <WrapperBookingManagement />
      </CustomTabPanel>
      <CustomTabPanel value={tabSelector} index={1}>
        <WrapperInstructorCalendar />
      </CustomTabPanel>
      <CustomTabPanel value={tabSelector} index={2}>
        <WrapperSegmentBlocker />
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={3}>
        <WrapperGlobalVariables />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <WrapperAdminBookings />
      </CustomTabPanel> */}
    </Box>
  );
}