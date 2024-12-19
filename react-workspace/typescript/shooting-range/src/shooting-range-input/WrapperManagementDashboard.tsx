import React from 'react';
import axios from 'axios';
import 'devextreme/dist/css/dx.light.css';
import { ManagementDashboardContext } from './Context/ManagementDashboardContext';
import TabManagement from './TabMangement';
import { globalVariablesType, ManagementPluginPayload } from '../Shared/types';
import CryptoJS from "crypto-js";

/*-------------------------------------------------------------------------------------------------------------*/
/*                                            HELPER FUNCTIONS                                                 */
/*-------------------------------------------------------------------------------------------------------------*/
const reArrangeInstructorSegments = ( instructorSegments: any ) => {
  const respArray: any[] = [];
  instructorSegments.forEach( ( entry: any ) => {
    const index = respArray.findIndex( ( item ) => item.guid === entry.guid );
    if ( ( instructorSegments.filter( ( entrySegment: any ) => entrySegment.guid === entry.guid ).length === 1 ) && index === -1 ) {
      respArray.push( entry );
    }
    else if ( ( instructorSegments.filter( ( entrySegment: any ) => entrySegment.guid === entry.guid ).length > 1 ) && index === -1 ) {
      const filterItems = instructorSegments.filter( ( entrySegment: any ) => entrySegment.guid === entry.guid );
      const firstItem = filterItems.shift( 0 );
      const id = firstItem.id;
      let startSegment = firstItem.startTime;
      let endSegment = firstItem.endTime;
      const instructorId = firstItem.instructorId;
      const instructorName = firstItem.instructorName;
      const guid = firstItem.guid;

      filterItems.forEach( ( filterEntry: any ) => {
        if ( ( filterEntry.startTime < startSegment ) ) { startSegment = filterEntry.startTime }
        if ( ( filterEntry.endTime > endSegment ) ) { endSegment = filterEntry.endTime }
      } )
      respArray.push( {
        id: id,
        instructorId: instructorId,
        instructorName: instructorName,
        guid: guid,
        startTime: startSegment,
        endTime: endSegment
      } )
    }
  } );
  console.log( respArray );
  return ( respArray );
}

const buildArrayOfBusinessHours = ( startHour: any, endHour: any ) => {
  const Array = []
  let countStartHour = parseInt( startHour );
  while ( countStartHour < parseInt( endHour ) ) {
    if ( countStartHour < 10 ) {
      Array.push( `0${countStartHour}` );
    }
    else {
      Array.push( `${countStartHour}` );
    }
    countStartHour = countStartHour + 1;
  }
  return Array;
}

