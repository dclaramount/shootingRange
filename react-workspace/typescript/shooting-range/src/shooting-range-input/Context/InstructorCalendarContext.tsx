import React from 'react';

export const InstructorCalendarContext = React.createContext<any>("");

export function InstructorsCalendarProvider({children, gVariables, iList, iSegmentList} : any)
{
  /*-------------------------------------------------------------------------------------------------------------*/
  /*                                     HOOKS IN CONTEXT PROVIDER                                               */
  /*-------------------------------------------------------------------------------------------------------------*/
  const [globalVariabes, setGlobalVariables]                          = React.useState(gVariables);                     //Stores the list of global variables
  const [instructorsList, setInstructorsList]                         = React.useState(iList);                          //Stores the list of Instructors
  const [instructorSegmentsList, setInstructorSegmentsList]           = React.useState(iSegmentList);                   //Stores the list of Blocked Segments

  return(
    <InstructorCalendarContext.Provider value={{
                                                  globalVariabes,         setGlobalVariables,
                                                  instructorsList,        setInstructorsList,
                                                  instructorSegmentsList, setInstructorSegmentsList
    }}>
      {children}
    </InstructorCalendarContext.Provider>
  )
}