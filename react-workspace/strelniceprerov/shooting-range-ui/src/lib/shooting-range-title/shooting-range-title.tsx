import { useSelector } from 'react-redux';
import { falseEntitySelector } from '../store';
import PropTypes, { InferProps } from 'prop-types';
import { ShootingRangeTitleView } from './shooting-range-title.view';
import React from 'react';
import axios from 'axios';
import Clock from 'react-live-clock';
import { WrapperBooking } from './components/WrapperBooking';


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
      maxBookingLength:   res.data.find((variable : any) => variable.name==="Max_Length_Booking").value
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
    console.log(e);
    //setRefreshData(e);
  }
  return (    
    <div className="wrapper-diego">
      <Clock style={{visibility:'hidden'}} format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} onChange={(e) => callBackClock(e)}/>
      {Object.keys(globalVariables).length > 0 ? <WrapperBooking gVariables={globalVariables}/> : "LOADING..."}
    </div>)
}

/**
 * Exposing props to elementor through the web component
 * /!\ o not use this for state management
 */
ShootingRangeTitle.propTypes = ShootingRangeTitlePropsTypes;
