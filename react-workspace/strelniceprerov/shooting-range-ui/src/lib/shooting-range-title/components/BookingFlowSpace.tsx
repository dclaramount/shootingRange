import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { ConfirmationPage } from './ConfirmationPage';
import { BookingConfPlaceHolder } from '../PlaceHolderBookingSection';

//This Renders the PopUp that will navigate the user throughout the booking confirmation process.
export function BookingFlowSpace({closeModalFunction} : any) {
  const [section, setSection]  =   React.useState("LOADING"); 
  const delayInMilliseconds = 1000; //1 second
  setTimeout(function() {
    setSection("SUMMARY");
  }, delayInMilliseconds);
  return(
    <div>
        <a className="close" onClick={closeModalFunction} style={{marginLeft:'100%', marginTop:'10px', width:'24px', height:'24px', cursor:'pointer', zIndex:1000}}>
            <i className="fa fa-times"></i>
        </a>
      {section==="LOADING" && <BookingConfPlaceHolder/>}
      {section==="SUMMARY" && 
      <div style={{backgroundColor:'white', maxWidth:'500px', padding:'50px', border:'1px solid #e7e7e9', borderRadius:'15px', outline:'20px solid #fafafa'}}>
        <a className="close" onClick={closeModalFunction} style={{marginLeft:'100%', marginTop:'10px', width:'24px', height:'24px', cursor:'pointer', zIndex:1000}}>
            <i className="fa fa-times"></i>
        </a>
        <ConfirmationPage/>
      </div>}
    </div>
)}