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

export function WrapperManagementDashboard({gVariables} : any) {
  const anyArray : any[] = [];
  console.log(`REFRESH MANAGEMENT DASHBOARD`);
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
    console.log(res.data);
    setAllInvoices(res.data);
    const controlArray = controlAPI;
    controlArray.push('GET_ALL_INVOICES');
    setControlAPI(controlArray);
  })
    .catch((err) => { console.log(err) });
  },[refreshManagementBoard])
  if(controlAPI.includes('ALL_INSTRUCTORS' && 'INSTRUCTOR_SEGMENTS' && 'INFO_INSTRUCTORS' && 'SUMMARY_BOOKINGS' && 'GET_ALL_INVOICES')){
    setShowingPage('DASHBOARD');
    setControlAPI([]);
  }
  return(
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="reservation" style={{padding:'100px'}}>
          <ManagementDashboardContext.Provider value={{
                                                        globalVariabes,         setGlobalVariables,
                                                        instructosListFromDB,   setInstructorsListFromDB,
                                                        instructorSegments,     setInstructorSegments,
                                                        fullInfoInstructors,    setFullInfoInstructors,
                                                        refreshManagementBoard, setRefreshManagementBoard,
                                                        showingPage,            setShowingPage,
                                                        summaryBookingSegments, setSummaryBookingSegments,
                                                        allInvoices,            setAllInvoices
                                                      }}>
          {(showingPage==="LOADING")    &&  <>LOADING....</>}
          {(showingPage==="DASHBOARD")  &&  <TabManagement/>}
          </ManagementDashboardContext.Provider>
        </div>
      </div>
    </div>
  </div>
)}