import React from 'react';
import { ConfirmationPage } from './ConfirmationPage';
import { BookingConfPlaceHolder, CreatingBookingPlaceholder } from '../PlaceHolderBookingSection';
import axios from 'axios';
import { BookingContext } from './Context/BookingContext';
import { ReservationMade } from './ReservationMade';
import { v4 } from "uuid";
import {Translations} from "../types/translations";
import { ErrorBooking } from './ErrorBooking';

//This Renders the PopUp that will navigate the user throughout the booking confirmation process.
export function BookingFlowSpace({closeModalFunction} : any) {
  interface UserEntry {
    ID: number;
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    shootingPermit?: string;
    updatedOn: Date;
    userId: string;
  }
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
    phone,
    apiURL,
    sendGridKeyAPI,
    sendGridFromEmail,
    sendGridTemplateConfirmationId,
    comment,
    isNormalComputer
} = React.useContext(BookingContext);

  const [section, setSection]  =   React.useState("LOADING"); 
  const [response, setResponse]  =   React.useState([]); 
  const [userAccount, setUserAccount] = React.useState<UserEntry>({ID:0, id: "", name:"", email:"", phoneNumber:"", shootingPermit:"", updatedOn:new Date(), userId:""});
  const [uniqueIdentifier, setUniqueIdentifier] = React.useState(v4())
  // Function to verify if the user data has changed and therefore if it needs to be updated on the DB.
  function hasUserDataChanged(entryUser: UserEntry){
    console.log(entryUser);
    if(userAccount.ID===0 ){
      return false;
    }
    else if(entryUser.name === name && entryUser.email === email && entryUser.phoneNumber === phone && (!shootingPermit || (entryUser.shootingPermit === shootingPermitNumber)) ){
      return false;
    }
    else{
      return true;
    }
  }
  const delayInMilliseconds = 3000; //1 second
  setTimeout(function() {
    if(section==="LOADING"){
      setSection("SUMMARY");
    }
  }, delayInMilliseconds);

  /*----------------------------------------------------------------------*/
  /*          USE EFFECT FOR THE PROCESS OF CREATING A BOOKING            */
  /*----------------------------------------------------------------------*/
  React.useEffect(() =>{  
    //1 Step get the User Account by Email
    if(section==="GETTING_USER_BY_EMAIL"){
      axios({
        url: `${apiURL}getUserRecordByEmail.php?userEmail=${email}`,
        method: "GET",
      }).then((res) => {
        if(res.status===200){ //Found
          const userData : UserEntry[] = res.data.payload;
          setUserAccount(userData[0]);
          setSection("VERIFY_DATA_USER")
        }
        else{setSection("ERROR_ON_API_CALL")}
      })
      .catch((err) => { 
        if (err.response.status===404){
          setSection("GETTING_USER_BY_PHONE_NUMBER");
        }
        else{
          setSection("ERROR_ON_API_CALL");
        }
      });
    }
    //1.1 Step get the User Account by PhoneNumber
    else if(section==="GETTING_USER_BY_PHONE_NUMBER"){
      axios({
        url: `${apiURL}getUserRecordByPhoneNumber.php?phoneNumber=${phone}`,
        method: "GET",
      }).then((res) => {
        if(res.status===200){
          const userData : UserEntry[] = res.data.payload;
          setUserAccount(userData[0]);
          setSection("VERIFY_DATA_USER")
        }
        else{setSection("ERROR_ON_API_CALL")}
      })
      .catch((err) => { 
        if (err.response.status===404){
          setSection("CREATE_NEW_USER");
        }
        else{
          setSection("ERROR_ON_API_CALL");
        }
      })
    }
    //3.1 Verify User Entry.
    else if(section==="VERIFY_DATA_USER"){
      if(hasUserDataChanged(userAccount)){
        axios({
          url: `${apiURL}postUpdateUserEntry.php?id=${userAccount.id}&shootingPermit=${shootingPermit}&shootingPermitNumber=${shootingPermitNumber}&name=${name}&email=${email}&phone=${phone}`,
          method: "GET",
        }).then((res) => {
          setSection("PROCEED_TO_CREATE_RESERVATION");
        })
      .catch((err) => { console.log(err) });
      }
      else{setSection("PROCEED_TO_CREATE_RESERVATION");} //User is the same.
    }
    //3.2 Create New User
    else if(section==="CREATE_NEW_USER"){
      axios({
        url: `${apiURL}postCreateNewUser.php?id=${userAccount.id}&shootingPermit=${shootingPermit}&shootingPermitNumber=${shootingPermitNumber}&name=${name}&email=${email}&phone=${phone}`,
        method: "GET",
      }).then((res) => {
          if(res.status===200){
            setUserAccount(res.data.payload[0]);
            setSection("PROCEED_TO_CREATE_RESERVATION");
          }
          else{
            setSection("ERROR_ON_API_CALL");
          }
        })
      .catch((err) => { 
        if (err.response.status===409){
          setSection("ERROR_ON_API_CALL");
        }
        else{
          setSection("ERROR_ON_API_CALL");
        }
      })
    }
    //4 Create Reservation.
    else if(section==="PROCEED_TO_CREATE_RESERVATION"){
      axios({
        url: `${apiURL}postCreateBooking.php?selectedLocationId=${selectedLocation}&selectedSegment=${selectedSegment}&selectedBookingDuration=${selectedBookingDuration}&selectedOccupancy=${selectedOccupancy}&shootingInstructor=${shootingInstructor}&userId=${userAccount.id}&comment=${encodeURIComponent(comment)}&uuidInvoice=${uniqueIdentifier}`,
        method: "GET",
      }).then((res) => {
        if(res.status===200){
          setResponse(res.data);
          setSection("SEND_EMAIL");
        }
        else{setSection("ERROR_ON_API_CALL")}
      })
    .catch((err) => { 
        if (err.response.status===409){
          setSection("ERROR_ON_API_CALL");
        }
        else{
          setSection("ERROR_ON_API_CALL");
        }
      })
    }
    //4 Send Email Confirmation Reservation.
    else if(section==="SEND_EMAIL"){
      const selectedLocationName = locationList.find((location : any) => parseInt(location.id) === parseInt(selectedLocation)).serviceName;
      //SendEmail(sendGridKeyAPI, email, sendGridFromEmail, sendGridTemplateConfirmationId);
      const formatedDate = `${(new Date(selectedSegment[0])).toLocaleDateString('de-DE')} ${selectedSegment[0].split(' ')[1]}`;
      const finishTimeStamp = selectedSegment[selectedSegment.length-1].split(' ')[1];
      const finishTime= parseInt(finishTimeStamp.split(':')[0]) + 1;
      const formatedSelectedSegment = `${formatedDate}->${finishTime.toString()}:00`;
      //const formatedSelectedSegment = selectedSegment.length > 1 ? `${formatedDate}-${selectedSegment[selectedSegment.length-1].split(' ')[1]}` : formatedDate;    
      axios({
        url: `${apiURL}postSendEmail.php?sendGridKey=${sendGridKeyAPI}&emailTo=${email}&emailFrom=${sendGridFromEmail}&templateId=${sendGridTemplateConfirmationId}&segmentBooked=${formatedSelectedSegment}&nameOnReservation=${name}&shootingRangeName=${selectedLocationName}&phoneNumber=+${phone}&comment=${comment}&uuidInvoice=${uniqueIdentifier}`,
        method: "GET",
      }).then((res) => {
        if(res.status===200){
          setResponse(res.data);
          setSection("SEND_EMAIL_OWNER");
        }
        else{setSection("ERROR_ON_API_CALL")}
      })
    .catch((err) => 
      { setSection("ERROR_ON_API_CALL") }
    );
    }
    //5 Send Email Confirmation to Owner.
    else if(section==="SEND_EMAIL_OWNER"){
      const selectedLocationName = locationList.find((location : any) => parseInt(location.id) === parseInt(selectedLocation)).serviceName;
      const formatedDate = `${(new Date(selectedSegment[0])).toLocaleDateString('de-DE')} ${selectedSegment[0].split(' ')[1]}`;
      const finishTimeStamp = selectedSegment[selectedSegment.length-1].split(' ')[1];
      const finishTime= parseInt(finishTimeStamp.split(':')[0]) + 1;
      const formatedSelectedSegment = `${formatedDate}->${finishTime.toString()}:00`;
      //const formatedSelectedSegment = selectedSegment.length > 1 ? `${formatedDate}-${selectedSegment[selectedSegment.length-1].split(' ')[1]}` : formatedDate;    
      axios({
        url: `${apiURL}postSendEmailOwner.php?sendGridKey=${sendGridKeyAPI}&emailTo=${email}&emailFrom=${sendGridFromEmail}&templateId=${sendGridTemplateConfirmationId}&segmentBooked=${formatedSelectedSegment}&nameOnReservation=${name}&shootingRangeName=${selectedLocationName}&phoneNumber=+${phone}&comment=${comment}&uuidInvoice=${uniqueIdentifier}&withInstructor=${shootingInstructor}`,
        method: "GET",
      }).then((res) => {
        if(res.status===200){
          setResponse(res.data);
          setSection("RESERVATION_MADE");
        }
        else{setSection("ERROR_ON_API_CALL")}
      })    
      .catch((err) => 
        { setSection("ERROR_ON_API_CALL") }
      );
    }
  },[section])

  return(
    <div style={stylePopUp.container(isNormalComputer)}>
      {(  section==="LOADING" || 
          section==="GETTING_USER_BY_EMAIL" || 
          section==="GETTING_USER_BY_PHONE_NUMBER" || 
          section==="VERIFY_DATA_USER" || 
          section==="CREATE_NEW_USER" ||
          section==="PROCEED_TO_CREATE_RESERVATION" || 
          section==="SEND_EMAIL_OWNER" ||
          section === "SEND_EMAIL" 
        ) && <CreatingBookingPlaceholder background='#F2B51B' text={Translations.LoadingPlaceholder}/>}
      {section==="SUMMARY" && 
      <div style={{backgroundColor:'#F2B51B', width:'100%', height:'100%', paddingTop:'5px', paddingRight:'15px', paddingLeft:'15px', paddingBottom:'15px', border:'2px solid black', borderRadius:'10px', outline:'10px solid transparent', display:'flex', flexDirection:'column'}}>
        <div className="close" style={{marginLeft:'95%', marginRight:'auto', width:'24px', height:'24px', cursor:'pointer'}} onClick={closeModalFunction}>
          <i className="fa fa-times"></i>
        </div>
        <ConfirmationPage setPage={setSection}/>
      </div>}
      {section==="RESERVATION_MADE" && <ReservationMade closeModal={closeModalFunction}/>}
      {section==="ERROR_ON_API_CALL" && <ErrorBooking closeModal={closeModalFunction}/>}
    </div>
)}

const stylePopUp = {
  container: (isNormalComputer: boolean)  => ({
   width:             isNormalComputer ? '500px' : '100vw', 
   height:            '625px', 
   backgroundColor:   '#F2B51B',
   borderRadius:      '10px'
  })
};