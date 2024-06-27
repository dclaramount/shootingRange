import React from 'react';
import { REQUEST_STATUS } from '../ApiCalls/enums';
import { useGetEndPoint } from '../ApiCalls/useGetEndPoint';
import { ManagementDashboardContext } from '../Context/ManagementDashboardContext';
import { InstructorsCalendarProvider } from '../Context/InstructorCalendarContext';

const WrapperInstructorCalendar = () => {
  let dataFetched                           =   false;
  const   {globalVariabes}                  =   React.useContext(ManagementDashboardContext);
  const fetchListOfInstructors              =   useGetEndPoint(globalVariabes.apiRootURL, 'getAllInstructors');
  const fetchInstructorSegments             =   useGetEndPoint(globalVariabes.apiRootURL, 'getAllInstructorSegments');
  dataFetched                               =   fetchListOfInstructors.requestStatus  === REQUEST_STATUS.SUCCESS &&
                                                fetchInstructorSegments.requestStatus === REQUEST_STATUS.SUCCESS
  return(
  <>
    {dataFetched ? 
      <InstructorsCalendarProvider gVariables={globalVariabes} iList={fetchListOfInstructors.payload} iSegmentList={fetchInstructorSegments.payload}>
        New Instructor Calendar
      </InstructorsCalendarProvider>
      :
      <div>
        PLACEHOLDER
      </div>
    }
  </>
 )
}
export default WrapperInstructorCalendar;