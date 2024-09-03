import React from 'react';

export const AdminBookingsContext = React.createContext<any>("");

export function AdminBookingsProvider({children, gVariables, startLocationList, startBookingsList, startInstructorsSegmentList, startSummaryBookingsList, startSumInstBookingSegments, startBlockingSegmentList, thisWeek} : any)
{
    /*-------------------------------------------------------------------------------------------------------------*/
    /*                                     HOOKS IN CONTEXT PROVIDER                                               */
    /*-------------------------------------------------------------------------------------------------------------*/
    const [globalVariables,         setGlobalVariables]                                         = React.useState(gVariables);                                           //Stores the list of global variables
    const [locationList,            setLocationList]                                            = React.useState(startLocationList);                                    //Stores the locations list fetched from DB
    const [bookings,                setBookings]                                                = React.useState(startBookingsList);                                    //Stores the start bookings from the DB
    const [instructorSegments,      setInstructorSegments]                                      = React.useState(startInstructorsSegmentList);                          //Stores the Instructor Segments from the DB
    const [summaryBookingSegments,  setSummaryBookingSegments]                                  = React.useState(startSummaryBookingsList);                             //Stores the Summary Bookings List View Segments from the DB
    const [sumInstBookingSegments,  setSumInstBookingSegments]                                  = React.useState(startSumInstBookingSegments);                          //Stores the Summary Instructor Bookings List View Segments from the DB
    const [allBlockingSegments,     setAllBlockingSegments]                                     = React.useState(startBlockingSegmentList);                             //Gets All the Blocking Segments from the DB
    const [selectedWeek,            setSelectedWeek]                                            = React.useState(thisWeek);                                             //The Start Week is THIS week
    const [selectedSegment,         setSelectedSegment]                                         = React.useState([]);                                                   //Array to start the selected segments in the Calendar.
    const [selectedBookingDuration, setSelectedBookingDuration]                                 = React.useState(1);                                                    //Stores the selected length of the booking that will be made.
    const [shootingPermitNumber,    setShootingPermitNumber]                                    = React.useState("XX123456");                                           //Stores the value of the shooting permit number input field in the form. (in this case default is XX123456 as it is not used)
    const [name,                    setName]                                                    = React.useState("");                                                   //Stores the value of the name input field in the form.
    const [email,                   setEmail]                                                   = React.useState("");                                                   //Stores the value of the email input field in the form.
    const [phone,                   setPhone]                                                   = React.useState("");                                                   //Stores the value of the phone input field in the form.
    const [comment,                 setComment]                                                 = React.useState("");                                                   //Stores the value of the comment input field in the form.

    const [showingPage,             setShowingPage]                                             = React.useState("DASHBOARD");                                          //Controls with stage of the booking process is being shown.
    const [showPopUpBookingProcess, setShowPopUpBookingProcess]                                 = React.useState(false);                                                //Controls showing the popup for the summary of the booking process.
    const [showWarningChooseAnotherSegment, setShowWarningChooseAnotherSegment]                 = React.useState(false);                                                //Controls showing the alert of overlaping segments.
    const [isNormalComputer, setIsNormalComputer]                                               = React.useState(true);                                                 //Controls the layout for mobile.

    const [daysOfWeek,  setDaysOfWeek]                                                          = React.useState([]);                                                   //Stores the Array of the days of the week in format dd.mm from the week picker.
    const [isoDaysOfWeek,setISODaysOfWeek]                                                      = React.useState([]);                                                   //Stores the Days of the Week (based on week selector) in ISO format.

    return(
        <AdminBookingsContext.Provider value={{
            globalVariables,        setGlobalVariables,
            locationList,           setLocationList,
            bookings,               setBookings,
            instructorSegments,     setInstructorSegments,
            summaryBookingSegments, setSummaryBookingSegments,
            sumInstBookingSegments, setSumInstBookingSegments,
            allBlockingSegments,    setAllBlockingSegments,
            selectedWeek,           setSelectedWeek,
            selectedSegment,        setSelectedSegment,
            selectedBookingDuration, setSelectedBookingDuration,
            shootingPermitNumber,   setShootingPermitNumber,
            name,                   setName,
            email,                  setEmail,
            phone,                  setPhone,
            comment,                setComment,
            showingPage,            setShowingPage,
            showPopUpBookingProcess,setShowPopUpBookingProcess,
            showWarningChooseAnotherSegment, setShowWarningChooseAnotherSegment,
            isNormalComputer, setIsNormalComputer,
            daysOfWeek,  setDaysOfWeek,
            isoDaysOfWeek,setISODaysOfWeek
        }}>
            {children}
        </AdminBookingsContext.Provider>
    )
}