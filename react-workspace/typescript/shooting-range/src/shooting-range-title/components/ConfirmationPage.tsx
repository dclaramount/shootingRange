import React from 'react';
import { BookingContext } from './Context/BookingContext';
import { Button } from '@mui/material';
import Popup from 'reactjs-popup';
import { TermsAndConditions } from './TermsAndConditions';


export function ConfirmationPage( {setPage} : any) {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const fontText = 'Arial, Helvetica, sans-serif;'
  const fontSize = '18px'
  const colorFont = 'dodgerblue'
  const fontWeight = 'bold'

  const separation = '15px'
  const sizeOfIcons = 'fa-2x'
  const colorIcons = 'dodgerblue'
  const marginLeftText = '50px';
  const { locationList,             selectedLocation,       selectedSegment,
          selectedBookingDuration,  shootingPermitNumber,   shootingInstructor,
          name,                     email,                  phone
        }   =   React.useContext(BookingContext);
  return(
    <div className={"WrapperOfBooking"} style={{display:'flex', marginLeft:'auto', marginRight:'auto', marginTop:'15px'}}>
    <div style={{width:'100%', display:'flex', flexDirection:'column'}}>
      <h1 style={{margin:'10px', color:colorFont, alignContent:'center'}}>Summary Of Booking</h1>
    <div style={{height:'auto', marginLeft:'auto', marginRight:'auto'}}>
      <div style={{display:'flex', marginTop:separation}}>
        <span style={{color:colorIcons}}><i className={`fa fa-location-arrow ${sizeOfIcons}`} aria-hidden="true" ></i></span>
        <div style={{fontFamily:fontText, fontSize:fontSize, color:colorFont, fontWeight:fontWeight, marginTop:'auto', marginBottom:'auto', marginLeft:marginLeftText}}>{locationList.find((location:any) => parseInt(location.id)===parseInt(selectedLocation)).serviceName}</div>
      </div>
      <div style={{display:'flex', marginTop:separation}}>
        <span style={{color:colorIcons}}><i className={`fa fa-calendar ${sizeOfIcons}`} aria-hidden="true" ></i></span>
        <div style={{fontFamily:fontText, fontSize:fontSize, color:colorFont, fontWeight:fontWeight, marginTop:'auto', marginBottom:'auto', marginLeft:marginLeftText}}>{selectedSegment}</div>
      </div>
      <div style={{display:'flex' , marginTop:separation}}>
        <span style={{color:colorIcons}}><i className={`fa fa-clock ${sizeOfIcons}`} aria-hidden="true" ></i></span>
        <div style={{fontFamily:fontText, fontSize:fontSize, color:colorFont, fontWeight:fontWeight, marginTop:'auto', marginBottom:'auto', marginLeft:marginLeftText}}>{selectedBookingDuration} h</div>
      </div>
      {/*
      <div style={{display:'flex' , marginTop:separation}}>
        <span style={{color:colorIcons}}><i className={`fa fa-users ${sizeOfIcons}`} aria-hidden="true" ></i></span>
        <div style={{fontFamily:fontText, fontSize:fontSize, color:colorFont, fontWeight:fontWeight, marginTop:'auto', marginBottom:'auto', marginLeft:marginLeftText}}>{selectedOccupancy} people</div>
      </div>*/}
      <div style={{display:'flex',  marginTop:separation}}>
        <span style={{color:colorIcons}}><i className={`fa fa-id-card ${sizeOfIcons}`} aria-hidden="true" ></i></span>
        <div style={{fontFamily:fontText, fontSize:fontSize, color:colorFont, fontWeight:fontWeight, marginTop:'auto', marginBottom:'auto', marginLeft:marginLeftText}}>{shootingPermitNumber}</div>
      </div>
      <div style={{display:'flex', marginTop:separation}}>
        <span style={{color:colorIcons}}><i className={`fa fa-graduation-cap ${sizeOfIcons}`} aria-hidden="true" ></i></span>
        <div style={{fontFamily:fontText, fontSize:fontSize, color:colorFont, fontWeight:fontWeight, marginTop:'auto', marginBottom:'auto', marginLeft:marginLeftText}}>{shootingInstructor ? "With Instructor" : "Without Instructor"}</div>
      </div>
      <div style={{display:'flex', marginTop:separation}}>
        <span style={{color:colorIcons}}><i className={`fa fa-id-badge ${sizeOfIcons}`} aria-hidden="true" ></i></span>
        <div style={{fontFamily:fontText, fontSize:fontSize, color:colorFont, fontWeight:fontWeight, marginTop:'auto', marginBottom:'auto', marginLeft:marginLeftText}}>{name}</div>
      </div>
      <div style={{display:'flex', marginTop:separation}}>
        <span style={{color:colorIcons}}><i className={`fa fa-envelope ${sizeOfIcons}`} aria-hidden="true" ></i></span>
        <div style={{fontFamily:fontText, fontSize:fontSize, color:colorFont, fontWeight:fontWeight, marginTop:'auto', marginBottom:'auto', marginLeft:marginLeftText}}>{email}</div>
      </div>
      <div style={{display:'flex', marginTop:separation}}>
        <span style={{color:colorIcons}}><i className={`fa fa-phone ${sizeOfIcons}`} aria-hidden="true" ></i></span>
        <div style={{fontFamily:fontText, fontSize:fontSize, color:colorFont, fontWeight:fontWeight, marginTop:'auto', marginBottom:'auto', marginLeft:marginLeftText}}>{phone}</div>
      </div>
    </div>
    <div style={{display:'flex'}}>
    <div style={{marginTop:'2vh', marginBottom:'2vh'}}>
      <input type="checkbox" id="terms_conditions" name="scales" checked={checked} onClick={()=>setChecked(!checked)}/>
      <label htmlFor="terms_conditions">I agree with the</label>
      <span style={{fontWeight:'bold', textDecoration:'underline', color:'blue', marginLeft:'10px'}} onClick={()=>setOpen(true)}> Terms & Conditions</span>
    </div>
      <Popup open={open} modal closeOnDocumentClick={false} >
        <TermsAndConditions closeModalFunction={setOpen}/>
      </Popup>
    </div>
    {!checked && <button type="button" style={{ height:'35px', backgroundColor:'rgba(0, 0, 0, 0.12)', boxShadow:'none', color:'rgba(0, 0, 0, 0.26)', textAlign:'center' }} disabled={!checked}  onClick={()=>setPage("GETTING_USER_BY_EMAIL")}>CREATE BOOKING</button> }
    {checked && <Button  variant="contained" color="success" disabled={!checked} onClick={()=>setPage("GETTING_USER_BY_EMAIL")}>Create Booking</Button> }
    </div>
    </div>
)}
