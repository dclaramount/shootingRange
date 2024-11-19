import { Button } from '@mui/material';
import { Translations } from '../types/translations';



export function ErrorBooking( {closeModal} : any) {

  return(
    <div className={"WrapperOfBooking"} style={{width:'100%', height:'100%', display:'flex', flexDirection:'column', marginLeft:'auto', marginRight:'auto', padding:'10px', border:'2px solid black', borderRadius:'10px', outline:'10px solid transparent', backgroundColor:'#F2B51B'}}>
      <i className="fa fa-random fa-10x" style={{color:'white', marginLeft:'auto', marginRight:'auto', marginTop:'15%'}}></i>
      <h1 style={{textAlign:'center', color:'white'}}>{Translations.BookingCreated.TitleError}</h1>
      <span style={{textAlign:'center', color:'white', fontWeight:'bold', marginTop:'15px'}}>{Translations.BookingCreated.ErrorDisclaimer}</span>
      <Button style={{ width:'150px', marginRight:'auto', marginLeft: 'auto', marginTop:'15%', backgroundColor:'red', fontWeight:'bolder', color:'white', border:'1px solid red' }} variant="contained" color="success" onClick={()=>closeModal("BOOKING_COMPLETE")}>{Translations.BookingCreated.Button_Close}</Button>
    </div>
)}