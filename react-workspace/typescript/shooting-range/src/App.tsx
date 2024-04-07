import React from 'react';
import logo from './logo.svg';
import './App.css';
import { WrapperBooking } from './shooting-range-title/components/WrapperBooking';
import { WrapperManagementDashboard} from './shooting-range-input/WrapperManagementDashboard';
import axios from 'axios';
import DataGridSummaryTable from './shooting-range-input/DataGridSummaryTable';
import TabManagement from './shooting-range-input/TabMangement';
import PlaceHolderBookingSection from './shooting-range-title/PlaceHolderBookingSection';

function App() {
  const [allBookings, setAllBookings] = React.useState([]);
  const [globalVariables, setGlobalVariables] = React.useState({});
  const [waitDone, setWaitDone] = React.useState(false);
  React.useEffect(() =>{    
    axios({
      url: "https://strelniceprerov.cz/wp-content/plugins/elementor-addon/widgets/getAllBookings.php",
      method: "GET",
  }).then((res) => {setAllBookings(res.data)})
    .catch((err) => { console.log(err) });
  },[])
  React.useEffect(() =>{    
    axios({
      url: "https://strelniceprerov.cz/wp-content/plugins/elementor-addon/widgets/getGlobalVariables.php",
      method: "GET",
  }).then((res) => {
    console.log(res.data);
    setGlobalVariables(({
      startBusinessHours: res.data.find((variable : any) => variable.name==="Start_Business_Hours").value,
      endBusinessHours:   res.data.find((variable : any) => variable.name==="End_Business_Hours").value,
      startDayHours:      res.data.find((variable : any) => variable.name==="Start_Day_Hours").value,
      endDayHours:        res.data.find((variable : any) => variable.name==="End_Day_Hours").value,
      apiRootURL:         res.data.find((variable : any) => variable.name==="API_URL").value,
      defaultLocation:    res.data.find((variable : any) => variable.name==="Default_Location").value,
      maxOccupancy:       res.data.find((variable : any) => variable.name==="Max_Occupancy").value,
      maxBookingLength:   res.data.find((variable : any) => variable.name==="Max_Length_Booking").value,
      defaultDuration:    res.data.find((variable : any) => variable.name==="Default_Booking_Length").value,
      defaultOccupancy:   res.data.find((variable : any) => variable.name==="Default_Booking_Occupancy").value,
      msgAlertSlotFull:   res.data.find((variable : any) => variable.name==="Alert_Message_Slot_Full").value,
      msgAlertOccupancy:  res.data.find((variable : any) => variable.name==="Alert_Message_Occupancy").value,
      sendGridEncryptedKey: res.data.find((variable : any) => variable.name==="SendGrid_Key_Encrypted").value,
      decryptionKey:        res.data.find((variable : any) => variable.name==="Decryption_Key").value,
      emailFrom:        res.data.find((variable : any) => variable.name==="Email_From").value,
      confirmationTemplateId:        res.data.find((variable : any) => variable.name==="Confirmation_email_template").value
    }))
  })
    .catch((err) => { console.log(err) });
  },[])
  function buildArrayOfBusinessHours(startHour : any, endHour : any){
    const Array = []
    let countStartHour = parseInt(startHour);
    console.log(endHour);
    while(countStartHour < parseInt(endHour)){
      if(countStartHour < 10){
        Array.push(`0${countStartHour}`);
      }
      else{
        Array.push(`${countStartHour}`);
      }
      countStartHour=countStartHour+1;
    }
  }
var delayInMilliseconds = 5000; //1 second
setTimeout(function() {
  setWaitDone(true);
}, delayInMilliseconds);
  return (
    <div className="App">
      <style>
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-bootstrap-strelnice.css"/>
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-calendar.css"/>
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-front-strelnice.css"/>
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-print-strelnice.css"/>
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-reboot-strelnice.css"/>
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-reservation-strelnice.css"/>
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-honest-week-picker.css"/>
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-allmin.css"/>
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-dx-material-blue-light.css"/>
        <link rel="stylesheet" href="https://strelniceprerov.cz/wp-admin/css/bw-dx-demo-template.css"/>
      </style>
      <header className="App-header" style={{minHeight: '5vh'}}>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Creating Shooting Range Plugins        
        </a>
      </header>
      {/*<WrapperReservationManagement/>*/}
      <hr></hr>
      {(Object.keys(globalVariables).length > 0 && waitDone) ? <WrapperBooking gVariables={globalVariables}/> : <PlaceHolderBookingSection/>}
      {/*Object.keys(globalVariables).length > 0 ? <WrapperManagementDashboard gVariables={globalVariables}/> : "LOADING..."*/}
    </div>
  );
}

export default App;