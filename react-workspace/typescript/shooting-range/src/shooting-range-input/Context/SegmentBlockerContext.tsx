import React from 'react';

export const SegmentBlockerContext = React.createContext<any>("");

export function SegmentBlockerProvider({children, gVariables} : any)
{
  /*-------------------------------------------------------------------------------------------------------------*/
  /*                                     HOOKS IN CONTEXT PROVIDER                                               */
  /*-------------------------------------------------------------------------------------------------------------*/
  const [globalVariabes, setGlobalVariables]                          = React.useState(gVariables);     //Stores the list of global variables
  const [instructorsList, setInstructorsList]                         = React.useState([]);             //Stores the list of Instructors

  return(
    <SegmentBlockerContext.Provider value={{
                                                  globalVariabes,         setGlobalVariables,
                                                  instructorsList,        setInstructorsList
    }}>
      {children}
    </SegmentBlockerContext.Provider>
  )
}