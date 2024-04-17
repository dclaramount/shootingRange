import React from 'react';
import axios from 'axios';
import 'devextreme/dist/css/dx.light.css';
import { ManagementDashboardContext } from './Context/ManagementDashboardContext';
import TabManagement from './TabMangement';

/*-------------------------------------------------------------------------------------------------------------*/
/*                                            HELPER FUNCTIONS                                                 */
/*-------------------------------------------------------------------------------------------------------------*/
const reArrangeInstructorSegments = (instructorSegments: any) => {
  const respArray : any[] = [];
  instructorSegments.forEach((entry : any) => {
    let index = respArray.findIndex((item) => item.guid === entry.guid);
    if((instructorSegments.filter((entrySegment : any) => entrySegment.guid===entry.guid).length===1)&&index===-1){
      respArray.push(entry);
    }
    else if((instructorSegments.filter((entrySegment : any) => entrySegment.guid===entry.guid).length>1)&&index===-1){
      let filterItems = instructorSegments.filter((entrySegment : any) => entrySegment.guid===entry.guid);
      let firstItem = filterItems.shift(0);
      let id              = firstItem.id;
      let startSegment    = firstItem.startTime;
      let endSegment      = firstItem.endTime;
      let instructorId    = firstItem.instructorId; 
      let instructorName  = firstItem.instructorName;
      let guid            = firstItem.guid;

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

const buildArrayOfBusinessHours = (startHour : any, endHour : any) => {
  const Array = []
  let countStartHour = parseInt(startHour);
  while(countStartHour < parseInt(endHour)){
    if(countStartHour < 10){
      Array.push(`0${countStartHour}`);
    }
    else{
      Array.push(`${countStartHour}`);
    }
    countStartHour=countStartHour+1;
  }
  return Array;
}

export function WrapperManagementDashboard({gVariables} : any) {
  const anyArray : any[] = [];
  /*-------------------------------------------------------------------------------------------------------------*/
  /*                                     HOOKS IN CONTEXT PROVIDER                                               */
  /*-------------------------------------------------------------------------------------------------------------*/
  const [globalVariabes, setGlobalVariables]                          = React.useState(gVariables);
  const [instructosListFromDB, setInstructorsListFromDB]              = React.useState([]);
  const [fullInfoInstructors, setFullInfoInstructors]                 = React.useState([]);
  const [instructorSegments, setInstructorSegments ]                  = React.useState(anyArray);
  const [summaryBookingSegments, setSummaryBookingSegments ]          = React.useState(anyArray);
  const [controlAPI, setControlAPI]                                   = React.useState(anyArray);
  const [refreshManagementBoard, setRefreshManagementBoard]           = React.useState(0);
  const [allInvoices, setAllInvoices]                                 = React.useState(0);
  const [showingPage, setShowingPage]                                 = React.useState("LOADING");
  //For the Management Dashboard
  const [daysOfWeek, setDaysOfWeek]                                   = React.useState([]);
  const [selectedWeek, setSelectedWeek]                               = React.useState([]); 
  const [selectedService, setSelectedService]                         = React.useState(parseInt(gVariables.defaultLocation)); 
  const [bookings,setBookings]                                        = React.useState([]); 
  const [isoDaysOfWeek,setISODaysOfWeek]                              = React.useState([]);
  const [timesToShow, setTimesToShow]                                 = React.useState(buildArrayOfBusinessHours(gVariables.startBusinessHours, gVariables.endBusinessHours)); 
  const [selectedSegment, setSelectedSegment]                         = React.useState([]);
  const [locationList, setLocationList]                               = React.useState([]);
  const [selectedLocation, setSelectedLocation]                       = React.useState(parseInt(gVariables.defaultLocation));
  const [showUpPopUp, setShowUpPopUp]                                 = React.useState(false);
  const [showUpPopUpCancelation, setShowUpPopUpCancelation]           = React.useState(false);
  const [showUpPopUpModification, setShowUpPopUpModification]         = React.useState(false);
  const [selectedBooking, setSelectedBooking]                         = React.useState([]);


  /*-------------------------------------------------------------------------------------------------------------*/
  /*                                                API CALLS                                                    */
  /*-------------------------------------------------------------------------------------------------------------*/
  React.useEffect(() =>{    
    axios({
      url: `${gVariables.apiRootURL}getAllInstructors.php`,
      method: "GET",
  }).then((res) => {
    setInstructorsListFromDB(res.data)
    const controlArray = controlAPI;
    controlArray.push('ALL_INSTRUCTORS');
    setControlAPI(controlArray);
  })
    .catch((err) => { console.log(err) });
  },[refreshManagementBoard])
  React.useEffect(() =>{    
    axios({
      url: `${gVariables.apiRootURL}getAllInstructorSegments.php`,
      method: "GET",
  }).then((res) => {
    setInstructorSegments(reArrangeInstructorSegments(res.data));
    const controlArray = controlAPI;
    controlArray.push('INSTRUCTOR_SEGMENTS');
    setControlAPI(controlArray);
  })
    .catch((err) => { console.log(err) });
  },[refreshManagementBoard])
  React.useEffect(() =>{    
    axios({
      url: `${gVariables.apiRootURL}getInfoInstructors.php`,
      method: "GET",
  }).then((res) => {
    setFullInfoInstructors(res.data);
    const controlArray = controlAPI;
    controlArray.push('INFO_INSTRUCTORS');
    setControlAPI(controlArray);
  })
    .catch((err) => { console.log(err) });
  },[refreshManagementBoard])
  React.useEffect(() =>{    
    axios({
      url: `${gVariables.apiRootURL}getSummaryBookings.php`,
      method: "GET",
  }).then((res) => {
    setSummaryBookingSegments(res.data);
    const controlArray = controlAPI;
    controlArray.push('SUMMARY_BOOKINGS');
    setControlAPI(controlArray);
  })
    .catch((err) => { console.log(err) });
  },[refreshManagementBoard])
  React.useEffect(() =>{    
    axios({
      url: `${gVariables.apiRootURL}getAllInvoices.php`,
      method: "GET",
  }).then((res) => {
    setAllInvoices(res.data);
    const controlArray = controlAPI;
    controlArray.push('GET_ALL_INVOICES');
    setControlAPI(controlArray);
  })
    .catch((err) => { console.log(err) });
  },[refreshManagementBoard])
  React.useEffect(() =>{    
    axios({
      url: `${gVariables.apiRootURL}getListShootingRange.php`,
      method: "GET",
  }).then((res) => {
    setLocationList(res.data)
    const controlArray = controlAPI;
    controlArray.push('SHOOTING_RANGE_LIST');
    setControlAPI(controlArray);
  }).catch((err) => { 
    console.log(err) 
  });
  },[refreshManagementBoard])
  if(controlAPI.includes('ALL_INSTRUCTORS' && 'INSTRUCTOR_SEGMENTS' && 'INFO_INSTRUCTORS' && 'SUMMARY_BOOKINGS' && 'GET_ALL_INVOICES' && 'SHOOTING_RANGE_LIST')){
    setShowingPage('DASHBOARD');
    setControlAPI([]);
  }
  return(
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="reservation">
          <ManagementDashboardContext.Provider value={{
                                                        globalVariabes,         setGlobalVariables,
                                                        instructosListFromDB,   setInstructorsListFromDB,
                                                        instructorSegments,     setInstructorSegments,
                                                        fullInfoInstructors,    setFullInfoInstructors,
                                                        refreshManagementBoard, setRefreshManagementBoard,
                                                        showingPage,            setShowingPage,
                                                        summaryBookingSegments, setSummaryBookingSegments,
                                                        allInvoices,            setAllInvoices,
                                                        //For the management Dashboard
                                                        daysOfWeek,             setDaysOfWeek,
                                                        selectedWeek,           setSelectedWeek,
                                                        selectedService,        setSelectedService,
                                                        bookings,               setBookings,
                                                        isoDaysOfWeek,          setISODaysOfWeek,
                                                        timesToShow,            setTimesToShow,
                                                        selectedSegment,        setSelectedSegment,
                                                        locationList,           setLocationList,
                                                        selectedLocation,       setSelectedLocation,
                                                        showUpPopUp,            setShowUpPopUp,
                                                        showUpPopUpCancelation, setShowUpPopUpCancelation,
                                                        showUpPopUpModification, setShowUpPopUpModification,
                                                        selectedBooking,          setSelectedBooking
                                                      }}>
          {(showingPage==="LOADING")    &&  <>LOADING....</>}
          {(showingPage==="DASHBOARD")  &&  <TabManagement />}
          </ManagementDashboardContext.Provider>
        </div>
      </div>
    </div>
  </div>
)}