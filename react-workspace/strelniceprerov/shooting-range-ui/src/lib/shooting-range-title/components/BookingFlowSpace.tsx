import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { ConfirmationPage } from './ConfirmationPage';

//This Renders the PopUp that will navigate the user throughout the booking confirmation process.
export function BookingFlowSpace({closeModalFunction} : any) {
  return(
    <div>
      <a className="close" onClick={closeModalFunction} style={{marginRight:'10px', marginTop:'10px', width:'24px', height:'24px'}}>
            <CancelIcon color='primary' />
      </a>
      <div style={{backgroundColor:'white', maxWidth:'500px', padding:'50px', border:'1px solid #e7e7e9', borderRadius:'15px', outline:'20px solid #fafafa'}}>
        <ConfirmationPage/>
      </div>
    </div>
)}