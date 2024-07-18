import React from 'react';
import { BookingContext } from './Context/BookingContext';
import { Button } from '@mui/material';
import Popup from 'reactjs-popup';
import { TermsAndConditions } from './TermsAndConditions';
import { Translations } from '../types/translations';


export function ConfirmationPage( {setPage} : any) {
  const { locationList,             selectedLocation,       selectedSegment,
    selectedBookingDuration,  shootingPermitNumber,   shootingInstructor,
    name,                     email,                  phone,
    shootingPermit
  }   =   React.useContext(BookingContext);
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const fontText = 'Arial, Helvetica, sans-serif;'
  const fontSize = '18px'
  const colorFont = 'white'
  const fontWeight = 'bold'

  const separation = shootingPermit ? '15px' : '20px'
  const sizeOfIcons = 'fa-2x'
  const colorIcons = 'white'
  const marginLeftText = '50px';

  const formatedDate = `${(new Date(selectedSegment[0])).toLocaleDateString('de-DE')} ${selectedSegment[0].split(' ')[1]}`;
  const finishTimeStamp = selectedSegment[selectedSegment.length-1].split(' ')[1];
  const finishTime= parseInt(finishTimeStamp.split(':')[0]) + 1;
  const formatedSelectedSegment = `${formatedDate}->${finishTime.toString()}:00`;
  //const formatedSelectedSegment = selectedSegment.length > 1 ? `${formatedDate}-${selectedSegment[selectedSegment.length-1].split(' ')[1]}` : formatedDate;
  return(
    <div className={"WrapperOfBooking"} style={{display:'flex', marginLeft:'auto', marginRight:'auto', marginTop:'15px'}}>
    <div style={{width:'100%', display:'flex', flexDirection:'column'}}>
      <div style={{display:'flex', flexDirection:'row'}}>
      <img width="96" height="52" src="https://strelniceprerov.cz/wp-content/uploads/2023/01/logo_strelnice_final_negat_bezpoz-1024x559.png" className="attachment-large size-large wp-image-25" alt="" srcSet="https://strelniceprerov.cz/wp-content/uploads/2023/01/logo_strelnice_final_negat_bezpoz-1024x559.png 1024w, https://strelniceprerov.cz/wp-content/uploads/2023/01/logo_strelnice_final_negat_bezpoz-600x327.png 600w, https://strelniceprerov.cz/wp-content/uploads/2023/01/logo_strelnice_final_negat_bezpoz-300x164.png 300w, https://strelniceprerov.cz/wp-content/uploads/2023/01/logo_strelnice_final_negat_bezpoz-768x419.png 768w, https://strelniceprerov.cz/wp-content/uploads/2023/01/logo_strelnice_final_negat_bezpoz-1536x838.png 1536w, https://strelniceprerov.cz/wp-content/uploads/2023/01/logo_strelnice_final_negat_bezpoz-2048x1117.png 2048w" sizes="(max-width: 960px) 100vw, 960px"/>
      <h2 style={{margin:'10px', color:colorFont, alignContent:'center'}}>{Translations.SumaryBooking.Title}</h2>
      </div>
    <div style={{height:'auto'}}>
      <div style={{display:'flex', marginTop:separation}}>
        <span style={{color:colorIcons}}><i className={`fa fa-location-arrow ${sizeOfIcons}`} aria-hidden="true" ></i></span>
        <div style={{fontFamily:fontText, fontSize:fontSize, color:colorFont, fontWeight:fontWeight, marginTop:'auto', marginBottom:'auto', marginLeft:marginLeftText}}>{locationList.find((location:any) => parseInt(location.id)===parseInt(selectedLocation)).serviceName}</div>
      </div>
      <div style={{display:'flex', marginTop:separation}}>
        <span style={{color:colorIcons}}><i className={`fa fa-calendar ${sizeOfIcons}`} aria-hidden="true" ></i></span>
        <div style={{fontFamily:fontText, fontSize:fontSize, color:colorFont, fontWeight:fontWeight, marginTop:'auto', marginBottom:'auto', marginLeft:marginLeftText}}>{formatedSelectedSegment}</div>
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
      { shootingPermit && <div style={{display:'flex',  marginTop:separation}}>
        <span style={{color:colorIcons}}><i className={`fa fa-id-card ${sizeOfIcons}`} aria-hidden="true" ></i></span>
        <div style={{fontFamily:fontText, fontSize:fontSize, color:colorFont, fontWeight:fontWeight, marginTop:'auto', marginBottom:'auto', marginLeft:marginLeftText}}>{shootingPermitNumber}</div>
      </div>}
      {(!shootingPermit || (shootingPermit && shootingInstructor)) && <div style={{display:'flex', marginTop:separation}}>
        <span style={{color:colorIcons}}><i className={`fa fa-graduation-cap ${sizeOfIcons}`} aria-hidden="true" ></i></span>
        <div style={{fontFamily:fontText, fontSize:fontSize, color:colorFont, fontWeight:fontWeight, marginTop:'auto', marginBottom:'auto', marginLeft:marginLeftText}}>{shootingInstructor ? `${Translations.SumaryBooking.WithInstructor}` : `${Translations.SumaryBooking.WithoutInstructor}`}</div>
      </div>}
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
    <div style={{display:'flex', }}>
    <div style={{marginTop:'2vh', marginBottom:'2vh', display:'flex'}}>
      <input style={{marginRight:'15px', width:'20px', height:'20px', marginTop:'auto', marginBottom:'auto'}} type="checkbox" id="terms_conditions" name="scales" checked={checked} onClick={()=>setChecked(!checked)}/>
      <label htmlFor="terms_conditions" style={{marginTop:'auto', marginBottom:'auto'}}>{Translations.SumaryBooking.Terms_And_Conditions_Agree}</label>
      <a href="https://strelniceprerov.cz/provozni-rad/" target="_blank" rel="noreferrer">{"\xa0" + `${Translations.SumaryBooking.Terms_And_Contitions_Link}`}</a>
      {/*<span style={{fontWeight:'bold', textDecoration:'underline', color:'blue', marginLeft:'10px'}} onClick={()=>setOpen(true)}> Terms & Conditions</span>*/}
    </div>
      <Popup open={open} modal closeOnDocumentClick={false} >
        <TermsAndConditions closeModalFunction={setOpen}/>
      </Popup>
    </div>
    {!checked && <button type="button" style={{ height:'35px', backgroundColor:'rgba(34,139,34, 0.5)', border:'1px solid rgba(34,139,34, 0.5)', boxShadow:'none', color:'rgba(255,255,255, 0.5)', textAlign:'center', fontSize:'0.875rem', fontWeight:'bolder', borderRadius:'4px' }} disabled={!checked}  onClick={()=>setPage("GETTING_USER_BY_EMAIL")}>{Translations.SumaryBooking.Button_Create.toUpperCase()}</button> }
    {checked && <Button  variant="contained" color="success" style={{backgroundColor:'forestgreen', fontWeight:'bolder', color:'white', border:'1px solid forestgreen'}} disabled={!checked} onClick={()=>setPage("GETTING_USER_BY_EMAIL")}>{Translations.SumaryBooking.Button_Create}</Button> }
    </div>
    </div>
)}
