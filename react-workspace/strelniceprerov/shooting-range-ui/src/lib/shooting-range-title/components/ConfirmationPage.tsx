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
import Checkbox from '@mui/material/Checkbox';



export function ConfirmationPage() {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const marginLeftText = '50px';
  const size = '48px'
  const {
          locationList,
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
    <div className={"WrapperOfBooking"} style={{display:'flex', marginLeft:'auto', marginRight:'auto'}}>
    <div style={{width:'100%', display:'flex', flexDirection:'column'}}>
    <Typography variant="h4" style={{ marginBottom:'45px', marginLeft:'10px'}} color='primary'>Summary Of Booking</Typography>
    <div style={{height:'auto', marginLeft:'auto', marginRight:'auto'}}>
      <div style={{display:'flex'}}>
        <LocationOnIcon style={{height:size, width:size, marginTop:'auto', marginBottom:'auto'}} color='primary' />
        <Typography variant="h6" style={{ marginTop:'auto', marginBottom:'auto', marginLeft:marginLeftText}} color='primary'>{locationList.find((location:any) => parseInt(location.id)===selectedLocation).name}</Typography>
      </div>
      <div style={{display:'flex'}}>
        <DateRangeIcon style={{height:size, width:size, marginTop:'10px', marginBottom:'10px'}} color='primary' />
        <Typography variant="h6" style={{ marginTop:'auto', marginBottom:'auto', marginLeft:marginLeftText}} color='primary'>{selectedSegment}</Typography>
      </div>
      <div style={{display:'flex'}}>
        <AccessTimeIcon style={{height:size, width:size, marginTop:'10px', marginBottom:'10px'}} color='primary' />
        <Typography variant="h6" style={{ marginTop:'auto', marginBottom:'auto', marginLeft:marginLeftText}} color='primary'>{selectedBookingDuration} h</Typography>
      </div>
      <div style={{display:'flex'}}>
        <PeopleIcon style={{height:size, width:size, marginTop:'10px', marginBottom:'10px'}} color='primary' />
        <Typography variant="h6" style={{ marginTop:'auto', marginBottom:'auto', marginLeft:marginLeftText}} color='primary'>{selectedOccupancy} people</Typography>
      </div>
      <div style={{display:'flex'}}>
        <AssignmentIndIcon style={{height:size, width:size, marginTop:'10px', marginBottom:'10px'}} color='primary' />
        <Typography variant="h6" style={{ marginTop:'auto', marginBottom:'auto', marginLeft:marginLeftText}} color='primary'>{shootingPermitNumber}</Typography>
      </div>
      <div style={{display:'flex'}}>
        <SchoolIcon style={{height:size, width:size, marginTop:'10px', marginBottom:'10px'}} color='primary' />
        <Typography variant="h6" style={{ marginTop:'auto', marginBottom:'auto', marginLeft:marginLeftText}} color='primary'>{shootingInstructor ? "With Instructor" : "Without Instructor"}</Typography>
      </div>
      <div style={{display:'flex'}}>
        <BadgeIcon style={{height:size, width:size, marginTop:'10px', marginBottom:'10px'}} color='primary' />
        <Typography variant="h6" style={{ marginTop:'auto', marginBottom:'auto', marginLeft:marginLeftText}} color='primary'>{name}</Typography>
      </div>
      <div style={{display:'flex'}}>
        <EmailIcon style={{height:size, width:size, marginTop:'10px', marginBottom:'10px', color:'red !important'}} />
        <Typography variant="h6" style={{ marginTop:'auto', marginBottom:'auto', marginLeft:marginLeftText}} color='primary'>{email}</Typography>
      </div>
      <div style={{display:'flex'}}>
        <ContactPhoneIcon style={{height:size, width:size, marginTop:'10px', marginBottom:'10px'}} color='primary' />
        <Typography variant="h6" style={{ marginTop:'auto', marginBottom:'auto', marginLeft:marginLeftText}} color='primary'>{phone}</Typography>
      </div>
    </div>
    <div style={{display:'flex'}}>
    <Checkbox
      checked={checked}
      onClick={()=>setChecked(!checked)}
      inputProps={{ 'aria-label': 'controlled' }}
    />
    <Typography variant="body1" style={{ marginTop:'auto', marginBottom:'auto', marginLeft:'10px'}}>I agree with the</Typography>
    <Popup trigger={<Button> Terms & Conditions</Button>} modal >
    <div style={{backgroundColor:'white', maxWidth:'500px', padding:'50px', border:'5px solid black', borderRadius:'15px'}}>
      <Typography variant="h4" style={{ marginTop:'auto', marginBottom:'25px', marginLeft:'auto', marginRight:'auto'}}>Terms & Conditions</Typography>
      <div>What is Lorem Ipsum?
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </div>
    </div>
    </Popup>
    </div>
    <Button style={{ width:'150px', marginRight:'auto', marginLeft: 'auto', marginTop:'15px' }} variant="contained" color="success" disabled={!checked}>Create Booking</Button>
    </div>
    </div>
)}