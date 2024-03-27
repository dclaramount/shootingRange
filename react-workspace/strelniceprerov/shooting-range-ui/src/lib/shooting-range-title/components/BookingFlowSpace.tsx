import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { ConfirmationPage } from './ConfirmationPage';
import { BookingConfPlaceHolder } from '../PlaceHolderBookingSection';
import axios from 'axios';
import { BookingContext } from './Context/BookingContext';

//This Renders the PopUp that will navigate the user throughout the booking confirmation process.
export function BookingFlowSpace({closeModalFunction} : any) {

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

  const [section, setSection]  =   React.useState("LOADING"); 
  const delayInMilliseconds = 3000; //1 second
  setTimeout(function() {
    setSection("SUMMARY");
  }, delayInMilliseconds);

  React.useEffect(() =>{    
    if(section==="CREATING_RESERVATION"){
    axios({
      url: `https://strelniceprerov.cz/wp-content/plugins/elementor-addon/widgets/postCreateBooking.php?selectedLocationId=${selectedLocation}&selectedSegment=${selectedSegment}&selectedBookingDuration=${selectedBookingDuration}&selectedOccupancy=${selectedOccupancy}&shootingPermit=${shootingPermit}&shootingPermitNumber=${shootingPermitNumber}&shootingInstructor=${shootingInstructor}&name=${name}&email=${email}&phone=${phone}`,
      method: "GET",
  }).then((res) => {
    console.log(res)
  })
    .catch((err) => { console.log(err) });
  }
  },[section==="CREATING_RESERVATION"])

  return(
    <div>
      {section==="LOADING" && <BookingConfPlaceHolder/>}
      {section==="SUMMARY" && 
      <div style={{backgroundColor:'white', maxWidth:'500px', padding:'50px', border:'1px solid #e7e7e9', borderRadius:'15px', outline:'20px solid #fafafa'}}>
        <a className="close" onClick={closeModalFunction} style={{marginRight:'10px', marginTop:'10px', width:'24px', height:'24px', cursor:'pointer'}}>
            <i className="fa fa-times"></i>
        </a>
        <ConfirmationPage setPage={setSection}/>
      </div>}
    </div>
)}