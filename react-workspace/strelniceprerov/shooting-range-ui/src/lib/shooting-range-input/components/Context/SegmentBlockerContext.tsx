import React from 'react';

export const SegmentBlockerContext = React.createContext<any>("");

export function SegmentBlockerProvider({children, gVariables, blockedSegmentList, locationsList} : any)
{
  /*-------------------------------------------------------------------------------------------------------------*/
  /*                                     HOOKS IN CONTEXT PROVIDER                                               */
  /*-------------------------------------------------------------------------------------------------------------*/
  const [globalVariabes, setGlobalVariables]                          = React.useState(gVariables);                     //Stores the list of global variables
  const [locationList, setLocationList]                               = React.useState(locationsList);                  //Stores the list of Instructors
  const [blockegSegmentsList, setBlockedSegmentsList]                 = React.useState(blockedSegmentList);             //Stores the list of Blocked Segments

  return(
    <SegmentBlockerContext.Provider value={{
                                                  globalVariabes,         setGlobalVariables,
                                                  locationList,           setLocationList,
                                                  blockegSegmentsList,    setBlockedSegmentsList
    }}>
      {children}
    </SegmentBlockerContext.Provider>
  )
}