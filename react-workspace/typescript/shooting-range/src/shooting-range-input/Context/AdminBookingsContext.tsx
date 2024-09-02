import React from 'react';

export const AdminBookingsContext = React.createContext<any>("");

export function AdminBookingsProvider({children, gVariables, startLocationList, startBookingsList, startInstructorsSegmentList, startSummaryBookingsList, startSumInstBookingSegments, startBlockingSegmentList, thisWeek} : any)
{
    /*-------------------------------------------------------------------------------------------------------------*/
    /*                                     HOOKS IN CONTEXT PROVIDER                                               */
    /*-------------------------------------------------------------------------------------------------------------*/
    const [globalVariables,         setGlobalVariables]                                         = React.useState(gVariables);                                           //Stores the list of global variables
    const [locationList,            setLocationList]                                            = React.useState(startLocationList)                                     //Stores the locations list fetched from DB
    const [bookings,                setBookings]                                                = React.useState(startBookingsList)                                     //Stores the start bookings from the DB
    const [instructorSegments,      setInstructorSegments]                                      = React.useState(startInstructorsSegmentList)                           //Stores the Instructor Segments from the DB
    const [summaryBookingSegments,  setSummaryBookingSegments]                                  = React.useState(startSummaryBookingsList)                              //Stores the Summary Bookings List View Segments from the DB
    const [sumInstBookingSegments,  setSumInstBookingSegments]                                  = React.useState(startSumInstBookingSegments)                           //Stores the Summary Instructor Bookings List View Segments from the DB
    const [allBlockingSegments,     setAllBlockingSegments]                                     = React.useState(startBlockingSegmentList)                              //Gets All the Blocking Segments from the DB
    const [selectedWeek,            setSelectedWeek]                                            = React.useState(thisWeek);                                             //The Start Week is THIS week.
    return(
        <AdminBookingsContext.Provider value={{
            globalVariables,        setGlobalVariables,
            locationList,           setLocationList,
            bookings,               setBookings,
            instructorSegments,     setInstructorSegments,
            summaryBookingSegments, setSummaryBookingSegments,
            sumInstBookingSegments, setSumInstBookingSegments,
            allBlockingSegments,    setAllBlockingSegments,
            selectedWeek,           setSelectedWeek
        }}>
            {children}
        </AdminBookingsContext.Provider>
    )
}