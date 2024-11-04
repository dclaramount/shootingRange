import React from 'react';

export const ManagementBookingPopUpContext = React.createContext<any>("");

export function ManagementBookingPopUpProvider({children, gVariables, startInvoiceList} : any)
{
    /*-------------------------------------------------------------------------------------------------------------*/
    /*                                     HOOKS IN CONTEXT PROVIDER                                               */
    /*-------------------------------------------------------------------------------------------------------------*/
    const [globalVariables, setGlobalVariables]                          = React.useState(gVariables);                     //Stores the list of global variables
    const [invoicesByTimeSegment, setInvoicesByTimeSegment]              = React.useState(startInvoiceList.payload);       //List of Invoices filtered by the segment of time selected
    const [selectedBooking, setSelectedBooking]                          = React.useState([]);                             //State of selected Booking (from the table of invoice list)
    const [modificationInfo, setModificationInfo]                        = React.useState({});                             //This is the state object to store the modified info differences.
    const [showUpPopUpCancelation, setShowUpPopUpCancelation]            = React.useState(false);                          //Show the message to Delete a Booking.
    const [showUpPopUpModification, setShowUpPopUpModification]          = React.useState(false);                          //Show the PopUp to Summary for the modification.
    const [edit, setEdit]                                                = React.useState(false);                          //Set the Edit option for the Reservation.
    return(
        <ManagementBookingPopUpContext.Provider value={{globalVariables,setGlobalVariables,
                                                        invoicesByTimeSegment, setInvoicesByTimeSegment,
                                                        selectedBooking, setSelectedBooking,
                                                        modificationInfo, setModificationInfo,
                                                        showUpPopUpCancelation, setShowUpPopUpCancelation,
                                                        showUpPopUpModification, setShowUpPopUpModification,
                                                        edit, setEdit}}>
            {children}
        </ManagementBookingPopUpContext.Provider>
    )
}