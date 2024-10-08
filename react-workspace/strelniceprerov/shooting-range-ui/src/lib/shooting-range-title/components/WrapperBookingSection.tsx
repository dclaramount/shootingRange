import { BookingCalendarWrappper } from "./BookingCalendarWrapper";
import { RenderHeader } from "./RenderHeader";
import { BookingContext } from "./Context/BookingContext";
import React from 'react';
import { BookingFormWrapper } from "./BookingFormWrapper";
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import WarningIcon from '@mui/icons-material/Warning';
import Popup from "reactjs-popup";
import { BookingFlowSpace } from "./BookingFlowSpace";
import PlaceHolderBookingSection from "../PlaceHolderBookingSection";
import { useMediaQuery } from "../hooks/useMediaQuery";
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

  const { setLocationList,          selectedWeek,                 setBookings,
          selectedLocation,         apiURL,                       showingPage, 
          setShowingPage,           setInstructorSegments,        setSelectedSegment,
          setName,                  setEmail,                     setPhone,                 
          setShootingPermitNumber,  setSelectedBookingDuration,   setRefreshEntirePlugin,   
          refreshEntirePlugin,      setSummaryBookingSegments,    setSumInstBookingSegments,
          showPopUpBookingProcess,  setShowPopUpBookingProcess,   setComment,
          showWarningChooseAnotherSegment, setShowWarningChooseAnotherSegment,
          setAllBlockingSegments, setIsNormalComputer, isNormalComputer
        } = React.useContext(BookingContext);
  setIsNormalComputer(useMediaQuery('(min-width: 739px)'));
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
      setComment("");
      setRefreshBookingEnv(refreshBookingEnv + 1);
      setRefreshEntirePlugin(!refreshEntirePlugin);
    }
    else{
    setShowPopUpBookingProcess(false);}
  }
  const closeModalWarning = () => {
    setShowWarningChooseAnotherSegment(false);
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
    React.useEffect(() =>{    
      axios({
        url: `${apiURL}getAllBlockingSegments.php`,
        method: "GET",
    }).then((res) => {
      setAllBlockingSegments(res.data);
      const controlArray = controlAPI;
      controlArray.push('ALL_BLOCKING_SEGMENTS');
      setControlAPI(controlArray);
    })
      .catch((err) => { console.log(err) });
    },[refreshBookingEnv])
  if(controlAPI.includes('SHOOTING_RANGE_LIST' && 'BOOKINGS_FILTERED' && 'INSTRUCTOR_SEGMENTS'&& 'SUMMARY_BOOKINGS' && 'SUMMARY_INST_BOOKINGS' && 'ALL_BLOCKING_SEGMENTS')){
    setShowingPage('BOOKING_CALENDAR');
    setControlAPI([]);
  }
  let factor = 1;
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    factor = 0;
  }else{
    factor = 1;
  }
  return(
    <>
    <div className='BookingSpaceWrapper' style={styles.container(isNormalComputer, showPopUpBookingProcess, showWarningChooseAnotherSegment)}>
    <div className="wrapperPopUp" style={stylesWrapperPopUp.container(isNormalComputer, showPopUpBookingProcess, showWarningChooseAnotherSegment)}>
      {(showingPage!=="POPUP_LENGTH" && showingPage!=="CONFIRMATION_PAGE") &&  <RenderHeader/>}
      {showingPage==="LOADING"          && <PlaceHolderBookingSection/>}
      {showingPage==="BOOKING_CALENDAR" && 
      //Specific to the WordPress environment ----
      <div className="Wrapper_Booking_Area" style={styleWrapperBookingArea.container(isNormalComputer, factor)}>
        <BookingCalendarWrappper/>
      </div>}
    </div>
    <BookingFormWrapper/>
    </div>
      <Popup open={showPopUpBookingProcess} onClose={closeModal} closeOnDocumentClick={false} >
        <BookingFlowSpace closeModalFunction={closeModal}/>
      </Popup>
      <Popup open={showWarningChooseAnotherSegment} onClose={closeModalWarning} closeOnDocumentClick={false} >
        <div style={{backgroundColor:'white', width:'500px', height:'250px', paddingTop:'5px', paddingRight:'15px', paddingLeft:'15px', paddingBottom:'15px', border:'2px solid black', borderRadius:'10px', outline:'10px solid transparent', display:'flex', flexDirection:'column'}}>
          <WarningIcon style={{height:'72px', width:'72px', marginLeft:'auto', marginRight:'auto', marginTop:'10px', marginBottom:'10px', color:'orange'}}/>
            <Typography sx={{ p: 2 }} style={{ fontWeight:'bold', color:'black', textAlign:'center'}}>Vybral/a jste čas, který přesahuje do rezervace, která je plná. Prosíme o vybránní nového času nebo zkrácení doby rezervace.</Typography>
            <Button onClick={()=>setShowWarningChooseAnotherSegment(false)} variant='contained' style={{backgroundColor:'orange', fontWeight:'bolder', color:'white', width:'auto'}}>
              Close
            </Button>
        </div>
      </Popup>
    </>
)}
const styles = {
  container: (isNormalComputer: boolean, showPopUpBookingProcess: boolean, showWarningChooseAnotherSegment:boolean)  => ({
    display:'flex',
    opacity:(showPopUpBookingProcess || showWarningChooseAnotherSegment) ? '0.5' : '1',
    pointerEvents: showPopUpBookingProcess ? 'none' as React.CSSProperties["pointerEvents"] : 'auto' as React.CSSProperties["pointerEvents"],
    flexDirection: isNormalComputer ? 'row' as React.CSSProperties["flexDirection"] : 'column' as React.CSSProperties["flexDirection"],
    width: isNormalComputer ? '100%' : 'calc(100vw - 60px)',
    margin: isNormalComputer ? '' : '0px auto 0px auto'
  })
};
const styleWrapperBookingArea = {
  container: (isNormalComputer: boolean, factor:number)  => ({
    marginLeft: (isNormalComputer && factor ===1) ? '-125px' : 'unset',
    display: (isNormalComputer && factor ===1) ? 'block' : 'flex',
    alignItems: (isNormalComputer && factor ===1) ? 'unset' : 'center',
    justifyContent: (isNormalComputer && factor ===1) ? 'unset' : 'center',
    scale: isNormalComputer ? 'unset' : '0.95'
  })
};
const stylesWrapperPopUp = {
  container: (isNormalComputer: boolean, showPopUpBookingProcess: boolean, showWarningChooseAnotherSegment:boolean)  => ({
    opacity:`${(showPopUpBookingProcess || showWarningChooseAnotherSegment) ? '0.5' : '1'}`, 
    pointerEvents: showPopUpBookingProcess ? 'none' as React.CSSProperties["pointerEvents"] : 'auto' as React.CSSProperties["pointerEvents"],
    height: isNormalComputer ? 'unsnet' : '710px',
   // marginLeft: isNormalComputer ? '0px' : '-4vw'
  })
};