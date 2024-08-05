import React from 'react';
import { BlockSegmentToCreate } from '../../types/blocking-segment.types';

export const SegmentBlockerContext = React.createContext<any>("");

export function SegmentBlockerProvider({children, gVariables, blockedSegmentList, locationsList} : any)
{
  /*-------------------------------------------------------------------------------------------------------------*/
  /*                                     HOOKS IN CONTEXT PROVIDER                                               */
  /*-------------------------------------------------------------------------------------------------------------*/
  const [globalVariabes, setGlobalVariables]                          = React.useState(gVariables);                     //Stores the list of global variables
  const [locationList, setLocationList]                               = React.useState(locationsList);                  //Stores the list of Instructors
  const [blockegSegmentsList, setBlockedSegmentsList]                 = React.useState(blockedSegmentList);             //Stores the list of Blocked Segments
  const [blockingSegmentsToCopy, setBlockingSegmentsToCopy]           = React.useState<BlockSegmentToCreate[]>([])

  return(
    <SegmentBlockerContext.Provider value={{
                                                  globalVariabes,         setGlobalVariables,
                                                  locationList,           setLocationList,
                                                  blockegSegmentsList,    setBlockedSegmentsList,
                                                  blockingSegmentsToCopy, setBlockingSegmentsToCopy
    }}>
      {children}
    </SegmentBlockerContext.Provider>
  )
}