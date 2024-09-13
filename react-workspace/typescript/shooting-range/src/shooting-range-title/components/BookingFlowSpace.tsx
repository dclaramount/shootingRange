import React from 'react';
import { ConfirmationPage } from './ConfirmationPage';
import { BookingConfPlaceHolder, CreatingBookingPlaceholder } from '../PlaceHolderBookingSection';
import axios from 'axios';
import { BookingContext } from './Context/BookingContext';
import { ReservationMade } from './ReservationMade';
import { v4 } from "uuid";
import {Translations} from "../types/translations";

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
    comment
} = React.useContext(BookingContext);

  const [section, setSection]  =   React.useState("LOADING"); 
  const [response, setResponse]  =   React.useState([]); 
  const [userAccount, setUserAccount] = React.useState<UserEntry>({ID:0, id: "", name:"", email:"", phoneNumber:"", shootingPermit:"", updatedOn:new Date(), userId:""});
  const [uniqueIdentifier, setUniqueIdentifier] = React.useState(v4())
  // Function to verify if the user data has changed and therefore if it needs to be updated on the DB.
  function hasUserDataChanged(entryUser: UserEntry){
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
        if(res.status===200){
          const userData : UserEntry[] = res.data;
          if(userData.length>0){
            setUserAccount(userData[0]);
            setSection("VERIFY_DATA_USER")
          }
          else{
            setSection("GETTING_USER_BY_PHONE_NUMBER");
          }
        }
        else{
          setSection("ERROR_ON_API_CALL");
        }
      })
    .catch((err) => { console.log(err); setSection("CREATING_RESERVATION_VERIFYING_USER") });
    }
    //1.1 Step get the User Account by PhoneNumber
    else if(section==="GETTING_USER_BY_PHONE_NUMBER"){
      axios({
        url: `${apiURL}getUserRecordByPhoneNumber.php?phoneNumber=${phone}`,
        method: "GET",
      }).then((res) => {
        if(res.status===200){
          const userData : UserEntry[] = res.data;
          if(userData.length>0){
            setUserAccount(userData[0]);
            setSection("VERIFY_DATA_USER")
          }
          else{
            setSection("VERIFY_DATA_USER");
          }
        }
        else{
          setSection("ERROR_ON_API_CALL");
        }
      })
    .catch((err) => { console.log(err); setSection("CREATING_RESERVATION_VERIFYING_USER") });
    }
    //3 Verify User Entry.
    else if(section==="VERIFY_DATA_USER"){
      console.log("Verifing User Data")
      if(hasUserDataChanged(userAccount)){
        axios({
          url: `${apiURL}postUpdateUserEntry.php?id=${userAccount.id}&shootingPermit=${shootingPermit}&shootingPermitNumber=${shootingPermitNumber}&name=${name}&email=${email}&phone=${phone}`,
          method: "GET",
        }).then((res) => {
          setSection("PROCEED_TO_CREATE_RESERVATION");
        })
      .catch((err) => { console.log(err) });
      }
      //Create New User
      else{
        axios({
          url: `${apiURL}postCreateNewUser.php?id=${userAccount.id}&shootingPermit=${shootingPermit}&shootingPermitNumber=${shootingPermitNumber}&name=${name}&email=${email}&phone=${phone}`,
          method: "GET",
        }).then((res) => {
          if(res.data.length>0){
            setUserAccount(res.data[0]);
            setSection("PROCEED_TO_CREATE_RESERVATION");
          }
          else{
            setSection("ERROR_ON_API_CALL");
          }
        })
      .catch((err) => { console.log(err) });
        setSection("ERROR_ON_API_CALL");
      }
    }
    //4 Create Reservation.
    else if(section==="PROCEED_TO_CREATE_RESERVATION"){
      axios({
        url: `${apiURL}postCreateBooking.php?selectedLocationId=${selectedLocation}&selectedSegment=${selectedSegment}&selectedBookingDuration=${selectedBookingDuration}&selectedOccupancy=${selectedOccupancy}&shootingInstructor=${shootingInstructor}&userId=${userAccount.id}&comment=${comment}&uuidInvoice=${uniqueIdentifier}`,
        method: "GET",
      }).then((res) => {
        setResponse(res.data);
        setSection("SEND_EMAIL");
      })
    .catch((err) => { console.log(err) });
    }
    //4 Send Email Confirmation Reservation.
    else if(section==="SEND_EMAIL"){
      const selectedLocationName = locationList.find((location : any) => parseInt(location.id) === parseInt(selectedLocation)).serviceName;
      const formatedDate = `${(new Date(selectedSegment[0])).toLocaleDateString('de-DE')} ${selectedSegment[0].split(' ')[1]}`;
      const finishTimeStamp = selectedSegment[selectedSegment.length-1].split(' ')[1];
      const finishTime= parseInt(finishTimeStamp.split(':')[0]) + 1;
      const formatedSelectedSegment = `${formatedDate}->${finishTime.toString()}:00`;
      //const formatedSelectedSegment = selectedSegment.length > 1 ? `${formatedDate}-${selectedSegment[selectedSegment.length-1].split(' ')[1]}` : formatedDate;    
      axios({
        url: `${apiURL}postSendEmail.php?sendGridKey=${sendGridKeyAPI}&emailTo=${email}&emailFrom=${sendGridFromEmail}&templateId=${sendGridTemplateConfirmationId}&segmentBooked=${formatedSelectedSegment}&nameOnReservation=${name}&shootingRangeName=${selectedLocationName}&phoneNumber=+${phone}&comment=${comment}&uuidInvoice=${uniqueIdentifier}`,
        method: "GET",
      }).then((res) => {
        setResponse(res.data);
        setSection("SEND_EMAIL_OWNER");
      })
    .catch((err) => { console.log(err) });
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
        setResponse(res.data);
        setSection("RESERVATION_MADE");
      })
    .catch((err) => { console.log(err) });
    }

  },[section])

  return(
    <div style={{width:'500px', height: '625px', backgroundColor:'#F2B51B'}}>
      {(  section==="LOADING" || 
          section==="GETTING_USER_BY_EMAIL" || 
          section==="GETTING_USER_BY_PHONE_NUMBER" || 
          section==="VERIFY_DATA_USER" || 
          section==="PROCEED_TO_CREATE_RESERVATION" || 
          section === "SEND_EMAIL" 
        ) &&<CreatingBookingPlaceholder background='#F2B51B' text={Translations.LoadingPlaceholder}/>}
      {section==="SUMMARY" && 
      <div style={{backgroundColor:'#F2B51B', width:'100%', height:'100%', paddingTop:'5px', paddingRight:'15px', paddingLeft:'15px', paddingBottom:'15px', border:'2px solid black', borderRadius:'10px', outline:'10px solid transparent', display:'flex', flexDirection:'column'}}>
        <div className="close" style={{marginLeft:'95%', marginRight:'auto', width:'24px', height:'24px', cursor:'pointer'}} onClick={closeModalFunction}>
          <i className="fa fa-times"></i>
        </div>
        <ConfirmationPage setPage={setSection}/>
      </div>}
      {section==="RESERVATION_MADE" && <ReservationMade closeModal={closeModalFunction}/>}
      {section==="ERROR_ON_API_CALL" && <>PLACEHOLDER FOR ERROR</>}
    </div>
)}