import React from 'react';
import { BookingContext } from './Context/BookingContext';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SchoolIcon from '@mui/icons-material/School';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { Button, Typography } from '@mui/material';
import Popup from 'reactjs-popup';



export function ConfirmationPage() {
  const [open, setOpen] = React.useState(false);
  const size = '48px'
  const {
          selectedLocation,
          selectedSegment,
          selectedBookingDuration,
          selectedOccupancy,
          shootingPermit,
          shootingPermitNumber,
          shootingInstructor,
          name,
          email,
          phone
  } = React.useContext(BookingContext);

  return(
    <div>
    <div style={{height:'100%', marginLeft:'auto', marginRight:'auto'}}>
      <div style={{display:'flex'}}>
        <LocationOnIcon style={{height:size, width:size, marginTop:'auto', marginBottom:'auto'}} color='primary' />
        <Typography variant="h5" style={{ marginTop:'auto', marginBottom:'auto', marginLeft:'10px'}} color='primary'>{selectedLocation}</Typography>
      </div>
      <div style={{display:'flex'}}>
        <DateRangeIcon style={{height:size, width:size, marginTop:'10px', marginBottom:'10px'}} color='primary' />
        <Typography variant="h5" style={{ marginTop:'auto', marginBottom:'auto', marginLeft:'10px'}} color='primary'>{selectedSegment}</Typography>
      </div>
      <div style={{display:'flex'}}>
        <AccessTimeIcon style={{height:size, width:size, marginTop:'10px', marginBottom:'10px'}} color='primary' />
        <Typography variant="h5" style={{ marginTop:'auto', marginBottom:'auto', marginLeft:'10px'}} color='primary'>{selectedBookingDuration} h</Typography>
      </div>
      <div style={{display:'flex'}}>
        <PeopleIcon style={{height:size, width:size, marginTop:'10px', marginBottom:'10px'}} color='primary' />
        <Typography variant="h5" style={{ marginTop:'auto', marginBottom:'auto', marginLeft:'10px'}} color='primary'>{selectedOccupancy} people</Typography>
      </div>
      <div style={{display:'flex'}}>
        <AssignmentIndIcon style={{height:size, width:size, marginTop:'10px', marginBottom:'10px'}} color='primary' />
        <Typography variant="h5" style={{ marginTop:'auto', marginBottom:'auto', marginLeft:'10px'}} color='primary'>{shootingPermitNumber}</Typography>
      </div>
      <div style={{display:'flex'}}>
        <SchoolIcon style={{height:size, width:size, marginTop:'10px', marginBottom:'10px'}} color='primary' />
        <Typography variant="h5" style={{ marginTop:'auto', marginBottom:'auto', marginLeft:'10px'}} color='primary'>{shootingInstructor ? "With Instructor" : "Without Instructor"}</Typography>
      </div>
      <div style={{display:'flex'}}>
        <BadgeIcon style={{height:size, width:size, marginTop:'10px', marginBottom:'10px'}} color='primary' />
        <Typography variant="h5" style={{ marginTop:'auto', marginBottom:'auto', marginLeft:'10px'}} color='primary'>{name}</Typography>
      </div>
      <div style={{display:'flex'}}>
        <EmailIcon style={{height:size, width:size, marginTop:'10px', marginBottom:'10px'}} color='primary' />
        <Typography variant="h5" style={{ marginTop:'auto', marginBottom:'auto', marginLeft:'10px'}} color='primary'>{email}</Typography>
      </div>
      <div style={{display:'flex'}}>
        <ContactPhoneIcon style={{height:size, width:size, marginTop:'10px', marginBottom:'10px'}} color='primary' />
        <Typography variant="h5" style={{ marginTop:'auto', marginBottom:'auto', marginLeft:'10px'}} color='primary'>{phone}</Typography>
      </div>
    </div>
    I agree with the 
    <Popup trigger={<Button> Terms & Conditions</Button>} modal >
      <div style={{backgroundColor:'red'}}>Popup content here !!</div>
    </Popup>
    </div>
)}