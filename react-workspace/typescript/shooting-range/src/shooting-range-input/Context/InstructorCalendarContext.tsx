import React from 'react';
import { DBBlockTimeSegment } from '../types/blocking-segment.types';

export const InstructorCalendarContext = React.createContext<any>("");

export function InstructorsCalendarProvider({children, gVariables, iList, iSegmentList} : any)
{
  console.log(iList);
  //Treatment for the response from API
  const newiSegmentList : DBBlockTimeSegment[]= [];
  iSegmentList.forEach((segment : any) => newiSegmentList.push({
    id: segment.id,
    name: segment.instructorName, 
    uuid: segment.guid,
    color: iList.find((instructor : any) => parseInt(instructor.id)===parseInt(segment.instructorId)).color,
    startTime: segment.startTime, 
    endTime: segment.endTime,
    instructorId: parseInt(segment.instructorId)
  }))
  /*-------------------------------------------------------------------------------------------------------------*/
  /*                                     HOOKS IN CONTEXT PROVIDER                                               */
  /*-------------------------------------------------------------------------------------------------------------*/
  const [globalVariabes, setGlobalVariables]                          = React.useState(gVariables);                     //Stores the list of global variables
  const [instructorsList, setInstructorsList]                         = React.useState(iList);                          //Stores the list of Instructors
  const [instructorSegmentsList, setInstructorSegmentsList]           = React.useState(newiSegmentList);                //Stores the list of Instructor Segments

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