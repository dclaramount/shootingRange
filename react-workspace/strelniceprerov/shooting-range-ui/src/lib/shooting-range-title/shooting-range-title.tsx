import { useSelector } from 'react-redux';
import { falseEntitySelector } from '../store';
import PropTypes, { InferProps } from 'prop-types';
import { ShootingRangeTitleView } from './shooting-range-title.view';
import React from 'react';
import axios from 'axios';
import Clock from 'react-live-clock';
import { WrapperBooking } from './components/WrapperBooking';
import PlaceHolderBookingSection from './PlaceHolderBookingSection';


export const ShootingRangeTitlePropsTypes = {
  label: PropTypes.string,
};

export type ShootingRangeTitleProps = InferProps<
  typeof ShootingRangeTitlePropsTypes
>;

/**
 * Same component linked to the store
 */
export function ShootingRangeTitle(props: ShootingRangeTitleProps) {
  const v = useSelector(falseEntitySelector);
  const [refreshData, setRefreshData] = React.useState(0);
  const [timeStamp, setTimeStamp] = React.useState(null);
  const [globalVariables, setGlobalVariables] = React.useState({});
  const [waitDone, setWaitDone] = React.useState(false);
  
  React.useEffect(() =>{    
    axios({
      url: "https://strelniceprerov.cz/wp-content/plugins/elementor-addon/widgets/getGlobalVariables.php",
      method: "GET",
  }).then((res) => {
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
  /*
  React.useEffect(() =>{
    axios({
      // Endpoint to send files
      url: "https://strelniceprerov.cz/wp-content/plugins/elementor-addon/widgets/test.php",
      method: "GET",
      headers: {
          // Add any auth token here
      },
      // Attaching the form data
  })
      .then((res) => { 
        console.log(res.data.timestamp);  
        setTimeStamp(res.data.timestamp);
      })
      .catch((err) => { 
        console.log(err) 
      });
  },[refreshData])*/

  function callBackClock(e:any){
    //setRefreshData(e);
  }
  const delayInMilliseconds = 5000; //1 second
  setTimeout(function() {
    setWaitDone(true);
  }, delayInMilliseconds);
  return (    
    <div className="wrapper-diego">
      <Clock style={{visibility:'hidden'}} format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} onChange={(e) => callBackClock(e)}/>
      {(Object.keys(globalVariables).length > 0 && waitDone) ? <WrapperBooking gVariables={globalVariables}/> : <PlaceHolderBookingSection/>}
      <div id="popup-root" />
    </div>)
}

/**
 * Exposing props to elementor through the web component
 * /!\ o not use this for state management
 */
ShootingRangeTitle.propTypes = ShootingRangeTitlePropsTypes;
