import React from 'react';
import { BookingContext } from './Context/BookingContext';
import { Button } from '@mui/material';



export function ReservationMade( {closeModal} : any) {
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
    <div className={"WrapperOfBooking"} style={{display:'flex', flexDirection:'column', marginLeft:'auto', marginRight:'auto', backgroundColor:'white', padding:'20px'}}>
      <i className="fas fa-check-circle fa-10x" style={{color:'green', marginLeft:'auto', marginRight:'auto'}}></i>
      <h2>Reservation Made Succesfully.</h2>
      <Button style={{ width:'150px', marginRight:'auto', marginLeft: 'auto', marginTop:'15px' }} variant="contained" color="success" onClick={()=>closeModal("BOOKING_COMPLETE")}>Close</Button>

    </div>
)}