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
import WarningIcon from '@mui/icons-material/Warning';
import { ConfirmationPage } from "./ConfirmationPage";
import CancelIcon from '@mui/icons-material/Cancel';
import Popup from "reactjs-popup";
import { BookingFlowSpace } from "./BookingFlowSpace";
/*-------------------------------------------------------------------------------------------------------------*/
/*                                            HELPER FUNCTIONS                                                 */
/*-------------------------------------------------------------------------------------------------------------*/
const reArrangeInstructorSegments = (instructorSegments: any) => {
  const respArray : any[] = [];
  instructorSegments.forEach((entry : any) => {
    const index = respArray.findIndex((item) => item.guid === entry.guid);
    if((instructorSegments.filter((entrySegment : any) => entrySegment.guid===entry.guid).length===1)&&index===-1){
      respArray.push(entry);
    }
    else if((instructorSegments.filter((entrySegment : any) => entrySegment.guid===entry.guid).length>1)&&index===-1){
      const filterItems = instructorSegments.filter((entrySegment : any) => entrySegment.guid===entry.guid);
      const firstItem = filterItems.shift(0);
      const id              = firstItem.id;
      let   startSegment    = firstItem.startTime;
      let   endSegment      = firstItem.endTime;
      const instructorId    = firstItem.instructorId; 
      const instructorName  = firstItem.instructorName;
      const guid            = firstItem.guid;

      filterItems.forEach((filterEntry : any) =>{
        if((filterEntry.startTime < startSegment)){startSegment=filterEntry.startTime}
        if((filterEntry.endTime > endSegment)){endSegment=filterEntry.endTime}
      })
      respArray.push({
        id: id,
        instructorId : instructorId,
        instructorName: instructorName, 
        guid: guid, 
        startTime: startSegment,
        endTime: endSegment
      })
    }
  });
  return(respArray);
}

//TO IMPLEMENT CENTRALIZED API CALLS
export function WrapperBookingSection() {
  const anyArray : any[] = [];
  const [controlAPI, setControlAPI]                                   = React.useState(anyArray);
  const [refreshBookingEnv, setRefreshBookingEnv]                     = React.useState(0);

  const { setLocationList,  selectedWeek,
          setBookings,      selectedLocation,
          apiURL,           showingPage, 
          setShowingPage,   setInstructorSegments,
          setSelectedSegment, setName,
          setEmail, setPhone,
          setShootingPermitNumber, setSelectedBookingDuration,
          setRefreshEntirePlugin, refreshEntirePlugin,
          withInstructors,  setSummaryBookingSegments, setSumInstBookingSegments,
          showPopUpBookingProcess, setShowPopUpBookingProcess}                                            = React.useContext(BookingContext);
  const closeModal  = (e : any) => {
    if(e==="BOOKING_COMPLETE"){
      setShowPopUpBookingProcess(false);
      setShowingPage("LOADING");
      setSelectedSegment([]);
      setName("");
      setEmail("");
      setPhone("");
      setShootingPermitNumber("");
      setSelectedBookingDuration(1);
      setRefreshBookingEnv(refreshBookingEnv + 1);
      setRefreshEntirePlugin(!refreshEntirePlugin);
    }
    else{
    setShowPopUpBookingProcess(false);}
  }
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
    React.useEffect( () => {    
      axios({
        url: `${apiURL}getAllInstructorSegments.php`,
        method: "GET",
    }).then((res) => {
      setInstructorSegments(reArrangeInstructorSegments(res.data));
      const controlArray = controlAPI;
      controlArray.push('INSTRUCTOR_SEGMENTS');
      setControlAPI(controlArray);
    })},[])
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
  if(controlAPI.includes('SHOOTING_RANGE_LIST' && 'BOOKINGS_FILTERED' && 'INSTRUCTOR_SEGMENTS'&& 'SUMMARY_BOOKINGS' && 'SUMMARY_INST_BOOKINGS')){
    setShowingPage('BOOKING_CALENDAR');
    setControlAPI([]);
  }
  return(
    <>
    <div className="Wrapup-bookingflow-wrapper" style={{opacity:`${showPopUpBookingProcess ? '0.5' : '1'}`, pointerEvents:`${showPopUpBookingProcess ? 'none' : 'auto'}`}}>
      {(showingPage!=="POPUP_LENGTH" && showingPage!=="CONFIRMATION_PAGE") &&  <RenderHeader/>}
      {showingPage==="LOADING"          && <>LOADING BOOKING CALENDAR</>}
      {showingPage==="BOOKING_CALENDAR" && 
      <>
        <BookingCalendarWrappper/>
        <BookingFormWrapper />
      </>}
      {showingPage==="POPUP_LENGTH" &&  
      <div style={{margin:'auto', display: 'flex', flexDirection: 'column', border:'2px solid black', borderRadius:'5px', padding:'15px', maxWidth:'auto'}}>
        <WarningIcon style={{height:'72px', width:'72px', marginLeft:'auto', marginRight:'auto', marginTop:'10px', marginBottom:'10px'}} color='primary' />
        <Typography sx={{ p: 2 }}>Vybral/a jste čas, který přesahuje do rezervace, která je plná. Prosíme o vybránní nového času nebo zkrácení doby rezervace.</Typography>
        <Button onClick={()=>setShowingPage("BOOKING_CALENDAR")} variant='contained'>
          CLOSE
        </Button>
      </div>
       }
    </div>
       {<Popup open={showPopUpBookingProcess} onClose={closeModal} closeOnDocumentClick={false} >
        <BookingFlowSpace closeModalFunction={closeModal}/>
      </Popup>}
       {/*showingPage==="CONFIRMATION_PAGE" && <ConfirmationPage/>*/}
    </>
)}