export function WrapperManagementDashboard ( apiPayload: ManagementPluginPayload ) {
  const gVariables: globalVariablesType = apiPayload.GlobalVariables;
  const anyArray: any[] = [];
  /*
  const testEncryptKey = CryptoJS.AES.encrypt(`PLACEHOLDER`, `test-key`);
  console.log(`encrypted value`);
  console.log(testEncryptKey.toString());*/
  const sendGridKey = CryptoJS.AES.decrypt( gVariables.sendGridEncryptedKey, gVariables.decryptionKey ).toString( CryptoJS.enc.Utf8 );

  /*-------------------------------------------------------------------------------------------------------------*/
  /*                                     HOOKS IN CONTEXT PROVIDER                                               */
  /*-------------------------------------------------------------------------------------------------------------*/
  const [globalVariabes, setGlobalVariables] = React.useState( gVariables );
  const [instructosListFromDB, setInstructorsListFromDB] = React.useState( [] );
  const [fullInfoInstructors, setFullInfoInstructors] = React.useState( [] );
  const [instructorSegments, setInstructorSegments] = React.useState( anyArray );
  const [allInstructSegments, setAllInstructorSegments] = React.useState( anyArray );
  const [summaryBookingSegments, setSummaryBookingSegments] = React.useState( anyArray );
  const [controlAPI, setControlAPI] = React.useState( anyArray );
  const [refreshManagementBoard, setRefreshManagementBoard] = React.useState( 0 );
  const [allInvoices, setAllInvoices] = React.useState( 0 );
  const [showingPage, setShowingPage] = React.useState( "LOADING" );
  //For the Management Dashboard
  const [daysOfWeek, setDaysOfWeek] = React.useState( [] );
  const [selectedWeek, setSelectedWeek] = React.useState( [] );
  const [selectedService, setSelectedService] = React.useState( gVariables.defaultLocation );
  const [bookings, setBookings] = React.useState( [] );
  const [isoDaysOfWeek, setISODaysOfWeek] = React.useState( [] );
  const [timesToShow, setTimesToShow] = React.useState( buildArrayOfBusinessHours( gVariables.startBusinessHours, gVariables.endBusinessHours ) );
  const [selectedSegment, setSelectedSegment] = React.useState( [] );
  const [locationList, setLocationList] = React.useState( [] );
  const [selectedLocation, setSelectedLocation] = React.useState( gVariables.defaultLocation );
  const [showUpPopUp, setShowUpPopUp] = React.useState( false );
  const [showUpPopUpCancelation, setShowUpPopUpCancelation] = React.useState( false );
  const [showUpPopUpModification, setShowUpPopUpModification] = React.useState( false );
  const [selectedBooking, setSelectedBooking] = React.useState( [] );
  const [fieldsOnError, setFieldsOnError] = React.useState<string[]>( [] );
  const [modificationInfo, setModificationInfo] = React.useState( {} );
  const [sendGridKeyAPI, setSendGridKeyAPI] = React.useState( sendGridKey );
  const [showMsgErrorGralDate, setShowMsgErrorGralDate] = React.useState( false );
  const [showMsgErrorDate, setShowMsgErrorDate] = React.useState( false );
  const [showMsgErrorEmail, setShowMsgErrorEmail] = React.useState( false );
  const [showMsgErrorPhone, setShowMsgErrorPhone] = React.useState( false );
  const [refreshManagementDashboard, setRefreshManagementDashboard] = React.useState( 0 );

  /*-------------------------------------------------------------------------------------------------------------*/
  /*                                                API CALLS                                                    */
  /*-------------------------------------------------------------------------------------------------------------*/
  React.useEffect( () => {
    axios( {
      url: `${gVariables.apiRootURL}getAllInstructors.php`,
      method: "GET",
    } ).then( ( res ) => {
      setInstructorsListFromDB( res.data )
      const controlArray = controlAPI;
      controlArray.push( 'ALL_INSTRUCTORS' );
      setControlAPI( controlArray );
    } )
      .catch( ( err ) => { console.log( err ) } );
  }, [refreshManagementBoard, selectedLocation] )
  React.useEffect( () => {
    axios( {
      url: `${gVariables.apiRootURL}getAllInstructorSegments.php`,
      method: "GET",
    } ).then( ( res ) => {
      setInstructorSegments( reArrangeInstructorSegments( res.data ) );
      setAllInstructorSegments( res.data );
      const controlArray = controlAPI;
      controlArray.push( 'INSTRUCTOR_SEGMENTS' );
      setControlAPI( controlArray );
    } )
      .catch( ( err ) => { console.log( err ) } );
  }, [refreshManagementBoard, selectedLocation] )
  React.useEffect( () => {
    axios( {
      url: `${gVariables.apiRootURL}getInfoInstructors.php`,
      method: "GET",
    } ).then( ( res ) => {
      setFullInfoInstructors( res.data );
      const controlArray = controlAPI;
      controlArray.push( 'INFO_INSTRUCTORS' );
      setControlAPI( controlArray );
    } )
      .catch( ( err ) => { console.log( err ) } );
  }, [refreshManagementBoard, selectedLocation] )
  React.useEffect( () => {
    axios( {
      url: `${gVariables.apiRootURL}getSummaryBookings.php`,
      method: "GET",
    } ).then( ( res ) => {
      setSummaryBookingSegments( res.data );
      const controlArray = controlAPI;
      controlArray.push( 'SUMMARY_BOOKINGS' );
      setControlAPI( controlArray );
    } )
      .catch( ( err ) => { console.log( err ) } );
  }, [refreshManagementBoard, selectedLocation] )
  React.useEffect( () => {
    console.log( "REQUEST AGAIN ALL INVOICES...." )
    axios( {
      url: `${gVariables.apiRootURL}getAllInvoices.php`,
      method: "GET",
    } ).then( ( res ) => {
      setAllInvoices( res.data );
      const controlArray = controlAPI;
      controlArray.push( 'GET_ALL_INVOICES' );
      setControlAPI( controlArray );
    } )
      .catch( ( err ) => { console.log( err ) } );
  }, [refreshManagementBoard, selectedLocation] )
  React.useEffect( () => {
    axios( {
      url: `${gVariables.apiRootURL}getListShootingRange.php`,
      method: "GET",
    } ).then( ( res ) => {
      setLocationList( res.data )
      const controlArray = controlAPI;
      controlArray.push( 'SHOOTING_RANGE_LIST' );
      setControlAPI( controlArray );
    } ).catch( ( err ) => {
      console.log( err )
    } );
  }, [refreshManagementBoard, selectedLocation] )
  if ( controlAPI.includes( 'ALL_INSTRUCTORS' && 'INSTRUCTOR_SEGMENTS' && 'INFO_INSTRUCTORS' && 'SUMMARY_BOOKINGS' && 'GET_ALL_INVOICES' && 'SHOOTING_RANGE_LIST' ) ) {
    setShowingPage( 'DASHBOARD' );
    setControlAPI( [] );
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="reservation">
            <ManagementDashboardContext.Provider value={{
              globalVariabes, setGlobalVariables,
              instructosListFromDB, setInstructorsListFromDB,
              instructorSegments, setInstructorSegments,
              fullInfoInstructors, setFullInfoInstructors,
              refreshManagementBoard, setRefreshManagementBoard,
              showingPage, setShowingPage,
              summaryBookingSegments, setSummaryBookingSegments,
              allInvoices, setAllInvoices,
              //For the management Dashboard
              daysOfWeek, setDaysOfWeek,
              selectedWeek, setSelectedWeek,
              selectedService, setSelectedService,
              bookings, setBookings,
              isoDaysOfWeek, setISODaysOfWeek,
              timesToShow, setTimesToShow,
              selectedSegment, setSelectedSegment,
              locationList, setLocationList,
              selectedLocation, setSelectedLocation,
              showUpPopUp, setShowUpPopUp,
              showUpPopUpCancelation, setShowUpPopUpCancelation,
              showUpPopUpModification, setShowUpPopUpModification,
              selectedBooking, setSelectedBooking,
              fieldsOnError, setFieldsOnError,
              modificationInfo, setModificationInfo,
              sendGridKeyAPI, setSendGridKeyAPI,
              allInstructSegments, setAllInstructorSegments,
              showMsgErrorGralDate, setShowMsgErrorGralDate,
              showMsgErrorDate, setShowMsgErrorDate,
              showMsgErrorEmail, setShowMsgErrorEmail,
              showMsgErrorPhone, setShowMsgErrorPhone,
              refreshManagementDashboard, setRefreshManagementDashboard
            }}>
              {( showingPage === "LOADING" ) && <>LOADING....</>}
              {( showingPage === "DASHBOARD" ) && <TabManagement />}
            </ManagementDashboardContext.Provider>
          </div>
        </div>
      </div>
    </div>
  )
}