import React from 'react';

export const AdminBookingsContext = React.createContext<any>("");

export function AdminBookingsProvider({children, gVariables, blockedSegmentList, locationsList} : any)
{
    /*-------------------------------------------------------------------------------------------------------------*/
    /*                                     HOOKS IN CONTEXT PROVIDER                                               */
    /*-------------------------------------------------------------------------------------------------------------*/
    const [globalVariabes, setGlobalVariables]                          = React.useState(gVariables);                                             //Stores the list of global variables
    const [locationList, setLocationList]                               = React.useState(locationsList);                                          //Stores the list of Instructors
    const [blockegSegmentsList, setBlockedSegmentsList]                 = React.useState(blockedSegmentList);                                     //Stores the list of Blocked Segments
    return(
        <AdminBookingsContext.Provider value={{
            globalVariabes,         setGlobalVariables,
            locationList,           setLocationList,
            blockegSegmentsList,    setBlockedSegmentsList,
        }}>
            {children}
        </AdminBookingsContext.Provider>
    )
}