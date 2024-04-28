import React from 'react';
import { Button } from '@mui/material';



export function ReservationMade( {closeModal} : any) {

  return(
    <div className={"WrapperOfBooking"} style={{width:'100%', height:'100%', display:'flex', flexDirection:'column', marginLeft:'auto', marginRight:'auto', padding:'10px', backgroundColor:'white', border:'2px solid black', borderRadius:'10px', outline:'10px solid transparent'}}>
      <i className="fas fa-check-circle fa-10x" style={{color:'green', marginLeft:'auto', marginRight:'auto', marginTop:'15%'}}></i>
      <h2 style={{textAlign:'center'}}>Reservation Made Succesfully.</h2>
      <Button style={{ width:'150px', marginRight:'auto', marginLeft: 'auto', marginTop:'15%', backgroundColor:'red', fontWeight:'bolder', color:'white', border:'1px solid red' }} variant="contained" color="success" onClick={()=>closeModal("BOOKING_COMPLETE")}>Close</Button>

    </div>
)}