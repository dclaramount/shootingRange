import React from 'react';
import {
    BookingFilteredInterface, EditBookingContextProviderProps, EditBookingsContextType,
    FullInstructorSegmentInterface, FullServiceInfoInterface, GlobalVariableInterface, HonestWeekInterface,
    InstructorInterface, SummaryBookingSegmentInterface,
    SummaryViewBookingsInterface
} from "../Types/interfaces";
import {buildArrayOfBusinessHours, getFirstAndLastDayOfThisWeek, getNumberGlobalVariable} from "../Helpers";

export const EditBookingsContext = React.createContext<EditBookingsContextType>({}as EditBookingsContextType);

export function EditBookingsContextProvider({children, listGlobalVariables} : EditBookingContextProviderProps)
{
    /*-------------------------------------------------------------------------------------------------------------*/
    /*                                     HOOKS IN CONTEXT PROVIDER                                               */
    /*-------------------------------------------------------------------------------------------------------------*/
    const [bookingsFiltered,setBookingsFiltered]                        = React.useState<BookingFilteredInterface[]>([] as BookingFilteredInterface[]);                                                                                                             //Stores the Response Object from the getBookingsFiltered.php endpoint.         -> Bookings from the invoice table.
    const [bookingsSummaryView, setBookingsSummaryView]                 = React.useState<SummaryViewBookingsInterface[]>([] as SummaryViewBookingsInterface[]);                                                                                                     //Stores the Response Object from the getAllInvoices endpoint.                  -> Bookings from Summary_View_Bookings.
    const [globalVariables, setGlobalVariables]                         = React.useState<GlobalVariableInterface[]>(listGlobalVariables);                                                                                                                           //Stores the Response Object from the getAllGlobalVariables.php.                -> List of entries from the global_variables table.
    const [instructorsList, setInstructorsList]                         = React.useState<InstructorInterface[]>([] as InstructorInterface[]);                                                                                                                       //Stores the Response Object from the getAllInstructors.php endpoint.           -> Instructors from the instructors table.
    const [fullInstructorSegments, setFullInstructorSegments]           = React.useState<FullInstructorSegmentInterface[]>([] as FullInstructorSegmentInterface[]);                                                                                                 //Stores the Response Object from the getAllInstructorSegments.php endpoint.    -> Instructor Segments from the instructor_segments table JOIN with instructors table.
    const [serviceList, setServiceList]                                 = React.useState<FullServiceInfoInterface[]>([] as FullServiceInfoInterface[]);                                                                                                             //Stores the response object from the getListShootingRange.php endpoint.        -> List of Services expanded with their Location Names.
    const [summaryBookingSegments, setSummaryBookingSegments]           = React.useState<SummaryBookingSegmentInterface[]>([] as SummaryBookingSegmentInterface[]);                                                                                                 //Stores the response object from the getSummaryBookings.php endpoint.          -> List of entries from the  Summary_Booking_Segments view (for hourly segments where we have bookings done).

    const [businessHours, setBusinessHours]                             = React.useState<string[]>(buildArrayOfBusinessHours(getNumberGlobalVariable(listGlobalVariables,'startBusinessHours'), getNumberGlobalVariable(listGlobalVariables,'endBusinessHours')));  //Stores the array of business hours, based on the parameters on global_variables table (this is used in the calendar rendering)
    const [daysOfWeek,  setDaysOfWeek]                                  = React.useState<string[]>([] as string[]);                                                                                                                                                 //Stores the Array of Days of the Week from the <WeekSelector> which has the days of the week in format dd.mm
    const [daysOfWeekISOFormat, setDaysOfWeekISOFormat]                 = React.useState<string[]>([] as string[]);                                                                                                                                                 //Stores the Array of Days of the Week from the <WeekSelector> which has the days of the week in format YYYY-MM-DD.
    const [selectedLocation, setSelectedLocation]                       = React.useState<number>(getNumberGlobalVariable(listGlobalVariables, 'defaultLocation'));                                                                                                  //Stores the id of the selected service (based on the dropdown from the selection form).
    const [selectedWeek, setSelectedWeek]                               = React.useState<HonestWeekInterface>(getFirstAndLastDayOfThisWeek());                                                                                                                      //Stores the Object with the selected week from the <WeekSelector> which contains (firstDay and lastDay of the selected week).
    const [showBookingsSummaryOverlay, setShowBookingsSummaryOverlay]   = React.useState<boolean>(false);                                                                                                                                                           //Stores the boolean to display/hide the overlay, that show the summary of the bookings (according to the Time Segment Selected).
    const [selectedSegment, setSelectedSegment]                         = React.useState<string[]>([] as string[]);                                                                                                                                                 //Stores the Array of Selected TimeSegments to properly styled it in the calendar component.
    //
    //
    // const [selectedBooking, setSelectedBooking]                         = React.useState([]);                             //State of selected Booking (from the table of invoice list)
    // const [modificationInfo, setModificationInfo]                       = React.useState({});                             //This is the state object to store the modified info differences.
    // const [showUpPopUpCancelation, setShowUpPopUpCancelation]           = React.useState(false);                          //Show the message to Delete a Booking.
    // const [showUpPopUpModification, setShowUpPopUpModification]         = React.useState(false);                          //Show the PopUp to Summary for the modification.
    // const [edit, setEdit]                                               = React.useState(false);                          //Set the Edit option for the Reservation.
    return(
        <EditBookingsContext.Provider value={{  bookingsFiltered,           setBookingsFiltered,
                                                bookingsSummaryView,        setBookingsSummaryView,
                                                globalVariables,            setGlobalVariables,
                                                instructorsList,            setInstructorsList,
                                                fullInstructorSegments,     setFullInstructorSegments,
                                                serviceList,                setServiceList,
                                                summaryBookingSegments,     setSummaryBookingSegments,
                                                //Space Specific Variables
                                                businessHours,              setBusinessHours,
                                                daysOfWeek,                 setDaysOfWeek,
                                                daysOfWeekISOFormat,        setDaysOfWeekISOFormat,
                                                selectedLocation,           setSelectedLocation,
                                                selectedSegment,            setSelectedSegment,
                                                selectedWeek,               setSelectedWeek,
                                                showBookingsSummaryOverlay, setShowBookingsSummaryOverlay}}>
            {children}
        </EditBookingsContext.Provider>
    )
}