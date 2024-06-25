import React from 'react';

export const SegmentBlockerContext = React.createContext<any>("");

export function SegmentBlockerProvider({children, gVariables, blockedSegmentList} : any)
{
  /*-------------------------------------------------------------------------------------------------------------*/
  /*                                     HOOKS IN CONTEXT PROVIDER                                               */
  /*-------------------------------------------------------------------------------------------------------------*/
  const [globalVariabes, setGlobalVariables]                          = React.useState(gVariables);                     //Stores the list of global variables
  const [instructorsList, setInstructorsList]                         = React.useState([]);                             //Stores the list of Instructors
  const [blockegSegmentsList, setBlockedSegmentsList]                 = React.useState(blockedSegmentList);             //Stores the list of Blocked Segments

  return(
    <SegmentBlockerContext.Provider value={{
                                                  globalVariabes,         setGlobalVariables,
                                                  instructorsList,        setInstructorsList,
                                                  blockegSegmentsList,    setBlockedSegmentsList
    }}>
      {children}
    </SegmentBlockerContext.Provider>
  )
}