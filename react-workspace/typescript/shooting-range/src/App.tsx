import React from 'react';
import './App.css';
import { WrapperBooking } from './shooting-range-title/components/WrapperBooking';
import { WrapperManagementDashboard} from './shooting-range-input/WrapperManagementDashboard';
import axios from 'axios';
import {TextPlaceholder} from './shooting-range-title/PlaceHolderBookingSection';
import {Translations} from './shooting-range-title/types/translations';
import {useFetchEndPoint} from "./Common/useFetchEndPoint";
import {GlobalVariableInterface} from "./Common/Types/interfaces";
import {AllEndPointsSuccessFullyFetched} from "./Common/Helpers";

function App() {
  const [globalVariables, setGlobalVariables] = React.useState<GlobalVariableInterface[]>([] as GlobalVariableInterface[]);
  const [waitDone, setWaitDone]   = React.useState(false);
  const   getGlobalVariables      =  useFetchEndPoint("http://strelnice-prerov-local.local/wp-content/plugins/elementor/", "getAllGlobalVariables", setGlobalVariables);
  // React.useEffect(() =>{
  //   axios({
  //     url: "http://strelnice-prerov-local.local/wp-content/plugins/elementor/getGlobalVariables.php",
  //     method: "GET",
  // }).then((res) => {
  //   setGlobalVariables(({
  //     startBusinessHours: res.data.find((variable : any) => variable.name==="Start_Business_Hours").value,
  //     endBusinessHours:   res.data.find((variable : any) => variable.name==="End_Business_Hours").value,
  //     startDayHours:      res.data.find((variable : any) => variable.name==="Start_Day_Hours").value,
  //     endDayHours:        res.data.find((variable : any) => variable.name==="End_Day_Hours").value,
  //     apiRootURL:         res.data.find((variable : any) => variable.name==="API_URL").value,
  //     defaultLocation:    res.data.find((variable : any) => variable.name==="Default_Location").value,
  //     maxOccupancy:       res.data.find((variable : any) => variable.name==="Max_Occupancy").value,
  //     maxBookingLength:   res.data.find((variable : any) => variable.name==="Max_Length_Booking").value,
  //     defaultDuration:    res.data.find((variable : any) => variable.name==="Default_Booking_Length").value,
  //     defaultOccupancy:   res.data.find((variable : any) => variable.name==="Default_Booking_Occupancy").value,
  //     msgAlertSlotFull:   res.data.find((variable : any) => variable.name==="Alert_Message_Slot_Full").value,
  //     msgAlertOccupancy:  res.data.find((variable : any) => variable.name==="Alert_Message_Occupancy").value,
  //     sendGridEncryptedKey: res.data.find((variable : any) => variable.name==="SendGrid_Key_Encrypted").value,
  //     decryptionKey:        res.data.find((variable : any) => variable.name==="Decryption_Key").value,
  //     emailFrom:        res.data.find((variable : any) => variable.name==="Email_From").value,
  //     confirmationTemplateId:        res.data.find((variable : any) => variable.name==="Confirmation_email_template").value,
  //     changeEmailTemplateId:         res.data.find((variable : any) => variable.name==="Change_email_template").value,
  //     deleteEmailTemplate:           res.data.find((variable : any) => variable.name==="Cancelation_email_template").value,
  //     msgErrorNonZeroHour:           res.data.find((variable : any) => variable.name==="error_time_slot_not_rounded").value,
  //     msgErrorWrongConditions:       res.data.find((variable : any) => variable.name==="error_time_slot_wrong_conditions").value,
  //     msgErrorEmail:                 res.data.find((variable : any) => variable.name==="error_email").value,
  //     msgErrorPhoneNumber:           res.data.find((variable : any) => variable.name==="error_phone_number").value,
  //     msgErrorInstructor:            res.data.find((variable : any) => variable.name==="error_instructor").value,
  //     blockSegmentFormTitle:         res.data.find((variable : any) => variable.name==="title_block_segment_form").value
  //   }))
  // })
  //   .catch((err) => { console.log(err) });
  // },[])
  return (
    <div className="App" style={{overflowY:'scroll', maxHeight:'100vh'}}>
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
      <hr></hr>
      {/*AllEndPointsSuccessFullyFetched([getGlobalVariables]) ? <WrapperBooking gVariables={globalVariables}/> : <div style={{width:'100%', height:'882px'}}><TextPlaceholder text={Translations.LoadingPlaceholder}/></div>*/}
      <hr/>
      {AllEndPointsSuccessFullyFetched([getGlobalVariables]) ? <WrapperManagementDashboard {...globalVariables}/> : <div style={{width: '100%', height: '882px'}}><TextPlaceholder text={Translations.LoadingPlaceholder}/></div>}
    </div>
  );
}

export default App;