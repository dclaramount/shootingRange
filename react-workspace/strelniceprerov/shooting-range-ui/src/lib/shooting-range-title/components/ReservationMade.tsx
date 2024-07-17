import React from 'react';
import { Button } from '@mui/material';
import { Translations } from '../types/translations';



export function ReservationMade( {closeModal} : any) {

  return(
    <div className={"WrapperOfBooking"} style={{width:'100%', height:'100%', display:'flex', flexDirection:'column', marginLeft:'auto', marginRight:'auto', padding:'10px', border:'2px solid black', borderRadius:'10px', outline:'10px solid transparent', backgroundColor:'#F2B51B'}}>
      <i className="fas fa-check-circle fa-10x" style={{color:'white', marginLeft:'auto', marginRight:'auto', marginTop:'15%'}}></i>
      <h1 style={{textAlign:'center', color:'white'}}>{Translations.BookingCreated.Title}</h1>
      <span style={{textAlign:'center', color:'white', fontWeight:'bold'}}>{Translations.BookingCreated.Disclaimer1}</span>
      <span style={{textAlign:'center', color:'white', fontWeight:'bold', marginTop:'15px'}}>{Translations.BookingCreated.Disclaimer2}</span>
      <Button style={{ width:'150px', marginRight:'auto', marginLeft: 'auto', marginTop:'15%', backgroundColor:'red', fontWeight:'bolder', color:'white', border:'1px solid red' }} variant="contained" color="success" onClick={()=>closeModal("BOOKING_COMPLETE")}>{Translations.BookingCreated.Button_Close}</Button>

    </div>
)}