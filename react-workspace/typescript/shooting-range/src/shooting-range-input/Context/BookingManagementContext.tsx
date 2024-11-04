import React from 'react';

export const BookingManagementContext = React.createContext<any>("");

export function BookingManagementProvider({children, gVariables, iList, iSegmentList, infoInstructorsFromDB, summaryBookingsFromDB, allInvoicesFromDB, serviceListFromDB} : any)
{
  /*-------------------------------------------------------------------------------------------------------------*/
  /*                                     HOOKS IN CONTEXT PROVIDER                                               */
  /*-------------------------------------------------------------------------------------------------------------*/
  const [allInvoices, setAllInvoices]                                 = React.useState(allInvoicesFromDB);                      //Stores the response object from the getAllInvoices endpoint.
  const [bookings,setBookings]                                        = React.useState([]);                                     //Stores the response object from getBookingsFiltered
  const [daysOfWeek,  setDaysOfWeek]                                  = React.useState([]);                                     //TODO: Comment
  const [fullInfoInstructors, setFullInfoInstructors]                 = React.useState(infoInstructorsFromDB);
  const [instructorSegments, setInstructorSegments]                   = React.useState(iSegmentList);                           //Stores the Days of the Week (based on week selector) in simple format.
  const [instructosListFromDB, setInstructorsListFromDB]              = React.useState(iList);
  const [isoDaysOfWeek,setISODaysOfWeek]                              = React.useState([]);                                     //Stores the Days of the Week (based on week selector) in ISO format.
  const [locationList, setLocationList]                               = React.useState([]);                                     //Stores the response object from the getListShootingRange endpoint.
  const [globalVariabes, setGlobalVariables]                          = React.useState(gVariables);                             //Stores the list of global variables
  const [selectedWeek, setSelectedWeek]                               = React.useState([]);                                     //Stores the week object (based on the week selector)
  const [selectedLocation, setSelectedLocation]                       = React.useState(parseInt(gVariables.defaultLocation));   //Stores the selected location Id (based on the menu) Default (comming from DB)
  const [showUpPopUp, setShowUpPopUp]                                 = React.useState(false);                                  //TODO: Comment
  const [summaryBookingSegments, setSummaryBookingSegments]           = React.useState(summaryBookingsFromDB);
  const [selectedSegment, setSelectedSegment]                         = React.useState([]);                                     //Stores the selected location/service for the booking management tab.

  return(
    <BookingManagementContext.Provider value={{
                                                  allInvoices, setAllInvoices,
                                                  bookings,setBookings,
                                                  daysOfWeek,  setDaysOfWeek,
                                                  fullInfoInstructors, setFullInfoInstructors,
                                                  instructorSegments, setInstructorSegments,
                                                  instructosListFromDB, setInstructorsListFromDB,
                                                  isoDaysOfWeek,setISODaysOfWeek,
                                                  locationList, setLocationList,
                                                  globalVariabes,         setGlobalVariables,
                                                  selectedWeek, setSelectedWeek,
                                                  selectedLocation, setSelectedLocation     ,
                                                  showUpPopUp, setShowUpPopUp   ,
                                                  summaryBookingSegments, setSummaryBookingSegments,
                                                  selectedSegment, setSelectedSegment
    }}>
      {children}
    </BookingManagementContext.Provider>
  )
}