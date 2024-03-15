import { BookingCalendarWrappper } from "./BookingCalendarWrapper";
import { RenderHeader } from "./RenderHeader";
import { BookingContext } from "./Context/BookingContext";
import React from 'react';
import { BookingFormWrapper } from "./BookingFormWrapper";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


//TO IMPLEMENT CENTRALIZED API CALLS
export function WrapperBookingSection() {
  const anyArray : any[] = [];
  const [controlAPI, setControlAPI]                                   = React.useState(anyArray);
  const [refreshBookingEnv, setRefreshBookingEnv]                     = React.useState(0);
  const { setLocationList,  selectedWeek,
          setBookings,      selectedLocation,
          apiURL,           showingPage, 
          setShowingPage, setSummaryBookingSegments, setSumInstBookingSegments}                                                     = React.useContext(BookingContext);
  /*-------------------------------------------------------------------------------------------------------------*/
  /*                                                API CALLS                                                    */
  /*-------------------------------------------------------------------------------------------------------------*/
  React.useEffect(() =>{    
    axios({
      url: `${apiURL}getListShootingRange.php`,
      method: "GET",
  }).then((res) => {
    setLocationList(res.data)
    const controlArray = controlAPI;
    controlArray.push('SHOOTING_RANGE_LIST');
    setControlAPI(controlArray);
  }).catch((err) => { 
    console.log(err) 
  });
  },[refreshBookingEnv])

  React.useEffect(()=> {
    if(Object.keys(selectedWeek).length>0){
      const firstDay= (new Date(selectedWeek.firstDay)).toISOString();
      const lastDay=  (new Date(selectedWeek.lastDay)).toISOString();
      axios({
        url: `${apiURL}getBookingsFiltered.php?firstDayOfWeek=${firstDay}&lastDayOfWeek=${lastDay}&location=${selectedLocation}`,
        method: "GET",
      }).then((res) => {
          setBookings(res.data)
          const controlArray = controlAPI;
          controlArray.push('BOOKINGS_FILTERED');
          setControlAPI(controlArray);
        })
        .catch((err) => { console.log(err) });
      }
    },[selectedWeek , selectedLocation, refreshBookingEnv])

    React.useEffect(() =>{    
      axios({
        url: `${apiURL}getSummaryBookings.php`,
        method: "GET",
    }).then((res) => {
      setSummaryBookingSegments(res.data);
      const controlArray = controlAPI;
      controlArray.push('SUMMARY_BOOKINGS');
      setControlAPI(controlArray);
    })
      .catch((err) => { console.log(err) });
    },[refreshBookingEnv])
    React.useEffect(() =>{    
      axios({
        url: `${apiURL}getSummaryInstBookings.php`,
        method: "GET",
    }).then((res) => {
      console.log(res);
      setSumInstBookingSegments(res.data);
      const controlArray = controlAPI;
      controlArray.push('SUMMARY_INST_BOOKINGS');
      setControlAPI(controlArray);
    })
      .catch((err) => { console.log(err) });
    },[refreshBookingEnv])

  if(controlAPI.includes('SHOOTING_RANGE_LIST' && 'BOOKINGS_FILTERED' && 'SUMMARY_INST_BOOKINGS' &&'SUMMARY_BOOKINGS' )){
    setShowingPage('BOOKING_CALENDAR');
    setControlAPI([]);
  }
  console.log("RELOAD WRAPPER BOOKING SECTION...")
  console.log(showingPage)
  return(
    <>
      {showingPage!=="POPUP_LENGTH" &&  <RenderHeader/>}
      {showingPage==="LOADING"          && <>LOADING BOOKING CALENDAR</>}
      {showingPage==="BOOKING_CALENDAR" && 
      <>
        <BookingCalendarWrappper/>
        <BookingFormWrapper />
      </>}
      {showingPage==="POPUP_LENGTH" &&  
      <div style={{margin:'auto'}}>
        <Typography sx={{ p: 2 }}>THE FOLLOWING SEGMENT IS FULL PLEASE SELECT ANOTHER COMBINATION OF SEGMENTS.</Typography>
        <Button onClick={()=>setShowingPage("BOOKING_CALENDAR")}>
          CLOSE
        </Button>
      </div>
       }
    </>
)}